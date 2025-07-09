'use client'

import { useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({
    newItemName: '',
    newItemDescription: '',
    newItemPrice: '',
    strategicInput: ''
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [contentPack, setContentPack] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setContentPack(null)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      console.log('Full API response:', data)
      
      // Check if there's an error in the response
      if (data.error) {
        console.error('API returned error:', data.error)
        throw new Error(data.error)
      }
      
      // Set the complete content pack
      console.log('Setting content pack:', data)
      setContentPack(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Strategic Post Generator
          </h1>
          <p className="text-gray-300 text-lg">
            Transform your new products into compelling social media campaigns using proven bestseller strategies
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="space-y-4">
            {/* New Item Name */}
            <div>
              <label htmlFor="newItemName" className="block text-gray-300 text-sm font-medium mb-2">
                New Item Name
              </label>
              <input
                type="text"
                id="newItemName"
                name="newItemName"
                value={formData.newItemName}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your new product name"
                required
              />
            </div>

            {/* New Item Description */}
            <div>
              <label htmlFor="newItemDescription" className="block text-gray-300 text-sm font-medium mb-2">
                New Item Description
              </label>
              <textarea
                id="newItemDescription"
                name="newItemDescription"
                value={formData.newItemDescription}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-vertical"
                placeholder="Describe your new product in detail..."
                required
              />
            </div>

            {/* New Item Price */}
            <div>
              <label htmlFor="newItemPrice" className="block text-gray-300 text-sm font-medium mb-2">
                New Item Price
              </label>
              <input
                type="text"
                id="newItemPrice"
                name="newItemPrice"
                value={formData.newItemPrice}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., $29.99"
                required
              />
            </div>

            {/* Strategic Input (Bestselling Item) */}
            <div>
              <label htmlFor="strategicInput" className="block text-gray-300 text-sm font-medium mb-2">
                Strategic Input (Bestselling Item)
              </label>
              <input
                type="text"
                id="strategicInput"
                name="strategicInput"
                value={formData.strategicInput}
                onChange={handleInputChange}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your bestselling product to model success"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            {isLoading ? 'Generating...' : 'Generate Campaign'}
          </button>
        </form>

        {/* Output Area */}
        <div className="mt-8">
          {isLoading && (
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
                <p className="text-gray-400">Generating your strategic content pack...</p>
              </div>
            </div>
          )}
          
          {error && (
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="text-center">
                <p className="text-red-400 mb-2">Error:</p>
                <p className="text-red-300">{error}</p>
              </div>
            </div>
          )}
          
          {contentPack && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">🎯 Strategic Content Pack</h2>
                <p className="text-gray-300">Complete campaign content for {formData.newItemName}</p>
              </div>
              
              {/* Launch Promotion Card */}
              <div className="bg-gradient-to-r from-purple-800 to-indigo-800 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>
                  <h3 className="text-xl font-semibold text-white">{contentPack.launchPromotion?.title}</h3>
                </div>
                <p className="text-gray-100 text-lg font-medium">{contentPack.launchPromotion?.content}</p>
              </div>
              
              {/* Instagram Post Card */}
              <div className="bg-gradient-to-r from-pink-800 to-purple-800 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-pink-400 rounded-full mr-3"></div>
                  <h3 className="text-xl font-semibold text-white">{contentPack.instagramPost?.title}</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-300 mb-2">Caption:</p>
                    <p className="text-white">{contentPack.instagramPost?.caption}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 mb-2">Hashtags:</p>
                    <p className="text-blue-300">{contentPack.instagramPost?.hashtags}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 mb-2">Image AI Prompt:</p>
                    <p className="text-gray-100 italic">{contentPack.instagramPost?.imagePrompt}</p>
                  </div>
                </div>
              </div>
              
              {/* Facebook Post Card */}
              <div className="bg-gradient-to-r from-blue-800 to-cyan-800 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>
                  <h3 className="text-xl font-semibold text-white">{contentPack.facebookPost?.title}</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-300 mb-2">Caption:</p>
                    <p className="text-white">{contentPack.facebookPost?.caption}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 mb-2">Hashtags:</p>
                    <p className="text-blue-300">{contentPack.facebookPost?.hashtags}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 mb-2">Image AI Prompt:</p>
                    <p className="text-gray-100 italic">{contentPack.facebookPost?.imagePrompt}</p>
                  </div>
                </div>
              </div>
              
              {/* Strategic Upsell Post Card */}
              <div className="bg-gradient-to-r from-green-800 to-teal-800 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                  <h3 className="text-xl font-semibold text-white">{contentPack.upsellPost?.title}</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-300 mb-2">Caption:</p>
                    <p className="text-white">{contentPack.upsellPost?.caption}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 mb-2">Hashtags:</p>
                    <p className="text-blue-300">{contentPack.upsellPost?.hashtags}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 mb-2">Image AI Prompt:</p>
                    <p className="text-gray-100 italic">{contentPack.upsellPost?.imagePrompt}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {!isLoading && !error && !contentPack && (
            <div className="bg-gray-800 rounded-lg p-6">
              <p className="text-gray-500 text-center">
                Your strategic content pack will appear here...
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
} 