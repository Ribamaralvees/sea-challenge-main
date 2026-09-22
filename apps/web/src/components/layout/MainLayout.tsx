import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

interface MainLayoutProps {
  children: ReactNode

  decoration?: ReactNode
}

export function MainLayout({ children, decoration }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="relative flex-1 overflow-x-hidden">
        {decoration}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-shell flex-col gap-5 px-4 py-5 sm:px-6">
          {children}
        </div>
      </main>
    </div>
  )
}
