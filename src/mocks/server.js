import { setupServer } from 'msw/node';
import { mockCollectionsHandlers } from './handlers/mockCollectionsHandlers';
import { mockDashboardHandlers } from './handlers/mockDashboardHandlers';

export const server = setupServer(...mockCollectionsHandlers, ...mockDashboardHandlers);
