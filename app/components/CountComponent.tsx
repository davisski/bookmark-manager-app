export const CountComponent = ({count}: {count: number}) => {
  return (
    <div className='min-w-5.75 px-2 py-0.5 h-5.75 rounded-full border dark:border-neutral-500 dark:bg-neutral-600 border-neutral-300 bg-neutral-100 flex items-center justify-center'>
        <span className='dark:text-neutral-100 text-neutral-800 text-[12px]'>{count}</span>
    </div>
  )
}
