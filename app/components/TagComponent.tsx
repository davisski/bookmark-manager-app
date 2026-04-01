export const TagComponent = ({tag}: {tag: string}) => {
  return (
    <div className="dark:bg-neutral-600 px-2 py-1 max-h-5.25 rounded-sm text-[12px] flex items-center">
        {tag}
    </div>
  )
}
