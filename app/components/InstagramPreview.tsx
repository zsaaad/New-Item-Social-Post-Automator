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
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="bg-white border border-gray-200 rounded-lg max-w-sm mx-auto overflow-hidden">
        {/* Header Section */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center">
            <img
              src={profilePicUrl}
              alt={`${profileName}'s profile`}
              className="w-8 h-8 rounded-full object-cover mr-3"
            />
            <span className="font-semibold text-sm text-gray-900">{profileName}</span>
          </div>
          {/* Three Dots Icon */}
          <button className="text-gray-700 hover:text-gray-900">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>

        {/* Image Section - Square Aspect Ratio */}
        <div className="relative aspect-square bg-gray-100">
          <img
            src={imageUrl}
            alt="Post content"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center space-x-4">
            {/* Heart Icon (Like) */}
            <button className="text-gray-700 hover:text-red-500 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Chat Bubble Icon (Comment) */}
            <button className="text-gray-700 hover:text-gray-900 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>

            {/* Paper Airplane Icon (Share) */}
            <button className="text-gray-700 hover:text-gray-900 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>

          {/* Bookmark Icon */}
          <button className="text-gray-700 hover:text-gray-900 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        {/* Likes Count */}
        <div className="px-3 pb-2">
          <p className="text-sm text-gray-900">
            Liked by <span className="font-semibold">demouser</span> and{' '}
            <span className="font-semibold">1,234 others</span>
          </p>
        </div>

        {/* Caption & Hashtags */}
        <div className="px-3 pb-2">
          <p className="text-sm text-gray-900">
            <span className="font-semibold mr-2">{profileName}</span>
            <span>{caption}</span>
          </p>
        </div>

        {/* Timestamp */}
        <div className="px-3 pb-3">
          <p className="text-xs text-gray-500 uppercase tracking-wide">2 HOURS AGO</p>
        </div>
      </div>
    </div>
  );
} 