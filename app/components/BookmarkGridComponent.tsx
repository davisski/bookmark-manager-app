import { CardComponent } from './CardComponent';
import { useBookmarks } from '../context/BookmarkContext';

export const BookmarkGridComponent = () => {
    const { bookmarks: contextBookmarks } = useBookmarks();

    return (
        <div className='flex flex-wrap gap-8 justify-start'>
            {contextBookmarks.map((bookmark) => (
                <CardComponent key={bookmark.id} bookmark={bookmark} />
            ))}
        </div>
    );
}
