import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useCreateCustomer } from '../hooks/useCreateCustomer'
import type { CustomerFormData } from '../types/customer.types'

export const CreateCustomerPage: React.FC = () => {
  const navigate = useNavigate()
  const createCustomer = useCreateCustomer()

  const [formData, setFormData] = useState<CustomerFormData>({
    customerName: '',
    customerType: 'Business',
    industry: '',
    website: '',
    email: '',
    phone: '',
    owner: '',
    status: 'Active',
    taxNumber: '',
    billingAddress: '',
    shippingAddress: '',
    city: '',
    state: '',
    country: 'India',
    postalCode: '',
    currency: 'INR',
    paymentTerms: '',
    notes: '',
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (!formData.customerName.trim()) {
      alert('Customer Name is required')
      return
    }

    if (!formData.owner.trim()) {
      alert('Owner is required')
      return
    }

    createCustomer.mutate(formData, {
      onSuccess: () => {
        navigate('/crm/customers')
      },
    })
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          Create Customer
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Add a new customer to CRM
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl rounded border bg-white p-6"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Customer Name */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Customer Name *
            </label>

            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              placeholder="Enter customer name"
            />
          </div>

          {/* Customer Type */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Customer Type *
            </label>

            <select
              name="customerType"
              value={formData.customerType}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
            >
              <option value="Individual">
                Individual
              </option>

              <option value="Business">
                Business
              </option>

              <option value="Enterprise">
                Enterprise
              </option>
            </select>
          </div>

          {/* Industry */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Industry
            </label>

            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              placeholder="Enter industry"
            />
          </div>

          {/* Website */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Website
            </label>

            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              placeholder="Enter website"
            />
          </div>

          {/* Email */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              placeholder="Enter email"
            />
          </div>

          {/* Phone */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              placeholder="Enter phone number"
            />
          </div>

          {/* Owner */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Owner *
            </label>

            <input
              type="text"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              placeholder="Enter owner"
            />
          </div>

          {/* Status */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Status *
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>
          </div>

          {/* Tax Number */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Tax / GST Number
            </label>

            <input
              type="text"
              name="taxNumber"
              value={formData.taxNumber}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              placeholder="Enter Tax/GST number"
            />
          </div>

          {/* Currency */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Currency
            </label>

            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          {/* Billing Address */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Billing Address
            </label>

            <textarea
              name="billingAddress"
              value={formData.billingAddress}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              rows={3}
              placeholder="Enter billing address"
            />
          </div>

          {/* Shipping Address */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Shipping Address
            </label>

            <textarea
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              rows={3}
              placeholder="Enter shipping address"
            />
          </div>

          {/* City */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              City
            </label>

            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              placeholder="Enter city"
            />
          </div>

          {/* State */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              State
            </label>

            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              placeholder="Enter state"
            />
          </div>

          {/* Country */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Country
            </label>

            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              placeholder="Enter country"
            />
          </div>

          {/* Postal Code */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Postal Code
            </label>

            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              placeholder="Enter postal code"
            />
          </div>

          {/* Payment Terms */}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Payment Terms
            </label>

            <select
              name="paymentTerms"
              value={formData.paymentTerms}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
            >
              <option value="">
                Select payment terms
              </option>

              <option value="Immediate">
                Immediate
              </option>

              <option value="Net 15">
                Net 15
              </option>

              <option value="Net 30">
                Net 30
              </option>

              <option value="Net 45">
                Net 45
              </option>

              <option value="Net 60">
                Net 60
              </option>
            </select>
          </div>

          {/* Notes */}

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-medium">
              Notes
            </label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full rounded border px-3 py-2"
              rows={4}
              placeholder="Enter notes"
            />
          </div>
        </div>

        {/* Buttons */}

        <div className="mt-6 flex gap-3">
          <button
            type="submit"
            disabled={createCustomer.isPending}
            className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
          >
            {createCustomer.isPending
              ? 'Creating...'
              : 'Create Customer'}
          </button>

          <button
            type="button"
            onClick={() => navigate('/crm/customers')}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>
        </div>

        {createCustomer.isError && (
          <p className="mt-3 text-sm text-red-600">
            Unable to create customer.
          </p>
        )}
      </form>
    </div>
  )
}