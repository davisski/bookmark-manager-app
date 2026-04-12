interface Bookmark {
    id: string | null;
    title: string | null;
    description: string | null;
    url: string | null;
    tags: string[] | null;
    pinned: boolean;
    isArchived: boolean;
    favicon: string | null;
    createdAt: string | null;
    lastVisited: string | null;
    visitCount: number | 0;
}

interface ModalErrorProps {
    title: string | null;
    description: string | null;
    url: string | null;
    tags: string | null;
}

interface ModalContextType {
    isOpen: boolean;
    mode: 'add' | 'edit';
    title: string;
    bookmark: Bookmark | null;
    errors: ModalErrorProps;
    openModal: () => void;
    closeModal: () => void;
    setBookmark: (bookmark: Bookmark | null) => void;
    setMode: (mode: 'add' | 'edit') => void;
    setTitle: (title: string) => void;
    setErrors: (errors: ModalErrorProps) => void;
    submitBookmark: () => boolean;
    resetBookmark: () => void;
}

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
    addBookmark: (bookmark: Bookmark) => void;
    generateId: () => string;
}

export type { Bookmark, ModalErrorProps, ModalContextType, BookmarkContextType };