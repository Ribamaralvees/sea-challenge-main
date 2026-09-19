import { MainLayout } from '@/components/layout/MainLayout'
import { CrossDecoration } from '@/components/layout/Decorations'
import { ComingSoon } from '@/components/comingSoon/ComingSoon'

export function ComingSoonMenuPage() {
  return (
    <MainLayout decoration={<CrossDecoration />}>
      <ComingSoon />
    </MainLayout>
  )
}
