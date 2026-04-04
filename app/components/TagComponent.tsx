export const TagComponent = ({tag}: {tag: string}) => {
  return (
    <div className="dark:bg-neutral-600 bg-neutral-100 text-neutral-800 dark:text-neutral-100 px-2 py-1 max-h-5.25 rounded-sm text-[12px] flex items-center">
        {tag}
    </div>
  )
}
