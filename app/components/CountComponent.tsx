export const CountComponent = ({count}: {count: number}) => {
  return (
    <div className='min-w-5.75 px-2 py-0.5 h-5.75 rounded-full border border-neutral-500 flex items-center justify-center'>
        <span className='dark:text-neutral-100 text-[12px]'>{count}</span>
    </div>
  )
}
