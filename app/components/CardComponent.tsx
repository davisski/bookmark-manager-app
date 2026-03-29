import darkEye from '../assets/images/icon-eye-dark.svg';
import darkClock from '../assets/images/icon-clock-dark.svg';
import darkCalendar from '../assets/images/icon-calendar-dark.svg';
import darkPin from '../assets/images/icon-pin-dark.svg';
import frontendMentorFavicon from '../assets/images/favicon-frontend-mentor.png';
import darkDots from '../assets/images/icon-dots-dark.svg';
export const CardComponent = () => {
  return (
    <div className="max-w-86.5 w-full min-w-84 min-h-68 rounded-lg dark:bg-neutral-800">

        <div className="p-4">
            <div className="flex justify-between border-b border-neutral-500 pb-4">
                <div className="flex gap-3 items-start">
                    <img className='w-11 h-11 rounded-lg' src={frontendMentorFavicon} alt="Frontend Mentor" />
                    <div className="flex flex-col">
                        <h1 className='dark:text-white text-[20px]'>Frontendmentor</h1>
                        <a href="http://www.frontendmentor.io" className='dark:text-neutral-100 text-[12px]'>frontendmentor.io</a>
                    </div>
                </div>
                <button className='dark:bg-neutral-800 border flex items-center justify-center border-neutral-500 rounded-lg w-8 h-8'>
                    <img className='w-5 h-5' src={darkDots} alt="Options" />
                </button>
            </div>
            <div className="pt-4 flex gap-4 flex-col">
                <p className='text-[14px] dark:text-neutral-100 leading-[150%]'>Improve your front-end coding skills by building real projects. Solve real-world HTML, CSS and JavaScript challenges whilst working to professional designs.</p>

                <div className='flex gap-2'>
                    <div className="dark:bg-neutral-600 px-2 py-1 rounded-sm">
                        Practice
                    </div>
                    <div className="dark:bg-neutral-600 px-2 py-1 rounded-sm">
                        Learning
                    </div>
                    <div className="dark:bg-neutral-600 px-2 py-1 rounded-sm">
                        Community
                    </div>
                </div>
            </div>
        </div>

        <div className="border-t px-4 py-3 dark:border-neutral-500 w-full flex justify-between items-center">
            <div className="flex gap-4">
                <div className="flex items-center gap-1.5">
                    <img className='w-3 h-3' src={darkEye} alt="View" />
                    <span className="dark:text-neutral-100 text-[12px]">47</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <img className='w-3 h-3' src={darkClock} alt="Time" />
                    <span className="dark:text-neutral-100 text-[12px]">23 Sep</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <img className='w-3 h-3' src={darkCalendar} alt="Date" />
                    <span className="dark:text-neutral-100 text-[12px]">15 Jan</span>
                </div>
            </div>
            <div>
                <button className="bg-transparent">
                    <img className='w-4 h-4' src={darkPin} alt="Bookmark" />
                </button>
            </div>
        </div>
    </div>
  )
}
