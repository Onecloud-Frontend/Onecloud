import { mockCustomers } from '../mocks/customerMockData'
import type {
  Customer,
  CustomerFormData,
} from '../types/customer.types'

const CUSTOMER_STORAGE_KEY = 'crm-customers'

const readCustomers = (): Customer[] => {
  try {
    const storedCustomers = localStorage.getItem(CUSTOMER_STORAGE_KEY)
    if (!storedCustomers) {
      return [...mockCustomers]
    }

    const parsedCustomers: unknown = JSON.parse(storedCustomers)
    return Array.isArray(parsedCustomers)
      ? parsedCustomers as Customer[]
      : [...mockCustomers]
  } catch {
    return [...mockCustomers]
  }
}

const writeCustomers = (customers: Customer[]) => {
  localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customers))
}

export const customerService = {
  // Get all customers
  getCustomers: async (): Promise<Customer[]> => {
    return Promise.resolve(readCustomers())
  },
  // Get one customer by ID
  getCustomerById: async (
    id: string
  ): Promise<Customer | undefined> => {
    const customer = readCustomers().find(
      (customer) => customer.id === id
    )

    return Promise.resolve(customer)
  },

  // Create a new customer
  createCustomer: async (
    customerData: CustomerFormData
  ): Promise<Customer> => {
    const customers = readCustomers()
    const newId = String(customers.length + 1)

    const newCustomer: Customer = {
      ...customerData,

      id: newId,

      customerId: `CUS-${newId.padStart(3, '0')}`,

      primaryContact: '',

      totalOpportunities: 0,

      totalRevenue: 0,

      createdDate: new Date().toISOString(),

      updatedDate: new Date().toISOString(),

      lastActivity: '',

      contacts: [],
      opportunities: [],
      quotes: [],
      orders: [],
      invoices: [],
      activities: [],
      serviceHistory: [],
    }

    writeCustomers([...customers, newCustomer])

    return Promise.resolve(newCustomer)
  },

  // Update an existing customer
  updateCustomer: async (
  id: string,
  customerData: CustomerFormData
): Promise<Customer | undefined> => {
  const customers = readCustomers()
  const customerIndex = customers.findIndex(
    (customer) => customer.id === id
  )

  if (customerIndex === -1) {
    return Promise.resolve(undefined)
  }

  const updatedCustomer: Customer = {
    ...customers[customerIndex],
    ...customerData,
    updatedDate: new Date().toISOString(),
  }

  customers[customerIndex] = updatedCustomer
  writeCustomers(customers)

  return Promise.resolve(updatedCustomer)
},
  // Delete a customer
  deleteCustomer: async (
    id: string
  ): Promise<boolean> => {
    const customers = readCustomers()
    const customerIndex = customers.findIndex(
      (customer) => customer.id === id
    )

    if (customerIndex === -1) {
      return Promise.resolve(false)
    }

    customers.splice(customerIndex, 1)
    writeCustomers(customers)

    return Promise.resolve(true)
  },
}