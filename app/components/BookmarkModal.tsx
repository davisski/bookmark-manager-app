import { useModal } from "~/context/ModalContext";
import { useBookmarks } from "~/context/BookmarkContext";
import { InputAreaComponent } from "./form/InputAreaComponent";
import { TextAreaComponent } from "./form/TextAreaComponent";
import { CloseComponent } from "./CloseComponent";

export const BookmarkModal = () => {
    const { isOpen, closeModal, title, bookmark, setBookmark, submitBookmark } = useModal();
    const { addBookmark, generateId } = useBookmarks();
    let id: string | null = null;
    if(bookmark && bookmark.id == null) id = generateId();

    const defaultBookmark = {
        title: null,
        description: null,
        url: null,
        tags: [],
        id: id,
        pinned: false,
        isArchived: false,
        favicon: null,
        createdAt: new Date().toISOString(),
        lastVisited: null,
        visitCount: 0
    }

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = submitBookmark();
        if (!isValid || !bookmark) return;

        const newBookmark = {
            ...bookmark,
            id: id,
            createdAt: new Date().toISOString(),
            pinned: false,
            isArchived: false,
            lastVisited: null,
            visitCount: 0,
        };

        addBookmark(newBookmark);

        closeModal();
    };

    return (
      <div id='bookmark-modal' className="fixed top-0 left-0 w-full h-full bg-[#131313]/70 flex items-center justify-center z-1000">
        <div className="dark:bg-neutral-800 bg-white p-8 rounded-2xl shadow-md max-w-142.5 w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold mb-2 dark:text-white text-[24px] text-neutral-900">{title}</h2>
            <CloseComponent action={closeModal} />
          </div>
          <p className="dark:text-neutral-100 m-0 text-[14px] text-neutral-800">Save a link with details to keep your collection organized. We extract the favicon automatically from the URL.</p>
          <form onSubmit={handleSubmit} id='bookmark-form' className="mt-8 flex flex-col gap-5">
            <InputAreaComponent expectedBookmark={defaultBookmark} property="title" title="Title" htmlFor="title" />
            <TextAreaComponent expectedBookmark={defaultBookmark} property="description" title="Description" htmlFor="description" />
            <InputAreaComponent expectedBookmark={defaultBookmark} property="url" title="Website URL" htmlFor="url" />
            <InputAreaComponent expectedBookmark={defaultBookmark} property="tags" title="Tags" htmlFor="tags" handler={(e) => {
                setBookmark({ ...(bookmark || defaultBookmark), tags: e.target.value.split(/\,\s+/).map((tag: string) => tag.trim()) });
            }} />
            <div className="flex justify-end gap-2.5">
              <button className="bg-white text-neutral-900 dark:bg-neutral-800 dark:text-white dark:border-neutral-400 border max-h-11.5 min-h-11.5 text-[16px] border-neutral-400 px-4 py-2 cursor-pointer rounded-lg" type="button" onClick={closeModal}>Cancel</button>
              <button className="bg-teal-700 text-white px-4 py-2 cursor-pointer rounded-lg max-h-11.5 min-h-11.5" type="submit" form="bookmark-form">Add Bookmark</button>
            </div>
          </form>
        </div>
      </div>
    )
}
