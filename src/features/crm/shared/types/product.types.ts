export interface Product {
  id: string;
  productCode: string;
  name: string;
  description?: string;
  category: string;
  unitPrice: number;
  taxRate: number;
  currency: "INR";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}