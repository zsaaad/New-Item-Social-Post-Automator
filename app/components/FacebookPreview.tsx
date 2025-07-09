'use client';

interface FacebookPreviewProps {
  profileName: string;
  profilePicUrl: string;
  imageUrl: string;
  caption: string;
}

export default function FacebookPreview({
  profileName,
  profilePicUrl,
  imageUrl,
  caption
}: FacebookPreviewProps) {
  return (
    <div style={{ 
      backgroundColor: 'var(--card-dark)', 
      borderColor: 'var(--border-color)' 
    }} className="border rounded-lg max-w-lg mx-auto overflow-hidden shadow-[0_0_15px_var(--accent-glow)]">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <img
            src={profilePicUrl}
            alt={`${profileName} profile`}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `data:image/svg+xml;base64,${btoa(`
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="20" fill="#E5E7EB"/>
                  <circle cx="20" cy="15" r="5" fill="#9CA3AF"/>
                  <path d="M10 32c0-5.523 4.477-10 10-10s10 4.477 10 10" fill="#9CA3AF"/>
                </svg>
              `)}`;
            }}
          />
          <div>
            <h3 style={{ color: 'var(--text-primary)' }} className="font-bold text-sm">{profileName}</h3>
            <p style={{ color: 'var(--text-secondary)' }} className="text-xs">Just now · 🌎</p>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="px-4 pb-3">
        <p style={{ color: 'var(--text-primary)' }} className="text-sm leading-relaxed">{caption}</p>
      </div>

      {/* Image */}
      <div className="w-full bg-gray-900 flex items-center justify-center">
        <img
          src={imageUrl}
          alt="Post content"
          className="w-full h-auto object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `data:image/svg+xml;base64,${btoa(`
              <svg width="500" height="300" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="500" height="300" fill="#1F2937"/>
                <rect x="200" y="100" width="100" height="100" rx="8" fill="#374151"/>
                <circle cx="220" cy="120" r="8" fill="#6B7280"/>
                <path d="M210 140 L230 160 L270 120" stroke="#9CA3AF" stroke-width="2" fill="none"/>
                <text x="250" y="220" text-anchor="middle" fill="#9CA3AF" font-family="system-ui" font-size="14">
                  Image Preview
                </text>
              </svg>
            `)}`;
          }}
        />
      </div>

      {/* Engagement Metrics */}
      <div className="px-4 py-2 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {/* Reaction Icons */}
            <div className="flex items-center space-x-1">
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 6.5L4.5 10L11 3.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 10.5l-1.09-1C2.4 7.36 1 5.28 1 2.5 1 1.42 1.92 0.5 3 0.5c.74 0 1.41.41 1.5 1.09.59-.68 1.26-1.09 2-1.09 1.08 0 2 .92 2 2 0 2.78-1.4 4.86-3.91 6.91L6 10.5z" fill="white"/>
                </svg>
              </div>
            </div>
            <span style={{ color: 'var(--text-primary)' }} className="text-xs ml-2">You and 78 others</span>
          </div>
          <div style={{ color: 'var(--text-secondary)' }} className="text-xs">
            5 comments · 2 shares
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="px-4 py-2">
        <div className="flex items-center justify-around">
          {/* Like Button */}
          <button className="flex items-center justify-center space-x-2 py-2 px-3 hover:bg-gray-800 rounded-md transition-colors flex-1">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 9.5h3l2-7 4.5 4.5H16l-3 6-4.5-1.5L2 9.5z" stroke="var(--text-secondary)" strokeWidth="1.5" fill="none"/>
            </svg>
            <span style={{ color: 'var(--text-secondary)' }} className="text-sm font-medium hover:text-[var(--text-primary)] transition-colors">Like</span>
          </button>

          {/* Comment Button */}
          <button className="flex items-center justify-center space-x-2 py-2 px-3 hover:bg-gray-800 rounded-md transition-colors flex-1">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 8.5a7.38 7.38 0 01-.9 3.8 7.5 7.5 0 01-6.6 3.7 7.38 7.38 0 01-3.8-.9L1 17l1.9-3.7a7.38 7.38 0 01-.9-3.8 7.5 7.5 0 013.7-6.6 7.38 7.38 0 013.8-.9h.5a7.48 7.48 0 017 7v.5z" stroke="var(--text-secondary)" strokeWidth="1.5" fill="none"/>
            </svg>
            <span style={{ color: 'var(--text-secondary)' }} className="text-sm font-medium hover:text-[var(--text-primary)] transition-colors">Comment</span>
          </button>

          {/* Share Button */}
          <button className="flex items-center justify-center space-x-2 py-2 px-3 hover:bg-gray-800 rounded-md transition-colors flex-1">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L8 10" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 2L11 17L8 10L1 7L16 2z" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ color: 'var(--text-secondary)' }} className="text-sm font-medium hover:text-[var(--text-primary)] transition-colors">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
} 