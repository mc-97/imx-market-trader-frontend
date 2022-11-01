import { Collection } from '../api';

export interface buildCollectionProps {
  _id?: string;
  collectionAddress?: string;
}

export const buildCollection = ({
  _id = 'Collection Name',
  collectionAddress = 'Collection Address'
}: buildCollectionProps): Collection => {
  return { _id, collectionAddress };
};
