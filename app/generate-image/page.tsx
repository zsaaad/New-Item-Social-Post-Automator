'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { playfairDisplay } from '../fonts';

export default function GenerateImagePage() {
  const searchParams = useSearchParams();
  const promptFromUrl = searchParams.get('prompt');
  
  const [prompt, setPrompt] = useState(promptFromUrl ? decodeURIComponent(promptFromUrl) : '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [style, setStyle] = useState('Photorealistic');
  const [color, setColor] = useState('Vibrant');
  const [background, setBackground] = useState('Studio Backdrop');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError(null);
    setImageBase64(null);

    try {
      const response = await fetch('/api/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style, color, background }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || `HTTP error! status: ${response.status}`);
      }

      setImageBase64(data.imageBase64);
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
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 text-white">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className={`text-3xl sm:text-4xl font-bold ${playfairDisplay.className}`}>Image Generation Engine</h1>
          <p className="text-gray-400 mt-2">
            Generate visual mockups for your content (Demo Mode).
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
              className="w-full bg-gray-700 border-gray-600 rounded-md p-3 focus:ring-amber-500 focus:border-amber-500 text-white placeholder-gray-400"
              placeholder="Describe the image you want to generate..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="style" className="block text-sm font-medium text-gray-300 mb-2">
                Style
              </label>
              <select
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full bg-gray-700 border-gray-600 rounded-md p-3 focus:ring-amber-500 focus:border-amber-500 text-white"
              >
                <option value="Photorealistic">Photorealistic</option>
                <option value="Illustration">Illustration</option>
                <option value="Fantasy Art">Fantasy Art</option>
                <option value="Anime">Anime</option>
              </select>
            </div>

            <div>
              <label htmlFor="color" className="block text-sm font-medium text-gray-300 mb-2">
                Color
              </label>
              <select
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full bg-gray-700 border-gray-600 rounded-md p-3 focus:ring-amber-500 focus:border-amber-500 text-white"
              >
                <option value="Vibrant">Vibrant</option>
                <option value="Muted Tones">Muted Tones</option>
                <option value="Monochromatic">Monochromatic</option>
                <option value="Warm Palette">Warm Palette</option>
              </select>
            </div>

            <div>
              <label htmlFor="background" className="block text-sm font-medium text-gray-300 mb-2">
                Background
              </label>
              <select
                id="background"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="w-full bg-gray-700 border-gray-600 rounded-md p-3 focus:ring-amber-500 focus:border-amber-500 text-white"
              >
                <option value="Studio Backdrop">Studio Backdrop</option>
                <option value="Outdoor Scenery">Outdoor Scenery</option>
                <option value="Abstract Texture">Abstract Texture</option>
                <option value="Wooden Table">Wooden Table</option>
              </select>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-md disabled:bg-gray-500 transition-colors"
          >
            {loading ? 'Generating Image...' : 'Generate Image'}
          </button>
        </form>

        {loading && (
          <div className="bg-gray-800/50 border border-gray-700 text-gray-300 p-6 rounded-md text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mb-4"></div>
            <p>Creating visual mockup for your prompt...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-md">
            <strong>Error:</strong> {error}
          </div>
        )}

        {imageBase64 && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-400 mb-4">Visual Mockup</h3>
            <img
              src={`data:image/svg+xml;base64,${imageBase64}`}
              alt="Visual mockup"
              className="w-full h-auto rounded-lg shadow-lg max-w-full"
            />
          </div>
        )}
      </div>
    </main>
  );
} 