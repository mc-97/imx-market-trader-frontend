import { setupWorker } from 'msw';
import { mockCollectionsHandlers } from './handlers/mockCollectionsHandlers';
import { mockDashboardHandlers } from './handlers/mockDashboardHandlers';

export const worker = setupWorker(...mockCollectionsHandlers, ...mockDashboardHandlers);
