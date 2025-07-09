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
  const [response, setResponse] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  
  // Debug state changes
  console.log('Current state:', { isLoading, response, error })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted!', formData)
    setIsLoading(true)
    setError(null)
    setResponse(null)

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
      console.log('API Response:', data)
      console.log('Setting response to:', data.message)
      setResponse(data.message)
    } catch (err) {
      console.error('API Error:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      console.log('Setting isLoading to false')
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
        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 mb-8" onInvalid={() => console.log('Form validation failed!')}>
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
            onClick={() => console.log('Button clicked!')}
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            {isLoading ? 'Generating...' : 'Generate Campaign'}
          </button>
        </form>

        {/* Output Area */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          {isLoading && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-gray-400">Generating your campaign...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center">
              <p className="text-red-400 mb-2">Error:</p>
              <p className="text-red-300">{error}</p>
            </div>
          )}
          
          {response && (
            <div className="text-center">
              <p className="text-green-400 mb-2">Response:</p>
              <p className="text-white">{response}</p>
            </div>
          )}
          
          {!isLoading && !error && !response && (
            <p className="text-gray-500 text-center">
              Your full campaign content pack will appear here...
            </p>
          )}
        </div>
      </div>
    </main>
  )
} 