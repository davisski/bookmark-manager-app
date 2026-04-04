import darkHamburger from "../assets/images/icon-dark-hamburger.svg";
import darkSearch from "../assets/images/icon-dark-search.svg";
import darkAdd from "../assets/images/icon-add-dark.svg";
import { UserWidgetComponent } from "./UserWidgetComponent";
export const NavigationComponent = () => {
  return (
    <nav className="px-8 border-b z-10 fixed dark:border-neutral-500 dark:bg-neutral-800 h-19.5 flex items-center w-[calc(100vw-var(--sidebar-width))]">
        <div className="flex items-center justify-between w-[calc(100vw-var(--sidebar-width))]">
            <div className="flex items-center gap-4">
                <button className="w-11 h-11 flex md:hidden items-center justify-center border dark:border-neutral-400 rounded-sm dark:bg-neutral-800">
                    <img src={darkHamburger} alt="Menu" />
                </button>

                <div className="relative">
                    <img src={darkSearch} alt="Search" className="absolute left-3 top-[50%] translate-y-[-50%]" />
                    <input type="text" className="max-w-65 h-11.25 dark:bg-neutral-600 border dark:border-neutral-400 rounded-lg py-[12.5px] pr-3 pl-10" placeholder="Search by title..."  />
                </div>
            </div>

            <div className="flex items-center gap-4 relative">
                <button className="w-42.2 h-11.25 px-4 py-3.25 flex items-center justify-center border-2 cursor-pointer dark:border-neutral-300 rounded-lg dark:bg-teal-700 gap-1">
                    <img src={darkAdd} alt="Add" />
                    <span className="hidden sm:block dark:text-white">Add Bookmark</span>
                </button>

                <UserWidgetComponent />
            </div>
        </div>
    </nav>
  )
}
