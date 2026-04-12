export const LabelComponent = ({ htmlFor, title }: { htmlFor: string; title: string }) => {
  return (
    <label className="font-medium mb-1 flex items-center gap-0.5" htmlFor={htmlFor}>
        <span className="dark:text-white text-neutral-900 text-[14px]">{title}</span>
        <span className="dark:text-neutral-100 text-neutral-800 text-[14px]"> *</span>
    </label>
  )
}
