import { rest } from 'msw';
import { API_BASE_PATH } from '../../globalVars';
import {
  mockCollectionsCount,
  mockLimitOrdersCount,
  mockNftAssetsCount,
  mockWalletsCount
} from '../data/mockDashboardData';

export const mockDashboardHandlers = [
  rest.get(`${API_BASE_PATH}wallets/count`, (req, res, ctx) => {
    return res(ctx.json(mockWalletsCount));
  }),
  rest.get(`${API_BASE_PATH}collections/count`, (req, res, ctx) => {
    return res(ctx.json(mockCollectionsCount));
  }),
  rest.get(`${API_BASE_PATH}limit-orders/count`, (req, res, ctx) => {
    return res(ctx.json(mockLimitOrdersCount));
  }),
  rest.get(`${API_BASE_PATH}nft-assets/count`, (req, res, ctx) => {
    return res(ctx.json(mockNftAssetsCount));
  })
];
