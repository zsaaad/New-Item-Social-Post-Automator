'use client';

interface InstagramPreviewProps {
  profileName: string;
  profilePicUrl: string;
  imageUrl: string;
  caption: string;
}

export default function InstagramPreview({
  profileName,
  profilePicUrl,
  imageUrl,
  caption,
}: InstagramPreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center p-3 border-b border-gray-200">
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
    <div style={{ 
      backgroundColor: 'var(--card-dark)', 
      borderColor: 'var(--border-color)' 
    }} className="border rounded-lg max-w-sm mx-auto overflow-hidden shadow-[0_0_15px_var(--accent-glow)]">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <img
            src={profilePicUrl}
            alt={`${profileName} profile`}
            className="w-8 h-8 rounded-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `data:image/svg+xml;base64,${btoa(`
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#E5E7EB"/>
                  <circle cx="16" cy="12" r="4" fill="#9CA3AF"/>
                  <path d="M8 26c0-4.418 3.582-8 8-8s8 3.582 8 8" fill="#9CA3AF"/>
                </svg>
              `)}`;
            }}
          />
          <span style={{ color: 'var(--text-primary)' }} className="font-bold text-sm">{profileName}</span>
        </div>
        <button className="p-1 hover:opacity-70 transition-opacity">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="2" r="1.5" fill="var(--text-secondary)"/>
            <circle cx="8" cy="8" r="1.5" fill="var(--text-secondary)"/>
            <circle cx="8" cy="14" r="1.5" fill="var(--text-secondary)"/>
          </svg>
        </button>
      </div>

      {/* Image */}
      <div className="w-full aspect-square bg-gray-900 flex items-center justify-center">
        <img
          src={imageUrl}
          alt="Post content"
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `data:image/svg+xml;base64,${btoa(`
              <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="400" fill="#1F2937"/>
                <rect x="150" y="150" width="100" height="100" rx="8" fill="#374151"/>
                <circle cx="170" cy="170" r="8" fill="#6B7280"/>
                <path d="M160 190 L180 210 L220 170" stroke="#9CA3AF" stroke-width="2" fill="none"/>
                <text x="200" y="280" text-anchor="middle" fill="#9CA3AF" font-family="system-ui" font-size="14">
                  Image Preview
                </text>
              </svg>
            `)}`;
          }}
        />
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-4">
          {/* Heart Icon */}
          <button className="p-1 hover:opacity-70 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="var(--text-secondary)" strokeWidth="1.5" fill="none"/>
            </svg>
          </button>
          
          {/* Chat Bubble Icon */}
          <button className="p-1 hover:opacity-70 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="var(--text-secondary)" strokeWidth="1.5" fill="none"/>
            </svg>
          </button>
          
          {/* Paper Airplane Icon */}
          <button className="p-1 hover:opacity-70 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L2 8.5l7.5 1.5 1.5 7.5L22 2z" stroke="var(--text-secondary)" strokeWidth="1.5" fill="none"/>
              <path d="M11 9L22 2" stroke="var(--text-secondary)" strokeWidth="1.5" fill="none"/>
            </svg>
          </button>
        </div>
        
        {/* Bookmark Icon */}
        <button className="p-1 hover:opacity-70 transition-opacity">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z" stroke="var(--text-secondary)" strokeWidth="1.5" fill="none"/>
          </svg>
        </button>
      </div>

      {/* Likes Count */}
      <div className="px-3 pb-2">
        <p style={{ color: 'var(--text-primary)' }} className="text-sm">
          Liked by <span className="font-semibold">demo_user</span> and <span className="font-semibold">1,234 others</span>
        </p>
      </div>

      {/* Caption */}
      <div className="px-3 pb-2">
        <p style={{ color: 'var(--text-primary)' }} className="text-sm">
          <span className="font-bold">{profileName}</span> {caption}
        </p>
      </div>

      {/* Timestamp */}
      <div className="px-3 pb-3">
        <p style={{ color: 'var(--text-secondary)' }} className="text-xs uppercase">2 HOURS AGO</p>
      </div>
    </div>
  );
} 