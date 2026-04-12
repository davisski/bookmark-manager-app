import { LabelComponent } from "./LabelComponent";
import { useModal } from "~/context/ModalContext";
import type { Bookmark, ModalErrorProps } from "~/interfaces";

export const TextAreaComponent = ({expectedBookmark, property, htmlFor, title}: {expectedBookmark: Bookmark, property: keyof ModalErrorProps, title: string, htmlFor: string}) => {
    const { bookmark, setBookmark, errors } = useModal();
    return (
        <div className="block">
            <LabelComponent htmlFor={htmlFor} title={title} />
            <textarea onChange={(e) => setBookmark({ ...(bookmark || expectedBookmark), [property]: e.target.value })} className="border bg-white border-neutral-500 dark:border-neutral-300 dark:bg-neutral-600 p-2 w-full rounded-lg max-h-22.75 min-h-22.75" id={htmlFor}></textarea>
            {errors[property] && <p className="text-red-800 text-[14px]">{errors[property]}</p>}
        </div>
    )
}
