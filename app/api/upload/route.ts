import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

// Max file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024

/**
 * POST /api/upload
 * Upload an image for a site
 * Body: FormData with 'file' and 'slug'
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const slug = formData.get('slug') as string | null

    if (!file || !slug) {
      return NextResponse.json(
        { error: 'File and slug are required' },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum 5MB' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Generate unique filename
    const ext = file.name.split('.').pop() || 'jpg'
    const timestamp = Date.now()
    const filename = `${slug}/${timestamp}.${ext}`

    // Convert File to ArrayBuffer then to Buffer for Supabase
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('site-images')
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (error) {
      console.error('Upload error:', error)
      return NextResponse.json(
        { error: 'Failed to upload image' },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('site-images')
      .getPublicUrl(filename)

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/upload?slug=xxx
 * List images for a site
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // List files in the slug folder
    const { data, error } = await supabase.storage
      .from('site-images')
      .list(slug)

    if (error) {
      console.error('List error:', error)
      return NextResponse.json({ images: [] })
    }

    // Build public URLs for each image
    const images = (data || []).map(file => {
      const { data: { publicUrl } } = supabase.storage
        .from('site-images')
        .getPublicUrl(`${slug}/${file.name}`)

      return {
        name: file.name,
        url: publicUrl,
        createdAt: file.created_at,
      }
    })

    return NextResponse.json({ images })

  } catch (error) {
    console.error('List error:', error)
    return NextResponse.json({ images: [] })
  }
}
