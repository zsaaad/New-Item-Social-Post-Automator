'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { inter } from '../fonts';

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
    <main style={{ color: 'var(--text-primary)' }} className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className={`text-3xl sm:text-4xl font-bold ${inter.className}`}>Image Generation Engine</h1>
          <p style={{ color: 'var(--text-secondary)' }} className="mt-2">
            Generate visual mockups for your content (Demo Mode).
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ 
          backgroundColor: 'var(--card-background)', 
          borderColor: 'var(--border-color)' 
        }} className="p-6 rounded-lg shadow-md space-y-4 border">
          <div>
            <label htmlFor="prompt" style={{ color: 'var(--text-primary)' }} className="block text-sm font-medium mb-2">
              Image Prompt
            </label>
            <textarea
              id="prompt"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              style={{ 
                backgroundColor: 'var(--background)',
                borderColor: 'var(--border-color)',
                color: 'var(--text-primary)'
              }}
              className="w-full border rounded-md p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all resize-none"
              placeholder="Describe the image you want to generate..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="style" style={{ color: 'var(--text-primary)' }} className="block text-sm font-medium mb-2">
                Style
              </label>
              <select
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                style={{ 
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
                className="w-full border rounded-md p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
              >
                <option value="Photorealistic">Photorealistic</option>
                <option value="Illustration">Illustration</option>
                <option value="Fantasy Art">Fantasy Art</option>
                <option value="Anime">Anime</option>
              </select>
            </div>

            <div>
              <label htmlFor="color" style={{ color: 'var(--text-primary)' }} className="block text-sm font-medium mb-2">
                Color
              </label>
              <select
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ 
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
                className="w-full border rounded-md p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
              >
                <option value="Vibrant">Vibrant</option>
                <option value="Muted Tones">Muted Tones</option>
                <option value="Monochromatic">Monochromatic</option>
                <option value="Warm Palette">Warm Palette</option>
              </select>
            </div>

            <div>
              <label htmlFor="background" style={{ color: 'var(--text-primary)' }} className="block text-sm font-medium mb-2">
                Background
              </label>
              <select
                id="background"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                style={{ 
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border-color)',
                  color: 'var(--text-primary)'
                }}
                className="w-full border rounded-md p-3 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition-all"
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
            style={{ 
              backgroundColor: loading ? 'var(--text-secondary)' : 'var(--accent-primary)',
              color: 'var(--text-primary)'
            }}
            className="w-full font-bold py-3 px-4 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating Image...' : 'Generate Image'}
          </button>
        </form>

        {loading && (
          <div style={{ 
            backgroundColor: 'var(--card-background)', 
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)'
          }} className="border p-6 rounded-md text-center shadow-md">
            <div style={{ borderColor: 'var(--accent-primary)' }} className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 mb-4"></div>
            <p>Creating visual mockup for your prompt...</p>
          </div>
        )}

        {error && (
          <div style={{ 
            backgroundColor: '#FEF2F2', 
            borderColor: '#FECACA',
            color: '#DC2626'
          }} className="border p-4 rounded-md">
            <strong>Error:</strong> {error}
          </div>
        )}

        {imageBase64 && (
          <div style={{ 
            backgroundColor: 'var(--card-background)', 
            borderColor: 'var(--border-color)' 
          }} className="border rounded-lg p-6 shadow-md">
            <h3 style={{ color: 'var(--accent-primary)' }} className="text-lg font-semibold mb-4">Visual Mockup</h3>
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