'use client';

import React, { useState } from 'react';

interface ImageGeneratorProps {
  initialPrompt?: string;
}

export default function ImageGenerator({ initialPrompt = '' }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
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
    setImageUrl(null);

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Input */}
      <div className="space-y-6">
        <form onSubmit={handleSubmit} style={{ 
          backgroundColor: 'var(--card-dark)', 
          borderColor: 'var(--border-color)' 
        }} className="p-6 rounded-md border shadow-[0_0_20px_var(--accent-glow)] space-y-6">
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
              className="w-full bg-black/50 border border-[var(--border-color)] rounded-md p-3 text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent outline-none transition-all resize-none"
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
                className="w-full bg-black/50 border border-[var(--border-color)] rounded-md p-3 text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent outline-none transition-all"
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
                className="w-full bg-black/50 border border-[var(--border-color)] rounded-md p-3 text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent outline-none transition-all"
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
                className="w-full bg-black/50 border border-[var(--border-color)] rounded-md p-3 text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent outline-none transition-all"
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
            className="w-full bg-[var(--accent-primary)] text-white font-bold hover:bg-orange-600 transition-all py-3 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating with DALL-E 3...' : 'Generate Image'}
          </button>
        </form>
      </div>

      {/* Right Column - Output */}
      <div className="space-y-6">
        {error && (
          <div className="bg-red-900/20 border border-red-500/50 text-red-300 p-4 rounded-md">
            <strong>Error:</strong> {error}
          </div>
        )}

        {loading && (
          <div style={{ 
            backgroundColor: 'var(--card-dark)', 
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)'
          }} className="border p-8 rounded-md text-center shadow-[0_0_20px_var(--accent-glow)]">
            <div style={{ borderColor: 'var(--accent-primary)' }} className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 mb-4"></div>
            <p className="text-lg font-medium">Creating AI-generated image...</p>
            <p style={{ color: 'var(--text-secondary)' }} className="text-sm mt-2">Powered by DALL-E 3</p>
          </div>
        )}

        {imageUrl ? (
          <div style={{ 
            backgroundColor: 'var(--card-dark)', 
            borderColor: 'var(--border-color)' 
          }} className="border rounded-md p-6 shadow-[0_0_20px_var(--accent-glow)]">
            <h3 style={{ color: 'var(--accent-primary)' }} className="text-xl font-bold mb-4">AI Generated Image</h3>
            <img
              src={imageUrl}
              alt="AI generated image"
              className="w-full h-auto rounded-md shadow-lg"
            />
            <div className="mt-4 text-center">
              <a 
                href={imageUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-[var(--accent-primary)] text-white font-bold hover:bg-orange-600 transition-all px-4 py-2 rounded-md text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Full Resolution</span>
              </a>
            </div>
          </div>
        ) : (
          <div style={{ 
            backgroundColor: 'var(--card-dark)', 
            borderColor: 'var(--border-color)' 
          }} className="border rounded-md p-8 text-center shadow-[0_0_20px_var(--accent-glow)]">
            <div className="text-6xl mb-4">🤖</div>
            <h3 style={{ color: 'var(--text-primary)' }} className="text-xl font-bold mb-2">AI Generated Images</h3>
            <p style={{ color: 'var(--text-secondary)' }} className="text-sm">
              High-quality images powered by DALL-E 3 will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 