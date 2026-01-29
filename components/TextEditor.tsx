'use client'

import { useState, useRef, useEffect } from 'react'

interface TextEditorProps {
  slug: string
  onEditComplete?: (oldText: string, newText: string) => void
}

export default function TextEditor({ slug, onEditComplete }: TextEditorProps) {
  const [isActive, setIsActive] = useState(false)
  const [editingElement, setEditingElement] = useState<HTMLElement | null>(null)
  const [originalText, setOriginalText] = useState('')
  const [showToolbar, setShowToolbar] = useState(false)
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 })
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // Enable/disable edit mode
  const toggleEditMode = () => {
    if (isActive) {
      // Deactivate: remove all editing states
      if (editingElement) {
        editingElement.contentEditable = 'false'
        editingElement.style.outline = ''
      }
      setEditingElement(null)
      setShowToolbar(false)
    }
    setIsActive(!isActive)
  }

  // Handle clicking on text elements
  useEffect(() => {
    if (!isActive) return

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Check if it's an editable text element
      if (
        target.tagName === 'H1' ||
        target.tagName === 'H2' ||
        target.tagName === 'H3' ||
        target.tagName === 'H4' ||
        target.tagName === 'P' ||
        target.tagName === 'SPAN' ||
        target.tagName === 'LI' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      ) {
        e.preventDefault()
        e.stopPropagation()

        // Deselect previous element
        if (editingElement && editingElement !== target) {
          editingElement.contentEditable = 'false'
          editingElement.style.outline = ''
        }

        // Select new element
        target.contentEditable = 'true'
        target.style.outline = '2px solid #2563eb'
        target.style.outlineOffset = '2px'
        target.focus()

        setEditingElement(target)
        setOriginalText(target.innerText)

        // Position toolbar above element
        const rect = target.getBoundingClientRect()
        setToolbarPosition({
          top: rect.top - 50 + window.scrollY,
          left: rect.left + (rect.width / 2)
        })
        setShowToolbar(true)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        cancelEdit()
      } else if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        saveEdit()
      }
    }

    document.addEventListener('click', handleClick, true)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('click', handleClick, true)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isActive, editingElement])

  const cancelEdit = () => {
    if (editingElement) {
      editingElement.innerText = originalText
      editingElement.contentEditable = 'false'
      editingElement.style.outline = ''
    }
    setEditingElement(null)
    setShowToolbar(false)
  }

  const saveEdit = async () => {
    if (!editingElement) return

    const newText = editingElement.innerText.trim()
    if (newText === originalText) {
      cancelEdit()
      return
    }

    setIsSaving(true)

    try {
      const response = await fetch('/api/edit-site', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          editType: 'text',
          oldText: originalText,
          newText: newText
        })
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Text updated!' })
        onEditComplete?.(originalText, newText)

        // Clean up
        editingElement.contentEditable = 'false'
        editingElement.style.outline = ''
        setEditingElement(null)
        setShowToolbar(false)
      } else {
        const error = await response.json()
        setMessage({ type: 'error', text: error.error || 'Failed to save' })
        // Revert text
        editingElement.innerText = originalText
      }
    } catch (error) {
      console.error('Save error:', error)
      setMessage({ type: 'error', text: 'Failed to save changes' })
      editingElement.innerText = originalText
    } finally {
      setIsSaving(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleEditMode}
        className={`fixed bottom-6 left-6 z-50 px-4 py-2 rounded-full shadow-lg transition-all flex items-center gap-2 ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        <span className="text-lg">✏️</span>
        <span className="text-sm font-medium">
          {isActive ? 'Done Editing' : 'Edit Text'}
        </span>
      </button>

      {/* Editing Toolbar */}
      {showToolbar && editingElement && (
        <div
          className="fixed z-50 bg-white rounded-lg shadow-xl px-3 py-2 flex items-center gap-2 transform -translate-x-1/2"
          style={{
            top: toolbarPosition.top,
            left: toolbarPosition.left
          }}
        >
          <button
            onClick={saveEdit}
            disabled={isSaving}
            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={cancelEdit}
            disabled={isSaving}
            className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Cancel
          </button>
          <span className="text-xs text-gray-400 ml-2">
            Enter to save, Esc to cancel
          </span>
        </div>
      )}

      {/* Edit Mode Indicator */}
      {isActive && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-blue-600 text-white px-4 py-2 rounded-full text-sm shadow-lg">
          ✏️ Click any text to edit it
        </div>
      )}

      {/* Status Message */}
      {message && (
        <div
          className={`fixed bottom-20 left-6 z-50 px-4 py-2 rounded-lg shadow-lg text-sm ${
            message.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          {message.text}
        </div>
      )}
    </>
  )
}
