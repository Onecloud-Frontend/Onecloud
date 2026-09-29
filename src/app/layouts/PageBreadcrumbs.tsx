import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navigationConfig } from '@/app/config/navigation.config'

const KNOWN_LABELS: Record<string, string> = {
  '/admin/dashboard': 'Super Admin Dashboard',
  '/admin/configuration': 'Platform Configuration',
  '/admin/branding': 'Platform Branding',
  '/admin/licensing': 'License Management',
  '/admin/users': 'User Management',
  '/admin/tenants': 'Tenants',
  '/admin/organizations': 'Organizations',
  '/admin/roles': 'Roles',
  '/admin/permissions': 'Permissions',
  '/admin/authentication-security': 'Authentication & Security',
  '/admin/audit-compliance': 'Audit & Compliance',
}

function findNavLabel(pathname: string): string | null {
  for (const group of navigationConfig) {
    for (const item of group.items) {
      if (pathname === item.path || pathname.startsWith(`${item.path}/`)) {
        return item.label
      }
    }
  }
  return KNOWN_LABELS[pathname] || null
}

/** Sits below the white top bar, in the page content area (Figma). */
export function PageBreadcrumbs() {
  const location = useLocation()

  const currentLabel = useMemo(
    () => findNavLabel(location.pathname) || 'Super Admin Dashboard',
    [location.pathname]
  )

  return (
    <nav className="mb-4 flex items-center gap-1.5 text-sm">
      <Link
        to="/admin/dashboard"
        className="text-slate-400 transition-colors hover:text-slate-600"
      >
        Platform Administration
      </Link>
      <span className="text-slate-300">/</span>
      <span className="font-semibold text-[#0b1f4d]">{currentLabel}</span>
    </nav>
  )
}
