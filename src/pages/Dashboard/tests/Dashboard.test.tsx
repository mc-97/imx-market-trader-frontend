import * as React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../Dashboard';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import {
  mockCollectionsCount,
  mockLimitOrdersCount,
  mockNftAssetsCount,
  mockWalletsCount
} from '../../../mocks/data/mockDashboardData';

describe('<Dashboard />', () => {
  test('Page renders, mock api returns counts and buttons navigate correctly', async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <Dashboard />
      </Router>
    );

    expect(screen.getByRole('heading', { name: /Dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Wallets/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Collections/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Limit Orders/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /NFT Assets/i })).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText(mockWalletsCount)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(mockCollectionsCount)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(mockLimitOrdersCount)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(mockNftAssetsCount)).toBeInTheDocument());

    const walletsButton = await screen.findByRole('link', { name: /Manage Wallets/i });
    expect(walletsButton).toBeEnabled();
    act(() => {
      fireEvent.click(walletsButton);
    });
    expect(history.location.pathname).toBe('/wallets');

    const collectionsButton = await screen.findByRole('link', { name: /Manage Collections/i });
    expect(collectionsButton).toBeEnabled();
    act(() => {
      fireEvent.click(collectionsButton);
    });
    expect(history.location.pathname).toBe('/collections');

    const limitOrdersButton = await screen.findByRole('link', { name: /Manage Limit Orders/i });
    expect(limitOrdersButton).toBeEnabled();
    act(() => {
      fireEvent.click(limitOrdersButton);
    });
    expect(history.location.pathname).toBe('/limit-orders');
  });
});
