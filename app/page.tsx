'use client';

import { useState } from 'react';
import { playfairDisplay } from './fonts';
import SocialPostPreview from './components/SocialPostPreview';

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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<{
    profileName: string;
    profilePicUrl: string;
    imageUrl: string;
    caption: string;
  } | null>(null);

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

  const handlePreview = (caption: string, imagePrompt: string) => {
    // Create a simple SVG placeholder with the image prompt text
    const svgContent = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" text-anchor="middle" fill="#374151" font-family="Arial, sans-serif" font-size="14" font-weight="bold">
          <tspan x="50%" dy="0">Image Preview</tspan>
          <tspan x="50%" dy="20" font-size="12" font-weight="normal">${imagePrompt.substring(0, 100)}${imagePrompt.length > 100 ? '...' : ''}</tspan>
        </text>
      </svg>
    `;
    
    const imageUrl = `data:image/svg+xml;base64,${btoa(svgContent)}`;
    
    setPreviewData({
      profileName: "Your Cafe Name",
      profilePicUrl: "/logo.png",
      imageUrl: imageUrl,
      caption: caption
    });
    setIsPreviewOpen(true);
  };

  // A small component to render the result cards
  const ResultCard = ({ title, content, copyText, cardId, previewData }: { 
    title: string; 
    content: React.ReactNode; 
    copyText: string; 
    cardId: string;
    previewData?: { caption: string; imagePrompt: string } 
  }) => (
    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 relative">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-amber-400">{title}</h3>
        <div className="flex space-x-2">
          {previewData && (
            <button
              onClick={() => handlePreview(previewData.caption, previewData.imagePrompt)}
              className="text-xs bg-amber-600 hover:bg-amber-700 text-white px-2 py-1 rounded transition-colors"
            >
              Preview ✨
            </button>
          )}
          <button
            onClick={() => handleCopy(copyText, cardId)}
            className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded transition-colors"
          >
            {copiedStates[cardId] ? 'Copied!' : 'Copy'}
          </button>
        </div>
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
            <input type="text" name="newItemName" id="newItemName" value={formData.newItemName} onChange={handleInputChange} className="w-full bg-gray-700 border-gray-600 rounded-md p-2 focus:ring-amber-500 focus:border-amber-500"/>
          </div>
          <div>
            <label htmlFor="itemDescription" className="block text-sm font-medium text-gray-300 mb-1">New Item Description</label>
            <textarea name="itemDescription" id="itemDescription" value={formData.itemDescription} onChange={handleInputChange} rows={4} className="w-full bg-gray-700 border-gray-600 rounded-md p-2 focus:ring-amber-500 focus:border-amber-500"/>
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">New Item Price</label>
            <input type="text" name="price" id="price" value={formData.price} onChange={handleInputChange} className="w-full bg-gray-700 border-gray-600 rounded-md p-2 focus:ring-amber-500 focus:border-amber-500"/>
          </div>
          <div>
            <label htmlFor="strategicInput" className="block text-sm font-medium text-gray-300 mb-1">Strategic Input (Bestselling Item)</label>
            <input type="text" name="strategicInput" id="strategicInput" value={formData.strategicInput} onChange={handleInputChange} className="w-full bg-gray-700 border-gray-600 rounded-md p-2 focus:ring-amber-500 focus:border-amber-500"/>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-md disabled:bg-gray-500 transition-colors">
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
              content={<><p><strong>Caption:</strong> {result.instagramPost.caption}</p><p className="mt-2"><strong>Hashtags:</strong> {result.instagramPost.hashtags}</p><p className="mt-2"><strong>Image Prompt:</strong> <a href={`/generate-image?prompt=${encodeURIComponent(result.instagramPost.imagePrompt)}`} target="_blank" rel="noopener noreferrer" className="text-amber-400 underline hover:text-amber-300 transition-colors">{result.instagramPost.imagePrompt}</a></p></>}
              copyText={`Caption: ${result.instagramPost.caption}\n\nHashtags: ${result.instagramPost.hashtags}\n\nImage Prompt: ${result.instagramPost.imagePrompt}`}
              cardId="instagramPost"
              previewData={{
                caption: `${result.instagramPost.caption} ${result.instagramPost.hashtags}`,
                imagePrompt: result.instagramPost.imagePrompt
              }}
            />
            <ResultCard 
              title={result.facebookPost.title} 
              content={<><p><strong>Caption:</strong> {result.facebookPost.caption}</p><p className="mt-2"><strong>Hashtags:</strong> {result.facebookPost.hashtags}</p><p className="mt-2"><strong>Image Prompt:</strong> <a href={`/generate-image?prompt=${encodeURIComponent(result.facebookPost.imagePrompt)}`} target="_blank" rel="noopener noreferrer" className="text-amber-400 underline hover:text-amber-300 transition-colors">{result.facebookPost.imagePrompt}</a></p></>}
              copyText={`Caption: ${result.facebookPost.caption}\n\nHashtags: ${result.facebookPost.hashtags}\n\nImage Prompt: ${result.facebookPost.imagePrompt}`}
              cardId="facebookPost"
              previewData={{
                caption: `${result.facebookPost.caption} ${result.facebookPost.hashtags}`,
                imagePrompt: result.facebookPost.imagePrompt
              }}
            />
            <ResultCard 
              title={result.upsellPost.title} 
              content={<><p><strong>Caption:</strong> {result.upsellPost.caption}</p><p className="mt-2"><strong>Hashtags:</strong> {result.upsellPost.hashtags}</p><p className="mt-2"><strong>Image Prompt:</strong> <a href={`/generate-image?prompt=${encodeURIComponent(result.upsellPost.imagePrompt)}`} target="_blank" rel="noopener noreferrer" className="text-amber-400 underline hover:text-amber-300 transition-colors">{result.upsellPost.imagePrompt}</a></p></>}
              copyText={`Caption: ${result.upsellPost.caption}\n\nHashtags: ${result.upsellPost.hashtags}\n\nImage Prompt: ${result.upsellPost.imagePrompt}`}
              cardId="upsellPost"
              previewData={{
                caption: `${result.upsellPost.caption} ${result.upsellPost.hashtags}`,
                imagePrompt: result.upsellPost.imagePrompt
              }}
            />
          </div>
        )}
      </div>

      {/* Modal for Social Post Preview */}
      {isPreviewOpen && previewData && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-lg w-full">
            {/* Close Button */}
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute -top-4 -right-4 bg-gray-800 hover:bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center z-10 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Social Post Preview */}
            <SocialPostPreview
              profileName={previewData.profileName}
              profilePicUrl={previewData.profilePicUrl}
              imageUrl={previewData.imageUrl}
              caption={previewData.caption}
            />
          </div>
        </div>
      )}
    </main>
  );
} 