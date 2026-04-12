import { createContext, useContext, useEffect, useState } from "react";
import type { Bookmark, ModalErrorProps, ModalContextType } from "~/interfaces";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const errorProps: ModalErrorProps = {
        title: null,
        description: null,
        url: null,
        tags: null
    };
    const [isOpen, setIsOpen] = useState(false);
    const [bookmark, setBookmark] = useState<Bookmark | null>(null);
    const [mode, setMode] = useState<'add' | 'edit'>('add');
    const [title, setTitle] = useState<string>('Add Bookmark');
    const [errors, setErrors] = useState<ModalErrorProps>(errorProps);

    const openModal = () => {
        setIsOpen(true);

        if (mode === 'edit') {
            const bookmark = JSON.parse(window.localStorage.getItem("bookmarks") || "[]").find((b: Object | any) => b?.id === bookmark?.id);
            setBookmark(bookmark);
        }

        if (mode === 'add') {
            setBookmark({
                title: null,
                description: null,
                url: null,
                tags: null,
                pinned: false,
                id: null,
                isArchived: false,
                favicon: null,
                createdAt: null,
                lastVisited: null,
                visitCount: 0
            });

            setErrors({
                title: null,
                description: null,
                url: null,
                tags: null
            });
        }
    };
    const closeModal = () => {
        setMode('add');
        setTitle('Add Bookmark');
        setIsOpen(false);
    };


    const validateBookmark = (bookmark: Bookmark): ModalErrorProps => {
        const errors: ModalErrorProps = {
            title: null,
            description: null,
            url: null,
            tags: null
        };

        if (!bookmark.title || !bookmark.title.trim()) {
            errors.title = "Title is required.";
        }

        if (!bookmark.description || !bookmark.description.trim()) {
            errors.description = "Description is required.";
        }

        if (!bookmark.url || !bookmark.url.trim()) {
            errors.url = "URL is required.";
        } else if (!/^https?:\/\/\S+$/.test(bookmark.url)) {
            errors.url = "Invalid URL format.";
        }

        if(!bookmark.tags?.length || bookmark.tags?.some(tag => !tag.trim())) {
            errors.tags = "Tags cannot be empty.";
        }

        return errors;
    }

    const submitBookmark = (): boolean => {
        if (!bookmark) return false;

        const errors = validateBookmark(bookmark);
        const hasErrors = Object.values(errors).some(error => error !== null);

        if (hasErrors) {
            setErrors(errors);
            return false;
        }

        return true;
    };
    const resetBookmark = () => {
        setBookmark({
            title: null,
            description: null,
            url: null,
            tags: null,
            pinned: false,
            id: null,
            isArchived: false,
            favicon: null,
            createdAt: null,
            lastVisited: null,
            visitCount: 0
        });
    };

    useEffect(() => {
        if (bookmark && bookmark.id) {
            setMode('edit');
            setTitle('Edit Bookmark');
        } else {
            setMode('add');
            setTitle('Add Bookmark');
        }
    }, [bookmark]);


    return (
        <ModalContext.Provider value={{ 
            isOpen, 
            bookmark,
            openModal,
            closeModal,
            setBookmark,
            mode,
            setMode,
            title,
            setTitle,
            errors,
            setErrors,
            submitBookmark,
            resetBookmark
        }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
