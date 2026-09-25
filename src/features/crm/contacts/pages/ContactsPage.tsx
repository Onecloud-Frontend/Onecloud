
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/shared/components/ui/PageContainer';
import { Plus } from 'lucide-react';
import ContactTable from '../components/ContactTable';
import ContactFilters from '../components/ContactFilters';
import { useContacts } from '../hooks/contact.hooks';

const ITEMS_PER_PAGE = 10;

const ContactsPage: React.FC = () => {
  const navigate = useNavigate();

  const { data: contacts = [], isLoading, isError } = useContacts();

  const [search, setSearch] = useState('');
  const [customer, setCustomer] = useState('');
  const [designation, setDesignation] = useState('');
  const [owner, setOwner] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const customers = useMemo(
    () => [...new Set(contacts.map((contact) => contact.customer))],
    [contacts]
  );

  const designations = useMemo(
    () => [...new Set(contacts.map((contact) => contact.designation))],
    [contacts]
  );

  const owners = useMemo(
    () => [...new Set(contacts.map((contact) => contact.owner))],
    [contacts]
  );

  const filteredContacts = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return contacts.filter((contact) => {
      const matchesSearch =
        !searchValue ||
        contact.contactId.toLowerCase().includes(searchValue) ||
        contact.firstName.toLowerCase().includes(searchValue) ||
        contact.lastName.toLowerCase().includes(searchValue) ||
        `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchValue) ||
        contact.customer.toLowerCase().includes(searchValue) ||
        contact.email.toLowerCase().includes(searchValue);

      const matchesCustomer =
        !customer || contact.customer === customer;

      const matchesDesignation =
        !designation || contact.designation === designation;

      const matchesOwner =
        !owner || contact.owner === owner;

      return (
        matchesSearch &&
        matchesCustomer &&
        matchesDesignation &&
        matchesOwner
      );
    });
  }, [contacts, search, customer, designation, owner]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredContacts.length / ITEMS_PER_PAGE)
  );

  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleCustomerChange = (value: string) => {
    setCustomer(value);
    setCurrentPage(1);
  };

  const handleDesignationChange = (value: string) => {
    setDesignation(value);
    setCurrentPage(1);
  };

  const handleOwnerChange = (value: string) => {
    setOwner(value);
    setCurrentPage(1);
  };

  const handleView = (contactId: string) => {
    navigate(`/crm/contacts/${contactId}`);
  };

  const handleEdit = (contactId: string) => {
    navigate(`/crm/contacts/${contactId}/edit`);
  };

  return (
    <PageContainer className="space-y-5 pb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-sm font-medium text-blue-600">CRM</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">Contacts</h1><p className="mt-1 text-sm text-slate-500">Manage customer contact information and relationship details.</p></div><button type="button" onClick={() => navigate('/crm/contacts/new')} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition hover:bg-blue-700"><Plus className="size-4" />Create Contact</button></div>

        <ContactFilters
          search={search}
          customer={customer}
          designation={designation}
          owner={owner}
          customers={customers}
          designations={designations}
          owners={owners}
          onSearchChange={handleSearchChange}
          onCustomerChange={handleCustomerChange}
          onDesignationChange={handleDesignationChange}
          onOwnerChange={handleOwnerChange}
        />

        {isLoading && <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">Loading contacts…</div>}

        {isError && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">Contacts could not be loaded. Please try again.</div>}

        {!isLoading && !isError && contacts.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">No contacts available.</div>
        )}

        {!isLoading &&
          !isError &&
          contacts.length > 0 &&
          filteredContacts.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">No contacts match the current filters.</div>
          )}

        {!isLoading &&
          !isError &&
          filteredContacts.length > 0 && (
            <>
              <ContactTable
                contacts={paginatedContacts}
                onView={handleView}
                onEdit={handleEdit}
              />

              <div className="flex items-center justify-between text-sm text-slate-600">
                <span>Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredContacts.length)} of {filteredContacts.length}</span>
                <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50">Previous</button>

                <span>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(totalPages, page + 1)
                    )
                  }
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50">Next</button>
                </div>
              </div>
            </>
          )}
    </PageContainer>
  );
};

export { ContactsPage };
export default ContactsPage;
