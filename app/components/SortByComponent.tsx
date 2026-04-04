import { useState } from "react";
import darkCheck from "../assets/images/dark-check.svg";
import darkSort from "../assets/images/icon-sort-dark.svg";
import lightSort from "../assets/images/icon-sort.svg";
import { useBookmarks } from "../context/BookmarkContext";
import { useTheme } from "~/context/ThemeContext";
export const SortByComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { sortBookmarks } = useBookmarks();
    const { theme } = useTheme();

    const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);

    const sortOptions = [
        { label: "Recently added", value: "createdAt" },
        { label: "Recently visited", value: "lastVisited" },
        { label: "Most visited", value: "visitCount" },
    ] as const;

    const handleOptionSelect = (option: typeof sortOptions[number]['value']) => {
        setSelectedOption(option);
        sortBookmarks(option, "desc");
        setIsOpen(false);
    }

    const selectedOptionLabel = () => {
        return selectedOption ? sortOptions.find(opt => opt.value === selectedOption)?.label : "Sort by";
    }

    return (
        <>
            <button onClick={() => setIsOpen(!isOpen)} className="dark:focus:outline-neutral-100 focus:outline-2 focus:outline-offset-3 border cursor-pointer rounded-lg px-3 py-2.75 flex items-center justify-center min-w-26.75 h-10.5 dark:border-neutral-300 border-neutral-400 bg-white dark:bg-teal-700 gap-1">
                <img src={theme === 'dark' ? darkSort : lightSort} alt="Sort by" />
                <span className="dark:text-white text-neutral-800">
                    {selectedOptionLabel()}
                </span>
            </button>
            <div className={`absolute top-13 right-0 overflow-hidden bg-white dark:bg-neutral-600 border border-gray-300 dark:border-neutral-500 rounded-lg shadow-lg min-w-50 min-h-33 p-2 z-10 ${isOpen ? "block" : "hidden"}`}>
                <ul className="flex flex-col justify-between min-h-33">
                    {sortOptions.map((option) => (
                        <li onClick={() => handleOptionSelect(option.value)} key={option.value} className="px-4 py-2 hover:bg-gray-100 dark:text-neutral-100 cursor-pointer dark:hover:bg-neutral-800
                           flex items-center justify-between">
                            <span>{option.label}</span>
                            <div>{selectedOption === option.value && <img src={darkCheck} alt="Selected" className="inline-block ml-2" />}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}