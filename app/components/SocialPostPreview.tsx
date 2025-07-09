'use client';

interface SocialPostPreviewProps {
  profileName: string;
  profilePicUrl: string;
  imageUrl: string;
  caption: string;
}

export default function SocialPostPreview({
  profileName,
  profilePicUrl,
  imageUrl,
  caption,
}: SocialPostPreviewProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center p-4 border-b border-gray-200">
        <img
          src={profilePicUrl}
          alt={`${profileName}'s profile`}
          className="w-10 h-10 rounded-full object-cover mr-3"
        />
        <span className="font-bold text-gray-900">{profileName}</span>
      </div>

      {/* Main Image Section */}
      <div className="relative">
        <img
          src={imageUrl}
          alt="Post content"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Footer Section */}
      <div className="p-4">
        {/* Social Action Icons */}
        <div className="flex items-center space-x-4 mb-3">
          {/* Like Icon (Heart) */}
          <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          {/* Comment Icon (Chat Bubble) */}
          <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>

          {/* Share Icon (Paper Airplane) */}
          <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>

        {/* Caption */}
        <div className="text-gray-900">
          <span className="font-semibold mr-2">{profileName}</span>
          <span className="text-gray-800">{caption}</span>
        </div>
      </div>
    </div>
  );
} 