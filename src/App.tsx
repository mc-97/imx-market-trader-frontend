import * as React from 'react';
import Layout from './layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Wallets from './pages/Wallets/Wallets';
import Dashboard from './pages/Dashboard/DashBoard';
import Collections from './pages/Collections/Collections';
import LimitOrders from './pages/LimitOrders/LimitOrders';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="wallets" element={<Wallets />} />
        <Route path="collections" element={<Collections />} />
        <Route path="limit-orders" element={<LimitOrders />} />
      </Route>
    </Routes>
  );
}
