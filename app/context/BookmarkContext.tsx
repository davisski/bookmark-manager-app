import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import bookmarksData from '../data.json';

export type Bookmark = typeof bookmarksData.bookmarks[number];

interface BookmarkContextType {
    bookmarks: Bookmark[];
    query: string;
    setBookmarks: React.Dispatch<React.SetStateAction<Bookmark[]>>;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    sortBookmarks: (sortBy: 'createdAt' | 'lastVisited' | 'visitCount', direction?: 'asc' | 'desc') => void;
    pinBookmark: (id: string) => void;
    unpinBookmark: (id: string) => void;
    defaultSort: (bookmarks: Bookmark[]) => void;
    filterBookmarks: (query: string) => Bookmark[];
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
    const [query, setQuery] = useState<string>("");

    const defaultSort = (bookmarks: Bookmark[]) => {
        setBookmarks(prev => {
            const bMarks = [...prev].sort((a, b) => {
                let aValue = a.pinned;
                let bValue = b.pinned;

                if (aValue === bValue) return 0;
                return aValue < bValue ? 1 : -1;
            });
            return bMarks;
        });
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedBarks = window.localStorage.getItem("bookmarks");
            if (savedBarks?.length) {
                setBookmarks(JSON.parse(savedBarks));
            };
            if(!savedBarks?.length) {
                setBookmarks(bookmarksData.bookmarks);
                window.localStorage.setItem("bookmarks", JSON.stringify(bookmarksData.bookmarks));
            }
        }

        if(query.length) {
            setBookmarks(prev => filterBookmarks(query));
        }

        defaultSort(bookmarks);
    }, [query]);

    const sortBookmarks = (
        sortBy: 'createdAt' | 'lastVisited' | 'visitCount',
        direction: 'asc' | 'desc' = 'asc'
    ) => {
        setBookmarks(prev =>
            [...prev].sort((a, b) => {
                let aValue = a[sortBy];
                let bValue = b[sortBy];

                if (a.pinned && !b.pinned) return -1;
                if (!a.pinned && b.pinned) return 1;

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
    }

    const pinBookmark = (id: string) => {
        setBookmarks(prev => {
            const bookmark = prev.find(b => b.id === id);
            if (bookmark) {
                bookmark.pinned = true;
            }
            return [...prev];
        });

        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        defaultSort(bookmarks);
    };

    const unpinBookmark = (id: string) => {
        setBookmarks(prev => {
            const bookmark = prev.find(b => b.id === id);
            if (bookmark) {
                bookmark.pinned = false;
            }
            return [...prev];
        });

        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        defaultSort(bookmarks);
    };
    const filterBookmarks = (query: string) => {
        const lowerQuery = query.toLowerCase();
        return bookmarks.filter(b => b.title.toLowerCase().includes(lowerQuery) || b.url.toLowerCase().includes(lowerQuery) ||
            (b.tags && b.tags.some(tag => tag.toLowerCase().includes(lowerQuery))));
    }

    const value = useMemo(() => ({ bookmarks, setBookmarks, sortBookmarks, pinBookmark, unpinBookmark, defaultSort, filterBookmarks, query, setQuery }), [bookmarks]);

    return <BookmarkContext.Provider value={value}>{children}</BookmarkContext.Provider>;
    
};

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (!context) throw new Error('useBookmarks must be used within a BookmarkProvider');
  return context;
}
