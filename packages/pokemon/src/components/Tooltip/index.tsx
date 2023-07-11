import type { ReactNode } from 'react'

interface IProps {
  message: string;
  children: ReactNode;
}

function Tooltip({ message, children }: IProps) {
  return (
    <div className="group relative">
      {children}
      <span className="absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
        {message}
      </span>
    </div>
  )
}
export default Tooltip