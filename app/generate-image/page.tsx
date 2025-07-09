'use client';

import { useState } from 'react';

export default function GenerateImagePage() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const response = await fetch('/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || `HTTP error! status: ${response.status}`);
      }

      setImageUrl(data.imageUrl);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-gray-900 text-white">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold">Image Generation Engine</h1>
          <p className="text-gray-400 mt-2">
            Generate stunning images using DALL-E 3 AI technology.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800/50 p-6 rounded-xl shadow-lg space-y-4 border border-gray-700">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
              Image Prompt
            </label>
            <textarea
              id="prompt"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              className="w-full bg-gray-700 border-gray-600 rounded-md p-3 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-400"
              placeholder="Describe the image you want to generate..."
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md disabled:bg-gray-500 transition-colors"
          >
            {loading ? 'Generating Image...' : 'Generate Image'}
          </button>
        </form>

        {loading && (
          <div className="bg-gray-800/50 border border-gray-700 text-gray-300 p-6 rounded-md text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
            <p>Generating image, this can take up to 30 seconds...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-md">
            <strong>Error:</strong> {error}
          </div>
        )}

        {imageUrl && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-indigo-400 mb-4">Generated Image</h3>
            <img
              src={imageUrl}
              alt="Generated image"
              className="w-full h-auto rounded-lg shadow-lg max-w-full"
            />
          </div>
        )}
      </div>
    </main>
  );
} 