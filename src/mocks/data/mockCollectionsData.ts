import { Collection } from '../../api';
import { buildCollection } from '../../builders/buildCollection';

export const mockCollectionsData: Collection[] = [];

for (let i = 0; i < 3; i++) {
  mockCollectionsData.push(
    buildCollection({ _id: `Collection #${i}`, collectionAddress: `Collection Address #${i}` })
  );
}
