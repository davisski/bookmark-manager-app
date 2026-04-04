
import { useState } from 'react';
import darkDots from '../assets/images/icon-dots-dark.svg';
import darkVisit from '../assets/images/dark-visit.svg';
import darkCopy from '../assets/images/dark-copy.svg';
import iconPinDark from '../assets/images/icon-pin-dark.svg';
import darkEdit from '../assets/images/dark-edit.svg';
import iconArchiveDark from '../assets/images/icon-archive-dark.svg';
import darkUnpin from '../assets/images/dark-unpin.svg';
import dotmMenu from '../assets/images/icon-menu-bookmark.svg';
import { useTheme } from '~/context/ThemeContext';

import { useBookmarks } from '~/context/BookmarkContext';
export const CardDotComponent = ({ bookmark }: { bookmark: any }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { pinBookmark, unpinBookmark } = useBookmarks();
    const { theme } = useTheme();

    let options = [
        { label: "Visit", icon: darkVisit, method: "visit" },
        { label: "Copy URL", icon: darkCopy, method: "copy" },
        { label: "Pin", icon: iconPinDark, method: "pin" },
        { label: "Edit", icon: darkEdit, method: "edit" },
        { label: "Archive", icon: iconArchiveDark, method: "archive" },
    ];

    if (bookmark.pinned) {
        options[2] = { label: "Unpin", icon: darkUnpin, method: "pin" };
    }
    

    const visit = () => {
        window.open(bookmark.url, '_blank');
        setIsOpen(false);
    }

    const copy = () => {
        navigator.clipboard.writeText(bookmark.url).then(() => {
            alert('URL copied to clipboard!');
            setIsOpen(false);
        }).catch((err) => {
            console.error('Could not copy text: ', err);
        });
    }

    const pin = () => {
        if (bookmark.pinned) {
            unpinBookmark(bookmark.id);
        } else {
            pinBookmark(bookmark.id);
        }
        setIsOpen(false);
    }

    const edit = () => {
        console.log("Edit method called");
    }

    const archive = () => {
        console.log("Archive method called");
    }

    const handleOptionSelect = (method: string) => {
        switch (method) {
            case "visit":
                visit();
                break;
            case "copy":
                copy();
                break;
            case "pin":
            case "unpin":
                pin();
                break;
            case "edit":
                edit();
                break;
            case "archive":
                archive();
                break;
            default:
                break;
        }
    }

    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)} className='cursor-pointer dark:focus:outline-neutral-100 focus:outline-2 focus:outline-offset-3 dark:bg-neutral-800 border flex items-center justify-center dark:border-neutral-500 border-neutral-400 rounded-lg w-8 h-8'>
                <img className='w-5 h-5' src={theme == 'dark' ? darkDots : dotmMenu} alt="Options" />
            </button>
            <div className={`absolute top-13 right-4 overflow-hidden bg-white dark:bg-neutral-600 border border-gray-300 dark:border-neutral-500 rounded-lg shadow-lg min-w-50 min-h-33 p-2 z-10 ${isOpen ? "block" : "hidden"}`}>
                <ul className="flex flex-col justify-between min-h-33">
                    {options.map((option) => (
                        <li onClick={() => handleOptionSelect(option.method)} key={option.method} className="px-4 py-2 hover:bg-gray-100 dark:text-neutral-100 cursor-pointer dark:hover:bg-neutral-800
                            flex items-center gap-2.5">
                            <img className='w-4 h-4' src={option.icon} alt={option.label} />
                            <span>{option.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
