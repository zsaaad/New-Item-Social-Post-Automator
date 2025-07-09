import React from 'react';

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
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center p-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
          <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </div>
        <div className="flex-1">
          <div className="font-semibold text-gray-800 text-sm">{profileName}</div>
          <div className="text-xs text-gray-500 flex items-center">
            2h • 
            <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>
        <div className="text-gray-500">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </div>
      </div>

      {/* Caption */}
      <div className="px-3 pb-3">
        <div className="text-sm text-gray-800">
          {caption}
        </div>
      </div>

      {/* Image */}
      <div className="bg-gray-100 flex items-center justify-center" style={{ aspectRatio: '16/9' }}>
        <img
          src={imageUrl}
          alt="Post content"
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.nextElementSibling?.classList.remove('hidden');
          }}
        />
        <div className="hidden text-gray-500 text-center">
          <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
          </svg>
          <p className="text-sm">Image Preview</p>
        </div>
      </div>

      {/* Engagement */}
      <div className="p-3">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center">
            <div className="flex -space-x-1 mr-2">
              <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2 20h20v-4H2v4zm1.15-4.05L4 14.83l.85 1.12L5.7 15H5.3l.85-1.05zM4 12l1.687-3.375h2.626L9 12H4z"/>
                </svg>
              </div>
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </div>
            <span>124</span>
          </div>
          <div className="flex space-x-4">
            <span>18 comments</span>
            <span>3 shares</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-gray-200 pt-2">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors flex-1 justify-center py-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span className="text-sm font-medium">Like</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors flex-1 justify-center py-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm font-medium">Comment</span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors flex-1 justify-center py-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span className="text-sm font-medium">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
} 