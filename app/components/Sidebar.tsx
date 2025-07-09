'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div 
      style={{ 
        backgroundColor: 'var(--card-dark)', 
        borderColor: 'var(--border-color)' 
      }} 
      className="w-64 border-r flex flex-col"
    >
      {/* App Title/Logo */}
      <div className="p-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
        <h1 
          style={{ color: 'var(--text-primary)' }} 
          className="text-2xl font-bold"
        >
          Creative Suite
        </h1>
        <p 
          style={{ color: 'var(--text-secondary)' }} 
          className="text-sm mt-1"
        >
          Social Media Tools
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <Link 
            href="/" 
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all hover:bg-black/20 group ${
              isActive('/') 
                ? 'bg-black/30 border-l-4' 
                : ''
            }`}
            style={isActive('/') ? { borderLeftColor: 'var(--accent-primary)' } : {}}
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ color: isActive('/') ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V8a2 2 0 11-4 0v2.5a1 1 0 01-1 1H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 011-1V4z" />
            </svg>
            <span 
              style={{ 
                color: isActive('/') ? 'var(--accent-primary)' : 'var(--text-primary)' 
              }} 
              className="font-medium group-hover:text-[var(--accent-primary)] transition-colors"
            >
              Creative Studio
            </span>
          </Link>

          <Link 
            href="/brand-kit" 
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all hover:bg-black/20 group ${
              isActive('/brand-kit') 
                ? 'bg-black/30 border-l-4' 
                : ''
            }`}
            style={isActive('/brand-kit') ? { borderLeftColor: 'var(--accent-primary)' } : {}}
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ color: isActive('/brand-kit') ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
            </svg>
            <span 
              style={{ 
                color: isActive('/brand-kit') ? 'var(--accent-primary)' : 'var(--text-primary)' 
              }} 
              className="font-medium group-hover:text-[var(--accent-primary)] transition-colors"
            >
              Brand Kit
            </span>
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
        <p 
          style={{ color: 'var(--text-secondary)' }} 
          className="text-xs text-center"
        >
          Creative Suite v1.0
        </p>
      </div>
    </div>
  );
} 