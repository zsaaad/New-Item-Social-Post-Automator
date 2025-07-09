'use client';

import { useState } from 'react';
import { playfairDisplay } from './layout';

// Define a type for the structure of the AI's response for type safety
interface ContentPack {
  launchPromotion: { title: string; content: string };
  instagramPost: { title: string; caption: string; hashtags: string; imagePrompt: string };
  facebookPost: { title: string; caption: string; hashtags: string; imagePrompt: string };
  upsellPost: { title: string; caption: string; hashtags: string; imagePrompt: string };
}

export default function HomePage() {
  const [formData, setFormData] = useState({
    newItemName: 'Bozza (Bomboloni + Pizza)',
    itemDescription: 'Italian doughnuts served warm and filled with your choice of oozy Nutella, creamy custard, or seasonal jam—paired with a personal-sized artisanal pizza made with hand-stretched dough, tangy tomato base, and bubbling cheese. One plate. Two cravings. Fully satisfied.',
    price: 'RM22.90 (Set: 1 Bomboloni + 1 Personal Pizza)',
    strategicInput: 'Bestselling Potential: Highly Instagrammable + fusion novelty = viral app'
  });
  const [result, setResult] = useState<ContentPack | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // The body uses the EXACT key names the API expects
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Use the error message from our API's JSON response
        throw new Error(data.details || `HTTP error! status: ${response.status}`);
      }

      setResult(data);
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

  const handleCopy = async (text: string, cardId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [cardId]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [cardId]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  // A small component to render the result cards
  const ResultCard = ({ title, content, copyText, cardId }: { title: string; content: React.ReactNode; copyText: string; cardId: string }) => (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 relative">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-indigo-400">{title}</h3>
        <button
          onClick={() => handleCopy(copyText, cardId)}
          className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded transition-colors"
        >
          {copiedStates[cardId] ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="text-gray-300 whitespace-pre-wrap">{content}</div>
    </div>
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 text-white">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className={`text-3xl sm:text-4xl font-bold ${playfairDisplay.className}`}>Strategic Post Generator</h1>
          <p className="text-gray-400 mt-2">
            Transform your new products into compelling social media campaigns.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800/50 p-6 rounded-xl shadow-lg space-y-4 border border-gray-700">
          <div>
            <label htmlFor="newItemName" className="block text-sm font-medium text-gray-300 mb-1">New Item Name</label>
            <input type="text" name="newItemName" id="newItemName" value={formData.newItemName} onChange={handleInputChange} className="w-full bg-gray-700 border-gray-600 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="itemDescription" className="block text-sm font-medium text-gray-300 mb-1">New Item Description</label>
            <textarea name="itemDescription" id="itemDescription" value={formData.itemDescription} onChange={handleInputChange} rows={4} className="w-full bg-gray-700 border-gray-600 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">New Item Price</label>
            <input type="text" name="price" id="price" value={formData.price} onChange={handleInputChange} className="w-full bg-gray-700 border-gray-600 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <div>
            <label htmlFor="strategicInput" className="block text-sm font-medium text-gray-300 mb-1">Strategic Input (Bestselling Item)</label>
            <input type="text" name="strategicInput" id="strategicInput" value={formData.strategicInput} onChange={handleInputChange} className="w-full bg-gray-700 border-gray-600 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"/>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md disabled:bg-gray-500 transition-colors">
            {loading ? 'Generating...' : 'Generate Campaign'}
          </button>
        </form>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-md">
            <strong>Error:</strong> {error}
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <ResultCard 
              title={result.launchPromotion.title} 
              content={result.launchPromotion.content} 
              copyText={result.launchPromotion.content}
              cardId="launchPromotion"
            />
            <ResultCard 
              title={result.instagramPost.title} 
              content={<><p><strong>Caption:</strong> {result.instagramPost.caption}</p><p className="mt-2"><strong>Hashtags:</strong> {result.instagramPost.hashtags}</p><p className="mt-2"><strong>Image Prompt:</strong> <a href={`/generate-image?prompt=${encodeURIComponent(result.instagramPost.imagePrompt)}`} target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline hover:text-indigo-300 transition-colors">{result.instagramPost.imagePrompt}</a></p></>}
              copyText={`Caption: ${result.instagramPost.caption}\n\nHashtags: ${result.instagramPost.hashtags}\n\nImage Prompt: ${result.instagramPost.imagePrompt}`}
              cardId="instagramPost"
            />
            <ResultCard 
              title={result.facebookPost.title} 
              content={<><p><strong>Caption:</strong> {result.facebookPost.caption}</p><p className="mt-2"><strong>Hashtags:</strong> {result.facebookPost.hashtags}</p><p className="mt-2"><strong>Image Prompt:</strong> <a href={`/generate-image?prompt=${encodeURIComponent(result.facebookPost.imagePrompt)}`} target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline hover:text-indigo-300 transition-colors">{result.facebookPost.imagePrompt}</a></p></>}
              copyText={`Caption: ${result.facebookPost.caption}\n\nHashtags: ${result.facebookPost.hashtags}\n\nImage Prompt: ${result.facebookPost.imagePrompt}`}
              cardId="facebookPost"
            />
            <ResultCard 
              title={result.upsellPost.title} 
              content={<><p><strong>Caption:</strong> {result.upsellPost.caption}</p><p className="mt-2"><strong>Hashtags:</strong> {result.upsellPost.hashtags}</p><p className="mt-2"><strong>Image Prompt:</strong> <a href={`/generate-image?prompt=${encodeURIComponent(result.upsellPost.imagePrompt)}`} target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline hover:text-indigo-300 transition-colors">{result.upsellPost.imagePrompt}</a></p></>}
              copyText={`Caption: ${result.upsellPost.caption}\n\nHashtags: ${result.upsellPost.hashtags}\n\nImage Prompt: ${result.upsellPost.imagePrompt}`}
              cardId="upsellPost"
            />
          </div>
        )}
      </div>
    </main>
  );
} 