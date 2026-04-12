import { useTheme } from "~/context/ThemeContext";
import iconClose from "~/assets/images/icon-close.svg";
import iconCloseDark from "~/assets/images/icon-close-dark.svg";

export const CloseComponent = ({ action } : { action: () => void }) => {
    const { theme } = useTheme();
    return (
        <button onClick={action} className="w-8 h-8 bg-white border dark:border-neutral-500 dark:bg-neutral-800 border-neutral-400 rounded-lg flex items-center justify-center">
            <img className="w-5 h-5 cursor-pointer" src={theme === "dark" ? iconCloseDark : iconClose} alt="Close" />
        </button>
    )
}
