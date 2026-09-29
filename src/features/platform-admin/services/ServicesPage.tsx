import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PageContainer } from '@/shared/components/ui/PageContainer'
import { Building2, Users } from 'lucide-react'

export default function ServicesPage() {
  const navigate = useNavigate()

  const services = [
    {
      id: 'crm',
      title: 'Customer Relationship Management',
      shortName: 'CRM',
      description: 'Manage leads, opportunities, contacts, and track your complete sales pipeline.',
      icon: Building2,
      path: '/crm/dashboard',
      color: 'bg-blue-50 text-blue-600',
      borderHover: 'hover:border-blue-300'
    },
    {
      id: 'hrms',
      title: 'Human Resource Management',
      shortName: 'HRMS',
      description: 'Manage employees, attendance, leave requests, and run complex payroll operations.',
      icon: Users,
      path: '/hrms/dashboard',
      color: 'bg-emerald-50 text-emerald-600',
      borderHover: 'hover:border-emerald-300'
    }
  ]

  return (
    <PageContainer className="max-w-5xl space-y-8">
      <div className="text-center mt-12 mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-[#0b1f4d]">
          Welcome to the Services Portal
        </h1>
        <p className="mt-3 text-base text-slate-500 max-w-2xl mx-auto">
          Select a business application below to access its dedicated workspace. 
          Your permissions dictate which modules you can view and interact with.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <button
            key={service.id}
            onClick={() => navigate(service.path)}
            className={`group relative flex flex-col text-left items-start p-8 rounded-2xl bg-white border border-slate-200/80 shadow-sm transition-all duration-200 hover:shadow-md ${service.borderHover}`}
          >
            <div className={`p-4 rounded-xl mb-6 ${service.color}`}>
              <service.icon className="h-8 w-8" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-bold text-[#0b1f4d] group-hover:text-blue-600 transition-colors">
              {service.title}
            </h2>
            <div className="mt-2 text-sm font-medium tracking-wider text-slate-400 uppercase">
              {service.shortName}
            </div>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              {service.description}
            </p>
            <div className="mt-8 text-sm font-semibold text-blue-600 flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
              Launch application <span aria-hidden="true">&rarr;</span>
            </div>
          </button>
        ))}
      </div>
    </PageContainer>
  )
}
