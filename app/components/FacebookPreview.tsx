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
  caption,
}: FacebookPreviewProps) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="bg-white border border-gray-200 rounded-lg max-w-lg mx-auto overflow-hidden shadow-sm">
        {/* Header Section */}
        <div className="p-4">
          <div className="flex items-start">
            <img
              src={profilePicUrl}
              alt={`${profileName}'s profile`}
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">{profileName}</h3>
              <p className="text-xs text-gray-500 flex items-center">
                2h · 🌎
              </p>
            </div>
            {/* Three Dots Menu */}
            <button className="text-gray-500 hover:text-gray-700 ml-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Caption Section - Above Image */}
        <div className="px-4 pb-3">
          <p className="text-gray-900 text-sm leading-relaxed">{caption}</p>
        </div>

        {/* Image Section */}
        <div className="relative">
          <img
            src={imageUrl}
            alt="Post content"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Engagement Metrics */}
        <div className="px-4 py-2 border-b border-gray-100">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              {/* Reaction Icons */}
              <div className="flex items-center space-x-1">
                <div className="flex -space-x-1">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                    👍
                  </div>
                  <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
                    ❤️
                  </div>
                </div>
                <span className="text-xs">You and 86 others</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <span>12 comments</span>
              <span>3 shares</span>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="px-4 py-2">
          <div className="flex items-center justify-around">
            {/* Like Button */}
            <button className="flex items-center justify-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors flex-1">
              <span className="text-lg">👍</span>
              <span className="text-sm font-medium text-gray-700">Like</span>
            </button>

            {/* Comment Button */}
            <button className="flex items-center justify-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors flex-1">
              <span className="text-lg">💬</span>
              <span className="text-sm font-medium text-gray-700">Comment</span>
            </button>

            {/* Share Button */}
            <button className="flex items-center justify-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors flex-1">
              <span className="text-lg">↪️</span>
              <span className="text-sm font-medium text-gray-700">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 