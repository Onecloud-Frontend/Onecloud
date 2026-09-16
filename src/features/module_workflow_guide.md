# OneCloud Feature Module Workflow Guide

This guide defines exactly how a developer must implement a single feature within their assigned module, using CRM Leads as an example.

## Core Rule
**Never skip layers.** A React page must NEVER call `axios` or `fetch` directly. Data fetching must always flow through TanStack Query, which calls a Service, which calls the core API client.

## Implementation Sequence

### 1. Mock Data (`mocks/`)
First, define what the data looks like and create the mock response.
```typescript
// src/features/crm/leads/mocks/leadMocks.ts
export const mockLeads = [
  { id: '1', name: 'Acme Corp', status: 'NEW' },
  { id: '2', name: 'TechFlow', status: 'CONTACTED' }
];
```
*(Ensure this is hooked up to the central `src/core/api/mock/` infrastructure).*

### 2. Service (`services/`)
Create the API interaction layer.
```typescript
// src/features/crm/leads/services/leadService.ts
import apiClient from '@/core/api/apiClient';
import { Lead } from '../types/lead.types';

export const leadService = {
  getLeads: async (): Promise<Lead[]> => {
    const response = await apiClient.get('/api/crm/leads');
    return response.data;
  }
};
```

### 3. TanStack Query Hook (`hooks/`)
Create a custom hook to manage server state and caching.
```typescript
// src/features/crm/leads/hooks/useLeads.ts
import { useQuery } from '@tanstack/react-query';
import { leadService } from '../services/leadService';

export const useLeads = () => {
  return useQuery({
    queryKey: ['crm', 'leads'], // Strict domain prefix
    queryFn: leadService.getLeads
  });
};
```

### 4. Component (`components/`)
Build a "dumb" presentational component.
```tsx
// src/features/crm/leads/components/LeadTable.tsx
import { Lead } from '../types/lead.types';

export const LeadTable = ({ leads }: { leads: Lead[] }) => {
  return (
    <table>
      {/* Render leads */}
    </table>
  );
};
```

### 5. Page (`pages/`)
Connect the hook to the component at the route level.
```tsx
// src/features/crm/leads/pages/LeadsPage.tsx
import { useLeads } from '../hooks/useLeads';
import { LeadTable } from '../components/LeadTable';
import { CircularProgress, Alert } from '@mui/material';

export const LeadsPage = () => {
  const { data, isLoading, error } = useLeads();

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Failed to load leads</Alert>;
  if (!data?.length) return <div>No leads found</div>;

  return (
    <div>
      <h1>Leads</h1>
      <LeadTable leads={data} />
    </div>
  );
};
```

### 6. Route Integration
Coordinate with the Developer 1 (Integration Coordinator) to add the route to `src/app/router/index.tsx`. Do not edit the core router directly!
