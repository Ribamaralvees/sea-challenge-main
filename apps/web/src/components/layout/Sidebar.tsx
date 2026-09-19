import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/utils/cn'
import {
  BellDocIcon,
  BuildingIcon,
  EditSquareIcon,
  HistoryIcon,
  SitemapIcon,
  UserIcon,
} from '@/components/icons'

interface NavItem {
  id: string
  label: string
  to: string
  Icon: (props: { className?: string }) => JSX.Element
  
  isActive: (pathname: string) => boolean
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'empresa',
    label: 'Empresa',
    to: '/menu/empresa',
    Icon: BuildingIcon,
    isActive: (path) => path.startsWith('/menu/empresa'),
  },
  {
    id: 'formularios',
    label: 'Formulários',
    to: '/step/1',
    Icon: EditSquareIcon,
    isActive: (path) => path.startsWith('/step'),
  },
  {
    id: 'equipes',
    label: 'Equipes',
    to: '/menu/equipes',
    Icon: SitemapIcon,
    isActive: (path) => path.startsWith('/menu/equipes'),
  },
  {
    id: 'notificacoes',
    label: 'Notificações',
    to: '/menu/notificacoes',
    Icon: BellDocIcon,
    isActive: (path) => path.startsWith('/menu/notificacoes'),
  },
  {
    id: 'historico',
    label: 'Histórico',
    to: '/menu/historico',
    Icon: HistoryIcon,
    isActive: (path) => path.startsWith('/menu/historico'),
  },
  {
    id: 'perfil',
    label: 'Perfil',
    to: '/menu/perfil',
    Icon: UserIcon,
    isActive: (path) => path.startsWith('/menu/perfil'),
  },
]

export function Sidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav
      aria-label="Menu principal"
      className="sticky top-0 flex h-screen w-14 shrink-0 flex-col items-center justify-center rounded-tr-2xl rounded-br-2xl bg-sidebar"
    >
      <span aria-hidden="true" className="absolute left-0 top-[52px] h-10 w-full bg-surface" />

      <div className="flex flex-col items-center gap-4">
        {NAV_ITEMS.map(({ id, label, to, Icon, isActive }) => {
          const active = isActive(pathname)
          return (
            <button
              key={id}
              type="button"
              aria-label={label}
              aria-current={active ? 'page' : undefined}
              onClick={() => navigate(to)}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
                active
                  ? 'bg-surface text-sidebar'
                  : 'text-content-inverse/85 hover:bg-surface/20',
              )}
            >
              <Icon className="h-[22px] w-[22px]" />
            </button>
          )
        })}
      </div>
    </nav>
  )
}
