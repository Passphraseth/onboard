'use client'

import { useState } from 'react'
import TextEditor from './TextEditor'
import ImageEditor from './ImageEditor'

interface SiteEditorToolsProps {
  slug: string
  onRefresh?: () => void
}

export default function SiteEditorTools({ slug, onRefresh }: SiteEditorToolsProps) {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [primaryColor, setPrimaryColor] = useState('#2563eb')
  const [isSavingColor, setIsSavingColor] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const presetColors = [
    { name: 'Blue', value: '#2563eb' },
    { name: 'Navy', value: '#1e3a8a' },
    { name: 'Green', value: '#16a34a' },
    { name: 'Red', value: '#dc2626' },
    { name: 'Purple', value: '#9333ea' },
    { name: 'Orange', value: '#ea580c' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Black', value: '#18181b' },
    { name: 'Gold', value: '#ca8a04' },
    { name: 'Teal', value: '#0d9488' }
  ]

  const saveColor = async (color: string) => {
    setIsSavingColor(true)
    setPrimaryColor(color)

    try {
      const response = await fetch('/api/edit-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          editType: 'color',
          colorType: 'primary',
          colorValue: color
        })
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Color updated!' })
        onRefresh?.()
      } else {
        setMessage({ type: 'error', text: 'Failed to update color' })
      }
    } catch (error) {
      console.error('Color save error:', error)
      setMessage({ type: 'error', text: 'Failed to save' })
    } finally {
      setIsSavingColor(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const handleEditComplete = () => {
    // Optionally refresh the preview
    onRefresh?.()
  }

  return (
    <>
      {/* Text Editor */}
      <TextEditor slug={slug} onEditComplete={handleEditComplete} />

      {/* Image Editor */}
      <ImageEditor slug={slug} onImageUpdate={handleEditComplete} />

      {/* Color Picker Toggle */}
      <button
        onClick={() => setShowColorPicker(!showColorPicker)}
        className={`fixed bottom-6 left-[280px] z-50 px-4 py-2 rounded-full shadow-lg transition-all flex items-center gap-2 ${
          showColorPicker
            ? 'bg-orange-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <span className="text-lg">🎨</span>
        <span className="text-sm font-medium">
          {showColorPicker ? 'Close' : 'Colors'}
        </span>
      </button>

      {/* Color Picker Panel */}
      {showColorPicker && (
        <div className="fixed bottom-20 left-[280px] z-50 bg-white rounded-xl shadow-2xl p-4 w-64">
          <h3 className="font-medium text-gray-900 mb-3">Primary Color</h3>

          {/* Preset Colors */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            {presetColors.map((color) => (
              <button
                key={color.value}
                onClick={() => saveColor(color.value)}
                disabled={isSavingColor}
                className={`w-10 h-10 rounded-lg border-2 transition-transform hover:scale-110 ${
                  primaryColor === color.value ? 'border-gray-800 ring-2 ring-offset-2' : 'border-gray-200'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>

          {/* Custom Color Input */}
          <div className="flex gap-2">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer"
            />
            <input
              type="text"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              placeholder="#hex"
              className="flex-1 px-2 py-1 border rounded text-sm font-mono"
            />
            <button
              onClick={() => saveColor(primaryColor)}
              disabled={isSavingColor}
              className="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700 disabled:opacity-50"
            >
              {isSavingColor ? '...' : 'Set'}
            </button>
          </div>
        </div>
      )}

      {/* Refresh Button */}
      <button
        onClick={onRefresh}
        className="fixed bottom-6 left-[400px] z-50 px-4 py-2 rounded-full shadow-lg bg-white text-gray-700 hover:bg-gray-50 flex items-center gap-2"
      >
        <span className="text-lg">🔄</span>
        <span className="text-sm font-medium">Refresh</span>
      </button>

      {/* Status Message */}
      {message && (
        <div
          className={`fixed bottom-20 left-[400px] z-50 px-4 py-2 rounded-lg shadow-lg text-sm ${
            message.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          {message.text}
        </div>
      )}
    </>
  )
}
