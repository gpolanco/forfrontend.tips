import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return <div className="max-w-4xl px-4 mx-auto sm:px-6 xl:px-0">{children}</div>
}
