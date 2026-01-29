'use client'

import { useState, useRef, useEffect } from 'react'

interface ImageEditorProps {
  slug: string
  onImageUpdate?: (section: string, imageUrl: string) => void
}

export default function ImageEditor({ slug, onImageUpdate }: ImageEditorProps) {
  const [isActive, setIsActive] = useState(false)
  const [selectedImage, setSelectedImage] = useState<HTMLImageElement | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [section, setSection] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Toggle edit mode
  const toggleEditMode = () => {
    if (isActive && selectedImage) {
      selectedImage.style.outline = ''
    }
    setIsActive(!isActive)
    setSelectedImage(null)
    setShowModal(false)
  }

  // Handle clicking on images
  useEffect(() => {
    if (!isActive) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (target.tagName === 'IMG') {
        e.preventDefault()
        e.stopPropagation()

        const img = target as HTMLImageElement

        // Deselect previous
        if (selectedImage) {
          selectedImage.style.outline = ''
        }

        // Select new
        img.style.outline = '3px solid #2563eb'
        img.style.outlineOffset = '2px'
        setSelectedImage(img)

        // Detect section from parent classes or position
        const parentSection = img.closest('section')
        const sectionId = parentSection?.id || 'hero'
        const sectionClass = parentSection?.className || ''

        let detectedSection = 'hero'
        if (sectionClass.includes('portfolio') || sectionId.includes('portfolio')) {
          detectedSection = 'portfolio'
        } else if (sectionClass.includes('about') || sectionId.includes('about')) {
          detectedSection = 'about'
        } else if (sectionClass.includes('service') || sectionId.includes('service')) {
          detectedSection = 'services'
        }

        setSection(detectedSection)
        setImageUrl(img.src)
        setShowModal(true)
      }
    }

    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [isActive, selectedImage])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // For now, we'll need to upload to a service
    // This is a placeholder - in production you'd upload to Supabase Storage or similar
    const reader = new FileReader()
    reader.onload = () => {
      // Create a temporary data URL (in production, upload and get real URL)
      setMessage({ type: 'error', text: 'File uploads coming soon! For now, paste an image URL.' })
    }
    reader.readAsDataURL(file)
  }

  const saveImage = async () => {
    if (!imageUrl.trim()) {
      setMessage({ type: 'error', text: 'Please enter an image URL' })
      return
    }

    // Validate URL
    try {
      new URL(imageUrl)
    } catch {
      setMessage({ type: 'error', text: 'Please enter a valid URL' })
      return
    }

    setIsSaving(true)

    try {
      const response = await fetch('/api/edit-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          editType: 'image',
          imageUrl,
          imageSection: section
        })
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Image updated!' })
        onImageUpdate?.(section, imageUrl)

        // Update preview immediately
        if (selectedImage) {
          selectedImage.src = imageUrl
          selectedImage.style.outline = ''
        }

        setShowModal(false)
        setSelectedImage(null)
      } else {
        const error = await response.json()
        setMessage({ type: 'error', text: error.error || 'Failed to save' })
      }
    } catch (error) {
      console.error('Save error:', error)
      setMessage({ type: 'error', text: 'Failed to save image' })
    } finally {
      setIsSaving(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const closeModal = () => {
    if (selectedImage) {
      selectedImage.style.outline = ''
    }
    setSelectedImage(null)
    setShowModal(false)
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleEditMode}
        className={`fixed bottom-6 left-40 z-50 px-4 py-2 rounded-full shadow-lg transition-all flex items-center gap-2 ${
          isActive
            ? 'bg-purple-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <span className="text-lg">🖼️</span>
        <span className="text-sm font-medium">
          {isActive ? 'Done' : 'Edit Images'}
        </span>
      </button>

      {/* Edit Mode Indicator */}
      {isActive && !showModal && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-purple-600 text-white px-4 py-2 rounded-full text-sm shadow-lg">
          🖼️ Click any image to replace it
        </div>
      )}

      {/* Image Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Replace Image</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Current Image Preview */}
            {selectedImage && (
              <div className="mb-4 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={selectedImage.src}
                  alt="Current"
                  className="w-full h-32 object-cover"
                />
              </div>
            )}

            {/* Section Label */}
            <div className="mb-4">
              <span className="text-sm text-gray-500">Section:</span>
              <span className="ml-2 px-2 py-1 bg-gray-100 rounded text-sm capitalize">
                {section}
              </span>
            </div>

            {/* URL Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                Paste a direct link to an image (jpg, png, webp)
              </p>
            </div>

            {/* File Upload (coming soon) */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Or upload a file
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-medium
                  file:bg-purple-50 file:text-purple-600
                  hover:file:bg-purple-100
                  cursor-pointer"
              />
              <p className="text-xs text-gray-400 mt-1">
                Upload support coming soon
              </p>
            </div>

            {/* Preview of new URL */}
            {imageUrl && imageUrl !== selectedImage?.src && (
              <div className="mb-4">
                <span className="text-sm text-gray-500">New image preview:</span>
                <div className="mt-1 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-32 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="50" x="50" text-anchor="middle" fill="%23999">Invalid URL</text></svg>'
                    }}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={closeModal}
                className="flex-1 px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveImage}
                disabled={isSaving || !imageUrl.trim()}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Image'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Message */}
      {message && (
        <div
          className={`fixed bottom-20 left-40 z-50 px-4 py-2 rounded-lg shadow-lg text-sm ${
            message.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          {message.text}
        </div>
      )}
    </>
  )
}
