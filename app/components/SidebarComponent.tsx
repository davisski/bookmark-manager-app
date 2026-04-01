import logoDark from '../assets/images/logo-dark-theme.svg';
import darkHome from '../assets/images/icon-home-dark.svg';
import darkArhive from '../assets/images/icon-archive-dark.svg';
import { CountComponent } from './CountComponent';
export const SidebarComponent = () => {
  return (
    <aside className="min-w-(--sidebar-width) hidden md:flex fixed dark:bg-neutral-800 flex-col h-screen px-4 border-r dark:border-neutral-500 gap-4">
        <div className="block mt-5 px-5 mb-2.5">
            <img src={logoDark} alt="Logo" />
        </div>
        <ul>
            <li className=''>
                <a href="#" className='flex items-center gap-2 rounded-md px-4 py-2 bg-neutral-600 dark:hover:bg-neutral-600'>
                    <img src={darkHome} alt="Home" />
                    <span>Home</span>
                </a>
            </li>
            <li className=''>
                <a href="#" className='flex items-center gap-2 rounded-md px-4 py-2 dark:hover:bg-neutral-600'>
                    <img src={darkArhive} alt="Archive" />
                    <span>Archive</span>
                </a>
            </li>
        </ul>
        <div className='px-3'>
            <div className='mb-2.5 flex justify-between'>
                <h3 className='uppercase text-[12px] font-bold '>Tags</h3>
                <button className='bg-transparent border-b border-neutral-300 text-[12px]'>Reset</button>
            </div>
            <ul className='flex flex-col gap-2.5'>
                <li className='flex justify-between'>
                    <div className='flex items-center gap-2 w-full'>
                        <input type="checkbox" id="tag1" name="tag1" value="tag1" className='appearance-none w-4 h-4 border border-neutral-400 rounded
                            checked:bg-neutral-300 checked:border-neutral-300
                            relative cursor-pointer' />
                        <label htmlFor="tag1" className='text-sm dark:text-neutral-100'>AI</label>
                    </div>
                    <CountComponent count={26} />
                </li>
                <li className='flex justify-between'>
                    <div className='flex items-center gap-2 w-full'>
                        <input type="checkbox" id="tag2" name="tag2" value="tag2" className='appearance-none w-4 h-4 border border-neutral-400 rounded
                            checked:bg-neutral-300 checked:border-neutral-300
                            relative cursor-pointer' />
                        <label htmlFor="tag2" className='text-sm dark:text-neutral-100'>Community</label>
                    </div>
                    <CountComponent count={6} />
                </li>
            </ul>
        </div>
    </aside>
  )
}
