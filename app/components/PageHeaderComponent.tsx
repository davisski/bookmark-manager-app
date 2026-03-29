export const PageHeaderComponent = ({title, children}: {title: string, children: React.ReactNode}) => {
  return (
    <div className="flex justify-between">
      <h1 className="text-xl font-semibold dark:text-white">{title}</h1>
      {children}
    </div>
  )
}
