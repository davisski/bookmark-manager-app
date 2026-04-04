import React, { createContext, useContext, useState, useMemo } from 'react';
import bookmarksData from '../data.json';

export type Bookmark = typeof bookmarksData.bookmarks[number];

interface BookmarkContextType {
  bookmarks: Bookmark[];
  setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
  sortBookmarks: (sortBy: 'createdAt' | 'lastVisited' | 'visitCount', direction?: 'asc' | 'desc') => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(bookmarksData.bookmarks);

  const sortBookmarks = (
    sortBy: 'createdAt' | 'lastVisited' | 'visitCount',
    direction: 'asc' | 'desc' = 'asc'
  ) => {
    setBookmarks(prev =>
      [...prev].sort((a, b) => {
        let aValue = a[sortBy];
        let bValue = b[sortBy];
        if (sortBy === 'createdAt' || sortBy === 'lastVisited') {
          aValue = aValue ? new Date(aValue as string).getTime() : 0;
          bValue = bValue ? new Date(bValue as string).getTime() : 0;
        }
        if (sortBy === 'visitCount') {
          aValue = typeof aValue === 'number' ? aValue : 0;
          bValue = typeof bValue === 'number' ? bValue : 0;
        }
        aValue = aValue ?? 0;
        bValue = bValue ?? 0;
        if (aValue === bValue) return 0;
        if (direction === 'asc') return aValue > bValue ? 1 : -1;
        return aValue < bValue ? 1 : -1;
      })
    );
  };

  const value = useMemo(() => ({ bookmarks, setBookmarks, sortBookmarks }), [bookmarks]);

  return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>;
};

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) throw new Error('useBookmarks must be used within a BookmarkProvider');
  return context;
}
