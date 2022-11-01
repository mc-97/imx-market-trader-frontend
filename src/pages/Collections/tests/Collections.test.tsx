import * as React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Collections from '../Collections';
import { mockCollectionsData } from '../../../mocks/data/mockCollectionsData';

describe('<Collections />', () => {
  test('Page renders and mock api returns mock collections data', async () => {
    render(<Collections />);

    expect(screen.getByRole('heading', { name: /Collections/i })).toBeInTheDocument();
    expect(screen.getByRole('grid')).toHaveTextContent(/Collection Name/i);
    expect(screen.getByRole('button', { name: /Create Collection/i })).toBeEnabled();

    await waitFor(() =>
      expect(
        screen.getByText(mockCollectionsData[mockCollectionsData.length - 1]._id)
      ).toBeInTheDocument()
    );

    for (const collectionData of mockCollectionsData) {
      expect(screen.getByText(collectionData._id)).toBeInTheDocument();
      expect(screen.getByText(collectionData.collectionAddress)).toBeInTheDocument();
    }
  });

  test('Create collection', async () => {
    render(<Collections />);

    expect(screen.getByRole('button', { name: /Create Collection/i })).toBeEnabled();

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /Create Collection/i }));
    });
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Confirm Create/i })).toBeInTheDocument()
    );

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /Confirm Create/i }));
    });
    await waitFor(() => expect(screen.getByText(/Some params are empty/i)).toBeInTheDocument());

    const collectionIdField = await screen.getByLabelText(/Collection ID/i);
    const collectionAddressField = await screen.getByLabelText(/Collection Address/i);

    act(() => {
      fireEvent.change(collectionIdField, { target: { value: 'Test Collection Name' } });
      fireEvent.change(collectionAddressField, { target: { value: 'Test Collection Address' } });
      fireEvent.click(screen.getByRole('button', { name: /Confirm Create/i }));
    });
    await waitFor(() =>
      expect(screen.getByText(/Successfully created collection/i)).toBeInTheDocument()
    );
    await waitFor(() => expect(screen.getByText('Test Collection Name')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Test Collection Address')).toBeInTheDocument());
  });

  test('Delete collection', async () => {
    render(<Collections />);

    await waitFor(() =>
      expect(
        screen.getByText(mockCollectionsData[mockCollectionsData.length - 1]._id)
      ).toBeInTheDocument()
    );

    const deleteButton = await screen.getAllByRole('button', { name: /Delete/i })[0];
    expect(deleteButton).toBeEnabled();

    act(() => {
      fireEvent.click(deleteButton);
    });
    await waitFor(() =>
      expect(screen.getByRole('button', { name: /Confirm Delete/i })).toBeInTheDocument()
    );

    const collectionIdField = await screen.getByLabelText(/Collection ID/i);
    const collectionAddressField = await screen.getByLabelText(/Collection Address/i);
    const confirmDeleteButton = await screen.getAllByRole('button', { name: /Confirm Delete/i })[0];
    expect(confirmDeleteButton).toBeEnabled();

    act(() => {
      fireEvent.change(collectionIdField, { target: { value: '' } });
      fireEvent.click(confirmDeleteButton);
    });
    await waitFor(() => expect(screen.getByText(/Collection ID is empty/i)).toBeInTheDocument());

    const toDeleteCollectionId = mockCollectionsData[0]._id;
    const toDeleteCollectionAddress = mockCollectionsData[0].collectionAddress;
    act(() => {
      fireEvent.change(collectionIdField, { target: { value: toDeleteCollectionId } });
      fireEvent.change(collectionAddressField, { target: { value: toDeleteCollectionAddress } });
      fireEvent.click(confirmDeleteButton);
    });
    await waitFor(() => expect(screen.getByText(/Deleted 1 collections/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText(toDeleteCollectionId)).toBeNull());
    await waitFor(() => expect(screen.queryByText(toDeleteCollectionAddress)).toBeNull());
  });
});
