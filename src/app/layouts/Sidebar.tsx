import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Check, ChevronDown, Languages, LogOut, ChevronLeft, ChevronRight, Menu } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import { navigationConfig, type NavigationItem } from '@/app/config/navigation.config'
import { usePermissions } from '@/core/permissions'
import { useAuth } from '@/core/auth'
import { useLocale } from '@/app/providers/LocaleProvider'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip'
import { LANGUAGES } from '@/shared/utils/locale'
import { ROLE_HIERARCHY, ROLE_LABELS, type Role, type Permission } from '@/core/permissions'

function isRouteActive(pathname: string, path?: string) {
  if (!path) return false
  if (pathname === path) return true
  return path !== '/' && pathname.startsWith(`${path}/`)
}

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { can } = usePermissions()
  const { user, logout } = useAuth()
  const { locale, setLocale, language, t } = useLocale()

  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('sidebar_collapsed') === 'true'
  })

  useEffect(() => {
    localStorage.setItem('sidebar_collapsed', String(isCollapsed))
  }, [isCollapsed])

  // Accordion state for expanded sidebar
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})

  const toggleExpandedGroup = (label: string) => {
    setExpandedGroups(prev => ({ ...prev, [label]: !prev[label] }))
  }

  const canSeeItem = (item: NavigationItem): boolean => {
    if (item.children?.length) {
      return item.children.some((child) => canSeeItem(child))
    }
    return !item.permission || can(item.permission as Permission)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const displayName = user
    ? `${user.firstName} ${user.lastName}`.trim()
    : 'Guest'
  const initials = user
    ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    : '?'
  const primaryRole = user?.roles?.length
    ? [...user.roles].sort(
        (a, b) =>
          (ROLE_HIERARCHY[b as Role] ?? 0) - (ROLE_HIERARCHY[a as Role] ?? 0)
      )[0]
    : undefined
  const roleLabel = primaryRole
    ? ROLE_LABELS[primaryRole as Role] || primaryRole
    : 'User'

  const renderNavItem = (item: NavigationItem, depth = 0) => {
    if (!canSeeItem(item)) return null

    const Icon = item.icon || Menu
    const hasChildren = item.children && item.children.length > 0
    // Check if any child is active
    const active = isRouteActive(location.pathname, item.path) || 
      (hasChildren && item.children!.some(child => isRouteActive(location.pathname, child.path)))
    
    const isExpanded = expandedGroups[item.label]

    const handleClick = () => {
      if (hasChildren) {
        if (!isCollapsed) toggleExpandedGroup(item.label)
      } else if (item.path) {
        navigate(item.path)
      }
    }

    const buttonContent = (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13px] font-medium transition-colors',
          active && !hasChildren
            ? 'border border-[#3b82f6]/70 bg-[#1a2744] text-white shadow-[inset_0_0_0_1px_rgba(59,130,246,0.25)]'
            : 'border border-transparent text-white/75 hover:bg-white/[0.06] hover:text-white',
          depth > 0 && 'pl-10 text-[12px]'
        )}
      >
        {!isCollapsed || depth > 0 ? (
          <>
            {depth === 0 && (
              <Icon
                className={cn('h-[18px] w-[18px] shrink-0', active ? 'text-white' : 'text-white/70')}
                strokeWidth={1.75}
              />
            )}
            <span className={cn('flex-1 truncate', isCollapsed && depth === 0 && 'hidden')}>
              {item.label}
            </span>
            {hasChildren && !isCollapsed && (
              <ChevronDown
                className={cn('h-4 w-4 shrink-0 transition-transform duration-200', isExpanded && 'rotate-180')}
              />
            )}
          </>
        ) : (
          // Collapsed state parent item
          <Icon
            className={cn('h-[20px] w-[20px] shrink-0 mx-auto', active ? 'text-white' : 'text-white/70')}
            strokeWidth={1.75}
          />
        )}
      </button>
    )

    if (isCollapsed && depth === 0) {
      if (hasChildren) {
        return (
          <DropdownMenu key={item.path || item.label}>
            <DropdownMenuTrigger asChild>
              {buttonContent}
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="start" className="w-48 bg-[#0a0e27] border border-white/10 text-white">
              <div className="px-2 py-1.5 text-xs font-semibold text-white/50 uppercase tracking-wider">{item.label}</div>
              {item.children!.filter(canSeeItem).map((child) => (
                <DropdownMenuItem
                  key={child.path}
                  onClick={() => child.path && navigate(child.path)}
                  className="text-[13px] hover:bg-white/10 hover:text-white cursor-pointer focus:bg-white/10 focus:text-white"
                >
                  {child.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
      return (
        <Tooltip key={item.path || item.label} delayDuration={0}>
          <TooltipTrigger asChild>
            {buttonContent}
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-[#13253a] border border-white/10 text-white font-medium text-xs ml-2">
            {item.label}
          </TooltipContent>
        </Tooltip>
      )
    }

    return (
      <div key={item.path || item.label}>
        {buttonContent}
        {hasChildren && !isCollapsed && (
          <div
            className={cn(
              'grid transition-all duration-200 ease-in-out',
              isExpanded ? 'grid-rows-[1fr] opacity-100 mt-1' : 'grid-rows-[0fr] opacity-0'
            )}
          >
            <div className="overflow-hidden space-y-0.5">
              {item.children!.filter(canSeeItem).map((child) => renderNavItem(child, depth + 1))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "relative flex h-screen min-h-0 shrink-0 flex-col overflow-hidden bg-[#0a0e27] text-white transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[80px]" : "w-[268px]"
        )}
      >
        {/* Header: logo + badge + toggle */}
        <div className={cn("shrink-0 px-4 pt-6 pb-4 flex items-start", isCollapsed ? "flex-col items-center gap-4" : "justify-between")}>
          <div className={cn("flex flex-col", isCollapsed ? "items-center" : "")}>
            {isCollapsed ? (
              <div className="h-10 w-10 bg-gradient-to-br from-[#3b82f6] to-[#6366f1] rounded-xl flex items-center justify-center font-bold text-lg tracking-tighter text-white shadow-lg">
                OC
              </div>
            ) : (
              <>
                <img
                  src="/icons/sidebar/logo-stackly-white.svg"
                  alt="Stackly"
                  className="h-12 w-auto max-w-[200px] object-contain object-left"
                />
                <div className="mt-3.5 inline-flex rounded-full border border-white/10 bg-[#13253a] px-2.5 py-1">
                  <span className="text-[9px] font-semibold tracking-[0.08em] text-[#7dd3c7] uppercase truncate max-w-[180px]">
                    Platform Administration
                  </span>
                </div>
              </>
            )}
          </div>
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white shrink-0 mt-1"
            )}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Nav */}
        <div className="sidebar-scroll min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-3 pb-3">
          {navigationConfig.map((group) => {
            const visibleItems = group.items.filter((item) => canSeeItem(item))
            if (visibleItems.length === 0) return null

            return (
              <div key={group.label} className="mb-5">
                {!isCollapsed ? (
                  <p className="mb-2 px-3 text-[10px] font-semibold tracking-[0.14em] text-white/40 uppercase truncate">
                    {group.label}
                  </p>
                ) : (
                  <div className="mb-2 h-px w-full bg-white/10" />
                )}
                <nav className="space-y-0.5">{visibleItems.map(item => renderNavItem(item))}</nav>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="shrink-0 space-y-1 border-t border-white/10 px-3 py-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg py-2.5 text-[13px] font-medium text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white",
                  isCollapsed ? "justify-center px-0" : "px-3"
                )}
                title={t.language}
              >
                <Languages className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} />
                {!isCollapsed && (
                  <>
                    <span className="min-w-0 flex-1 text-left truncate">Language</span>
                    <span className="flex items-center gap-1 text-white/50 shrink-0">
                      {language.nativeLabel}
                      <ChevronDown className="h-3.5 w-3.5" />
                    </span>
                  </>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side={isCollapsed ? "right" : "top"} align="start" className="w-52">
              {LANGUAGES.map((option) => (
                <DropdownMenuItem
                  key={option.code}
                  onClick={() => setLocale(option.code)}
                  className="flex items-center justify-between gap-2"
                >
                  <span>
                    <span className="font-medium">{option.nativeLabel}</span>
                    {option.nativeLabel !== option.label && (
                      <span className="ml-1.5 text-xs text-muted-foreground">
                        {option.label}
                      </span>
                    )}
                  </span>
                  {locale === option.code && <Check className="h-4 w-4 text-primary" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            type="button"
            onClick={handleLogout}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg py-2.5 text-[13px] font-medium text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white",
              isCollapsed ? "justify-center px-0" : "px-3"
            )}
            title={isCollapsed ? "Log out" : undefined}
          >
            <LogOut className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} />
            {!isCollapsed && <span>Log out</span>}
          </button>

          {user && (
            <div className={cn("mt-2 flex items-center gap-3 rounded-lg py-2", isCollapsed ? "justify-center px-0" : "px-2")}>
              <Avatar className="h-9 w-9 border border-white/15 shrink-0">
                {user.avatar && <AvatarImage src={user.avatar} alt={displayName} />}
                <AvatarFallback className="bg-gradient-to-br from-[#3b82f6] to-[#6366f1] text-xs font-semibold text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold leading-tight text-white">
                    {displayName}
                  </p>
                  <p className="truncate text-[11px] text-white/50">{roleLabel}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    </TooltipProvider>
  )
}
