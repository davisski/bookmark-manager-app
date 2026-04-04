export const PageHeaderComponent = ({title, children}: {title: string, children: React.ReactNode}) => {
  return (
    <div className="flex sticky w-[calc(100vw-(var(--sidebar-width)+64px))] z-10 top-22 justify-between items-center">
      <h1 className="text-xl font-semibold dark:text-white">{title}</h1>
      {children}
    </div>
  )
}
