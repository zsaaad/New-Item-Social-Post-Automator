'use client';

import { useState } from 'react';
import { manrope } from './fonts';
import SocialPostPreview from './components/SocialPostPreview';
import InstagramPreview from './components/InstagramPreview';
import FacebookPreview from './components/FacebookPreview';

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
    postType: 'instagram' | 'facebook' | 'generic';
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
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
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

  const handlePreview = (caption: string, imagePrompt: string, postType: 'instagram' | 'facebook' | 'generic' = 'generic') => {
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
      caption: caption,
      postType: postType
    });
    setIsPreviewOpen(true);
  };

  const ResultCard = ({ title, content, copyText, cardId, previewData }: { 
    title: string; 
    content: React.ReactNode; 
    copyText: string; 
    cardId: string;
    previewData?: { caption: string; imagePrompt: string; postType?: 'instagram' | 'facebook' | 'generic' } 
  }) => (
    <div style={{ 
      backgroundColor: 'var(--card-dark)', 
      borderColor: 'var(--border-color)' 
    }} className="border rounded-md p-6 shadow-[0_0_15px_var(--accent-glow)] relative">
      <div className="flex justify-between items-start mb-4">
        <h3 style={{ color: 'var(--accent-primary)' }} className="font-bold text-lg">{title}</h3>
        <div className="flex space-x-2">
          {previewData && (
            <button
              onClick={() => handlePreview(previewData.caption, previewData.imagePrompt, previewData.postType)}
              className="bg-transparent text-[var(--accent-primary)] border-2 border-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-black transition-all text-sm px-4 py-1 rounded-md font-medium"
            >
              Preview ✨
            </button>
          )}
          <button
            onClick={() => handleCopy(copyText, cardId)}
            style={{ 
              backgroundColor: 'var(--border-color)',
              color: 'var(--text-secondary)'
            }}
            className="text-sm px-4 py-1 rounded-md hover:opacity-80 transition-opacity"
          >
            {copiedStates[cardId] ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      <div style={{ color: 'var(--text-primary)' }} className="whitespace-pre-wrap leading-relaxed">{content}</div>
    </div>
  );

  return (
    <main style={{ color: 'var(--text-primary)' }} className="min-h-screen p-6">
      {/* Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        
        {/* Left Column - Input */}
        <div className="space-y-6">
          <div className="text-center lg:text-left">
            <h1 className={`text-4xl lg:text-5xl font-bold ${manrope.className}`}>Creative Studio</h1>
            <p style={{ color: 'var(--text-secondary)' }} className="mt-3 text-lg">
              Transform your new products into compelling social media campaigns.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ 
            backgroundColor: 'var(--card-dark)', 
            borderColor: 'var(--border-color)' 
          }} className="p-6 rounded-md border shadow-[0_0_15px_var(--accent-glow)] space-y-6">
            <div>
              <label htmlFor="newItemName" style={{ color: 'var(--text-primary)' }} className="block text-sm font-medium mb-2">New Item Name</label>
              <input 
                type="text" 
                name="newItemName" 
                id="newItemName" 
                value={formData.newItemName} 
                onChange={handleInputChange} 
                className="w-full bg-black border border-[var(--border-color)] rounded-md p-3 text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="itemDescription" style={{ color: 'var(--text-primary)' }} className="block text-sm font-medium mb-2">New Item Description</label>
              <textarea 
                name="itemDescription" 
                id="itemDescription" 
                value={formData.itemDescription} 
                onChange={handleInputChange} 
                rows={4} 
                className="w-full bg-black border border-[var(--border-color)] rounded-md p-3 text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent outline-none transition-all resize-none"
              />
            </div>
            <div>
              <label htmlFor="price" style={{ color: 'var(--text-primary)' }} className="block text-sm font-medium mb-2">New Item Price</label>
              <input 
                type="text" 
                name="price" 
                id="price" 
                value={formData.price} 
                onChange={handleInputChange} 
                className="w-full bg-black border border-[var(--border-color)] rounded-md p-3 text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label htmlFor="strategicInput" style={{ color: 'var(--text-primary)' }} className="block text-sm font-medium mb-2">Strategic Input</label>
              <input 
                type="text" 
                name="strategicInput" 
                id="strategicInput" 
                value={formData.strategicInput} 
                onChange={handleInputChange} 
                className="w-full bg-black border border-[var(--border-color)] rounded-md p-3 text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent outline-none transition-all"
              />
            </div>
            <button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-transparent text-[var(--accent-primary)] border-2 border-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-black transition-all font-bold py-3 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Generate Campaign'}
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

          {result ? (
            <div className="space-y-6">
              <ResultCard 
                title={result.launchPromotion.title} 
                content={result.launchPromotion.content} 
                copyText={result.launchPromotion.content}
                cardId="launchPromotion"
              />
              <ResultCard 
                title={result.instagramPost.title} 
                content={<><p><strong>Caption:</strong> {result.instagramPost.caption}</p><p className="mt-2"><strong>Hashtags:</strong> {result.instagramPost.hashtags}</p><p className="mt-2"><strong>Image Prompt:</strong> <a href={`/generate-image?prompt=${encodeURIComponent(result.instagramPost.imagePrompt)}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }} className="underline hover:opacity-80 transition-opacity">{result.instagramPost.imagePrompt}</a></p></>}
                copyText={`Caption: ${result.instagramPost.caption}\n\nHashtags: ${result.instagramPost.hashtags}\n\nImage Prompt: ${result.instagramPost.imagePrompt}`}
                cardId="instagramPost"
                previewData={{
                  caption: `${result.instagramPost.caption} ${result.instagramPost.hashtags}`,
                  imagePrompt: result.instagramPost.imagePrompt,
                  postType: 'instagram'
                }}
              />
              <ResultCard 
                title={result.facebookPost.title} 
                content={<><p><strong>Caption:</strong> {result.facebookPost.caption}</p><p className="mt-2"><strong>Hashtags:</strong> {result.facebookPost.hashtags}</p><p className="mt-2"><strong>Image Prompt:</strong> <a href={`/generate-image?prompt=${encodeURIComponent(result.facebookPost.imagePrompt)}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }} className="underline hover:opacity-80 transition-opacity">{result.facebookPost.imagePrompt}</a></p></>}
                copyText={`Caption: ${result.facebookPost.caption}\n\nHashtags: ${result.facebookPost.hashtags}\n\nImage Prompt: ${result.facebookPost.imagePrompt}`}
                cardId="facebookPost"
                previewData={{
                  caption: `${result.facebookPost.caption} ${result.facebookPost.hashtags}`,
                  imagePrompt: result.facebookPost.imagePrompt,
                  postType: 'facebook'
                }}
              />
              <ResultCard 
                title={result.upsellPost.title} 
                content={<><p><strong>Caption:</strong> {result.upsellPost.caption}</p><p className="mt-2"><strong>Hashtags:</strong> {result.upsellPost.hashtags}</p><p className="mt-2"><strong>Image Prompt:</strong> <a href={`/generate-image?prompt=${encodeURIComponent(result.upsellPost.imagePrompt)}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }} className="underline hover:opacity-80 transition-opacity">{result.upsellPost.imagePrompt}</a></p></>}
                copyText={`Caption: ${result.upsellPost.caption}\n\nHashtags: ${result.upsellPost.hashtags}\n\nImage Prompt: ${result.upsellPost.imagePrompt}`}
                cardId="upsellPost"
                previewData={{
                  caption: `${result.upsellPost.caption} ${result.upsellPost.hashtags}`,
                  imagePrompt: result.upsellPost.imagePrompt,
                  postType: 'instagram'
                }}
              />
            </div>
          ) : (
            <div style={{ 
              backgroundColor: 'var(--card-dark)', 
              borderColor: 'var(--border-color)' 
            }} className="border rounded-md p-8 text-center shadow-[0_0_15px_var(--accent-glow)]">
              <div className="text-6xl mb-4">🎨</div>
              <h3 style={{ color: 'var(--text-primary)' }} className="text-xl font-bold mb-2">Your Creative Output</h3>
              <p style={{ color: 'var(--text-secondary)' }} className="text-sm">
                Generated campaigns and social media posts will appear here
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal for Social Post Preview */}
      {isPreviewOpen && previewData && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-lg w-full">
            <button
              onClick={() => setIsPreviewOpen(false)}
              style={{ backgroundColor: 'var(--card-dark)', borderColor: 'var(--border-color)' }}
              className="absolute -top-4 -right-4 border hover:opacity-80 rounded-full w-8 h-8 flex items-center justify-center z-10 transition-opacity shadow-md"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {previewData.postType === 'instagram' && (
              <InstagramPreview
                profileName={previewData.profileName}
                profilePicUrl={previewData.profilePicUrl}
                imageUrl={previewData.imageUrl}
                caption={previewData.caption}
              />
            )}
            {previewData.postType === 'facebook' && (
              <FacebookPreview
                profileName={previewData.profileName}
                profilePicUrl={previewData.profilePicUrl}
                imageUrl={previewData.imageUrl}
                caption={previewData.caption}
              />
            )}
            {previewData.postType === 'generic' && (
              <SocialPostPreview
                profileName={previewData.profileName}
                profilePicUrl={previewData.profilePicUrl}
                imageUrl={previewData.imageUrl}
                caption={previewData.caption}
              />
            )}
          </div>
        </div>
      )}
    </main>
  );
} 