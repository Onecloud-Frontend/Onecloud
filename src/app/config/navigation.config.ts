import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  Shield,
  Globe,
  Settings2,
  Palette,
  Puzzle,
  KeyRound,
  Settings,
  Building2,
  Users,
} from 'lucide-react'
import { PERMISSIONS, type Permission } from '@/core/permissions'

export interface NavigationItem {
  label: string
  path?: string
  icon?: LucideIcon
  module?: string
  permission?: Permission
  children?: NavigationItem[]
}

export interface NavigationGroup {
  label: string
  items: NavigationItem[]
}

export const navigationConfig: NavigationGroup[] = [
  {
    label: 'SUPER ADMIN MANAGEMENT',
    items: [
      {
        label: 'Super Admin Dashboard',
        path: '/admin/dashboard',
        icon: LayoutDashboard,
        permission: PERMISSIONS.DASHBOARD.VIEW,
      },
      {
        label: 'Platform Administration',
        icon: Shield,
        permission: PERMISSIONS.DASHBOARD.VIEW,
      },
      {
        label: 'Global Dashboard',
        icon: Globe,
        permission: PERMISSIONS.DASHBOARD.VIEW,
      },
      {
        label: 'Platform Configuration',
        path: '/admin/configuration',
        icon: Settings2,
        permission: PERMISSIONS.DASHBOARD.VIEW,
      },
      {
        label: 'Platform Branding',
        path: '/admin/branding',
        icon: Palette,
        permission: PERMISSIONS.DASHBOARD.VIEW,
      },
      {
        label: 'Feature Management',
        icon: Puzzle,
        permission: PERMISSIONS.DASHBOARD.VIEW,
      },
      {
        label: 'License Management',
        path: '/admin/licensing',
        icon: KeyRound,
        permission: PERMISSIONS.DASHBOARD.VIEW,
      },
      {
        label: 'Settings',
        icon: Settings,
        permission: PERMISSIONS.DASHBOARD.VIEW,
      },
    ],
  },
  {
    label: 'ORGANIZATION',
    items: [
      {
        label: 'Company Setup',
        icon: Building2,
        permission: PERMISSIONS.DASHBOARD.VIEW,
      },
      {
        label: 'User Management',
        path: '/admin/users',
        icon: Users,
        permission: PERMISSIONS.DASHBOARD.VIEW,
      },
    ],
  },
  {
    label: 'SERVICES',
    items: [
      {
        label: 'Services',
        icon: Puzzle,
        permission: PERMISSIONS.DASHBOARD.VIEW,
        children: [
          { label: 'CRM', path: '/crm/dashboard' },
          { label: 'HRMS', path: '/hrms/dashboard' },
          { label: 'View all services', path: '/admin/services' },
        ]
      },
    ],
  },
]
