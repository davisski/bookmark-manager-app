import darkEye from '../assets/images/icon-eye-dark.svg';
import darkClock from '../assets/images/icon-clock-dark.svg';
import darkCalendar from '../assets/images/icon-calendar-dark.svg';
import darkPin from '../assets/images/icon-pin-dark.svg';
import { icons } from '~/utils/icons';
import {TagComponent} from './TagComponent';
import { useEffect, useState } from 'react';
import { CardDotComponent } from './CardDotComponent';

export const CardComponent = ({ bookmark }: { bookmark: any }) => {
    const [tags, setTags] = useState<string[]>([]);

    const image = bookmark.favicon ? icons[bookmark.favicon.match(/[^/]+$/)[0]] : bookmark.url ? `https://www.google.com/s2/favicons?domain=${new URL(bookmark.url).hostname}` : '';

    useEffect(() => {
        setTags(bookmark.tags);
    }, [tags]);

  return (
    <div className="max-w-86.5 w-full min-w-84 min-h-68 bg-white rounded-lg flex flex-col dark:bg-neutral-800 relative">
        <div className="p-4 grow">
            <div className="flex justify-between border-b dark:border-neutral-500 border-neutral-300 pb-4">
                <div className="flex gap-3 items-start">
                    <img className='w-11 h-11 rounded-lg border-neutral-100 border' src={image} alt={bookmark.title} />
                    <div className="flex flex-col">
                        <h1 className='dark:text-white text-[20px]'>{bookmark.title}</h1>
                        <a href={bookmark.url} className='dark:text-neutral-100 text-[12px]'>{bookmark.url.replace(/https?:\/\/(www\.)?/, '')}</a>
                    </div>
                </div>
                <CardDotComponent bookmark={bookmark} />
            </div>
            <div className="pt-4 flex gap-4 flex-col">
                <p className='text-[14px] dark:text-neutral-100 text-neutral-800 leading-[150%]'>
                    {bookmark.description}
                </p>

                <div className='flex gap-2'>
                    {tags.map((tag: string) => (
                        <TagComponent key={tag} tag={tag} />
                    ))}
                </div>
            </div>
        </div>

        <div className="border-t px-4 py-3 border-neutral-300 dark:border-neutral-500 w-full min-h-10.25 max-h-10.25 h-full flex justify-between items-center">
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
