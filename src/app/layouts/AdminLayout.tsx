import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { PageBreadcrumbs } from './PageBreadcrumbs'

/**
 * AdminLayout
 *
 * Used for: /admin/* — Platform Administration (Super Admin)
 * Integrates the completed Platform Administration application shell:
 * - Fixed 268px dark navy sidebar (#0a0e27) with Stackly branding & navigation
 * - Header with global search, ⌘ K shortcut, notifications, settings, and UserMenu
 * - PageBreadcrumbs with Platform Administration context
 * - Content area on #f3f5f9 canvas
 */
const AdminLayout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#f3f5f9]">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-[#f3f5f9] px-6 pt-4 pb-6">
          <PageBreadcrumbs />
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
