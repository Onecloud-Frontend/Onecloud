
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  contactFormSchema,
  type ContactFormValues,
} from '../schemas/contactFormSchema';

const inputClassName = 'mt-1 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100';
const labelClassName = 'text-sm font-medium text-slate-700';

interface ContactFormProps {
  mode: 'create' | 'edit';
  defaultValues?: Partial<ContactFormValues>;
  isSubmitting?: boolean;
  onSubmit: (values: ContactFormValues) => void;
  onCancel: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  mode,
  defaultValues,
  isSubmitting = false,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '', lastName: '', customer: '', designation: '', department: '', email: '', phone: '', mobile: '', contactType: '', owner: '', status: '', dateOfBirth: '', address: '', city: '', state: '', country: '', postalCode: '', linkedIn: '', notes: '',
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-6 py-5"><h2 className="text-base font-semibold text-slate-900">Contact information</h2><p className="mt-1 text-sm text-slate-500">Fields marked with <span className="text-red-600">*</span> are required.</p></div>
      <div className="grid gap-x-5 gap-y-4 p-6 md:grid-cols-2">
        {([
          ['firstName', 'First Name', 'text', true], ['lastName', 'Last Name', 'text', true], ['customer', 'Customer', 'text', true], ['designation', 'Designation', 'text'], ['department', 'Department', 'text'], ['email', 'Email', 'email', true], ['phone', 'Phone', 'tel', true], ['mobile', 'Mobile', 'tel'], ['contactType', 'Contact Type', 'text'], ['owner', 'Owner', 'text'], ['status', 'Status', 'text'],
        ] as const).map(([name, label, type, required]) => <div key={name}><label className={labelClassName}>{label}{required && <span className="text-red-600"> *</span>}</label><input type={type} className={inputClassName} {...register(name)} />{errors[name] && <p className="mt-1 text-xs text-red-600">{errors[name]?.message}</p>}</div>)}
        {mode === 'create' && <div><label className={labelClassName}>Date of Birth</label><input type="date" className={inputClassName} {...register('dateOfBirth')} /></div>}
      </div>
      <div className="border-y border-slate-100 px-6 py-5"><h2 className="text-base font-semibold text-slate-900">Address details</h2></div>
      <div className="grid gap-x-5 gap-y-4 p-6 md:grid-cols-2">
        {(['address', 'city', 'state', 'country', 'postalCode', 'linkedIn'] as const).map((name) => <div key={name}><label className={labelClassName}>{name === 'linkedIn' ? 'LinkedIn' : name.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase())}</label><input className={inputClassName} {...register(name)} /></div>)}
        <div className="md:col-span-2"><label className={labelClassName}>Notes</label><textarea rows={4} className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100" {...register('notes')} /></div>
      </div>
      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-6 py-4 sm:flex-row sm:justify-end"><button type="button" onClick={onCancel} disabled={isSubmitting} className="h-10 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60">Cancel</button><button type="submit" disabled={isSubmitting} className="h-10 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? 'Saving…' : mode === 'create' ? 'Create Contact' : 'Save Changes'}</button></div>
    </form>
  );
};

export default ContactForm;
