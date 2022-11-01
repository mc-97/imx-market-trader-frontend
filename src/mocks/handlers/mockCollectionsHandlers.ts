import { rest } from 'msw';
import { Collection, DeleteResult } from '../../api';
import { API_BASE_PATH } from '../../globalVars';
import { mockCollectionsData } from '../data/mockCollectionsData';

export const mockCollectionsHandlers = [
  rest.get(`${API_BASE_PATH}collections`, (req, res, ctx) => {
    const collectionsData = sessionStorage.getItem('collectionsData');
    if (collectionsData) {
      return res(ctx.json(JSON.parse(collectionsData)));
    } else {
      sessionStorage.setItem('collectionsData', JSON.stringify(mockCollectionsData));
      return res(ctx.json(mockCollectionsData));
    }
  }),
  rest.delete(`${API_BASE_PATH}collections`, (req, res, ctx) => {
    const deleteResult: DeleteResult = { acknowledged: true, deletedCount: 0 };
    const collectionId = req.url.searchParams.get('collectionId');
    const collectionAddress = req.url.searchParams.get('collectionAddress');
    if (collectionId) {
      const collectionsData: Collection[] = JSON.parse(sessionStorage.getItem('collectionsData')!);
      const updatedCollectionsData: Collection[] = collectionsData.filter(
        (collection) =>
          collection._id !== collectionId ||
          (collectionAddress && collection.collectionAddress !== collectionAddress)
      );
      const deletedCount = collectionsData.length - updatedCollectionsData.length;
      if (deletedCount > 0) {
        sessionStorage.setItem('collectionsData', JSON.stringify(updatedCollectionsData));
        deleteResult.deletedCount = deletedCount;
      }
    }
    return res(ctx.json(deleteResult));
  }),
  rest.post(`${API_BASE_PATH}collections`, async (req, res, ctx) => {
    const postBody = await req.json();
    const collectionId = postBody._id;
    const collectionAddress = postBody.collectionAddress;
    const createResponse: Collection[] = [];
    if (collectionId && collectionAddress) {
      createResponse.push({ _id: collectionId, collectionAddress: collectionAddress });
      const collectionsData: Collection[] = JSON.parse(sessionStorage.getItem('collectionsData')!);
      collectionsData.push({ _id: collectionId, collectionAddress: collectionAddress });
      sessionStorage.setItem('collectionsData', JSON.stringify(collectionsData));
    }
    return res(ctx.json(createResponse));
  })
];
