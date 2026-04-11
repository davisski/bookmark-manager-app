import {useState, useEffect, useRef} from "react";
import avatar from '../assets/images/image-avatar.webp';
import darkVisit from '../assets/images/dark-visit.svg';
import darkTheme from '../assets/images/dark-theme.svg';
import darkSun from '../assets/images/dark-sun.svg';
import lightSun from '../assets/images/light-sun.svg';
import lightMoon from '../assets/images/light-moon.svg';
import darkMoon from '../assets/images/dark-moon.svg';
import { useTheme } from "../context/ThemeContext";

export const UserWidgetComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const userWidgetDropdown = useRef<HTMLDivElement>(null);
    const { theme, toggleTheme } = useTheme();

    const handleDropdownClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        const target = e.target as HTMLElement;

        if(isOpen && target.offsetParent?.id !== userWidgetDropdown.current?.id) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleDropdownClick as any);
        
        return () => {
            document.removeEventListener('click', handleDropdownClick as any);
        }
    }, [isOpen]);
    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)} className='outline-2 dark:focus:outline-neutral-100 focus:outline-neutral-500 cursor-pointer rounded-full focus:outline-offset-2'>
                <img src={avatar} alt="User Avatar" className="w-10 h-10 block rounded-full" />
            </button>

            <div ref={userWidgetDropdown} id='user-widget-dropdown' className={`absolute flex flex-col justify-between top-11 right-0 min-w-62 min-h-42.75 z-100! mt-2 w-48 bg-white border border-gray-200 dark:bg-neutral-600 dark:border-neutral-500 rounded-md shadow-lg ${isOpen ? 'block' : 'hidden'}`}>
                <div className="px-4 py-3">
                    <button className="flex items-center gap-3">
                        <img className="w-10 h-10" src={avatar} alt="Visit" />
                        <div className="flex flex-col items-start justify-center">
                            <h3 className="m-0 dark:text-white text-[14px]">Auth user</h3>
                            <p className="m-0 dark:text-neutral-100 text-[14px]">your@example.com</p>
                        </div>
                    </button>
                </div>
                <div className="px-4 border-t border-b dark:border-neutral-500 py-3 flex justify-between">
                    <button className="flex items-center gap-2.5">
                        <img src={darkTheme} alt="Dark Theme" className="w-4 h-4" />
                        <span className="text-[14px]">Theme</span>
                    </button>

                    <div className="flex items-center bg-neutral-100 dark:bg-teal-700 p-0.5 rounded-sm">
                        <button onClick={() => toggleTheme('dark')} className={`cursor-pointer flex items-center justify-center gap-2.5 w-7.5 h-6.5 dark:focus:bg-neutral-800 rounded-sm ${theme === 'dark' ? 'bg-neutral-800' : ''}`}>
                            <img src={theme === 'dark' ? darkMoon : lightMoon} alt="Dark Theme" className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => toggleTheme('light')} className={`cursor-pointer flex items-center justify-center gap-2.5 w-7.5 h-6.5 dark:focus:bg-neutral-800 rounded-sm ${theme === 'light' ? 'bg-white' : ''}`}>
                            <img src={theme === 'light' ? lightSun : darkSun} alt="Light Theme" className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
                <button className="px-4 w-full py-3 items-center flex gap-2.5">
                    <img src={darkVisit} alt="Logout" className="w-4 h-4" />
                    <span className="text-[14px]">Logout</span>
                </button>
            </div>
        </>
    )
}
