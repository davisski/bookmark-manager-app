import staticData from '../data.json';
import { useEffect, useState } from 'react';
import { CardComponent } from './CardComponent';

export const BookmarkGridComponent = () => {
    const [bookmarks, setBookmarks] = useState<any[]>([]);

    useEffect(() => {
        setBookmarks(staticData['bookmarks']);
    }, []);

    return (
        <div className='flex flex-wrap gap-8 justify-start'>
            {bookmarks.map((bookmark) => (
                <CardComponent key={bookmark.id} bookmark={bookmark} />
            ))}
        </div>
    );
}
