import { LabelComponent } from "./LabelComponent";
import { useModal } from "~/context/ModalContext";
import type { Bookmark, ModalErrorProps } from "~/interfaces";

export const InputAreaComponent = ({expectedBookmark, property, htmlFor, title, handler} : {expectedBookmark: Bookmark, property: keyof ModalErrorProps, title: string, htmlFor: string, handler?: (value: React.ChangeEvent<HTMLInputElement>) => void}) => {
    const { bookmark, setBookmark, errors } = useModal();
    return (
        <div className="block">
            <LabelComponent htmlFor={htmlFor} title={title} />
            <input onChange={(e) => handler ? handler(e) : setBookmark({ ...(bookmark || expectedBookmark), [property]: e.target.value })} 
            className="border bg-white border-neutral-500 dark:border-neutral-300 dark:bg-neutral-600 p-2 min-h-11.25 max-h-11.25 w-full rounded-lg" type="text" id={htmlFor} />
            {errors[property] && <p className="text-red-800 text-[14px]">{errors[property]}</p>}
        </div>
    )
}
