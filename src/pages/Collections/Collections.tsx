import * as React from 'react';
import Title from '../../components/Title';
import { DataGrid, GridColumns, GridRenderCellParams } from '@mui/x-data-grid';
import { Collection, CollectionsApiFactory } from '../../api';
import { AlertColor, Grid, Paper } from '@mui/material';
import DefaultButton from '../../components/DefaultButton';
import DefaultSnackbar from '../../components/DefaultSnackbar';
import FormModal from '../../components/FormModal';
import DeleteCollectionForm, { DeleteCollectionFormParams } from './DeleteCollectionForm';
import CreateCollectionForm from './CreateCollectionForm';
import { CreateCollectionDto } from '../../api';

export default function Collections() {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<AlertColor>('info');
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const [openCreateForm, setOpenCreateForm] = React.useState(false);

  const handleOpenCreateForm = () => {
    setOpenCreateForm(true);
  };

  const handleCloseCreateForm = () => {
    setOpenCreateForm(false);
  };

  const onCreateFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const collectionId = data.get('collectionId')?.toString() || undefined;
    const collectionAddress = data.get('collectionAddress')?.toString() || undefined;
    if (collectionId === undefined || collectionAddress === undefined) {
      setSnackbarSeverity('warning');
      setSnackbarMessage('Some params are empty');
      handleOpenSnackbar();
    } else {
      const createCollectionDto: CreateCollectionDto = { _id: collectionId, collectionAddress };
      collectionsApi.collectionsControllerCreate(createCollectionDto).then((response) => {
        if (response.data.length === 1) {
          setSnackbarSeverity('success');
          setSnackbarMessage('Successfully created collection');
        } else {
          setSnackbarSeverity('warning');
          setSnackbarMessage('Failed to create collection');
        }
        handleOpenSnackbar();
        handleCloseCreateForm();
        setReload(true);
      });
    }
  };

  const [deleteFormParams, setDeleteFormParams] = React.useState<DeleteCollectionFormParams>({});
  const [openDeleteForm, setOpenDeleteForm] = React.useState(false);

  const handleOpenDeleteForm = (params: DeleteCollectionFormParams) => {
    setDeleteFormParams(params);
    setOpenDeleteForm(true);
  };

  const handleCloseDeleteForm = () => {
    setOpenDeleteForm(false);
  };

  const onDeleteFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const collectionId = data.get('collectionId')?.toString() || undefined;
    const collectionAddress = data.get('collectionAddress')?.toString() || undefined;
    if (collectionId === undefined) {
      setSnackbarSeverity('warning');
      setSnackbarMessage('Collection ID is empty');
      handleOpenSnackbar();
    } else {
      collectionsApi
        .collectionsControllerDelete(collectionId, collectionAddress)
        .then((response) => {
          if (response.data.acknowledged === true) {
            setSnackbarSeverity('success');
            setSnackbarMessage(`Deleted ${response.data.deletedCount} collections`);
          } else {
            setSnackbarSeverity('warning');
            setSnackbarMessage('Failed to delete collections');
          }
          handleOpenSnackbar();
          handleCloseDeleteForm();
          setReload(true);
        });
    }
  };

  const [collectionsData, setCollectionsData] = React.useState<Collection[]>([]);
  const [reload, setReload] = React.useState(true);
  const collectionsApi = CollectionsApiFactory();

  const columns: GridColumns = [
    { field: '_id', headerName: 'Collection Name', type: 'string', width: 200 },
    { field: 'collectionAddress', headerName: 'Address', type: 'number', width: 350 },
    {
      field: 'delete',
      headerName: 'Delete',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <DefaultButton
            onClick={() =>
              handleOpenDeleteForm({
                collectionId: params.row._id,
                collectionAddress: params.row.collectionAddress
              })
            }
          >
            Delete
          </DefaultButton>
        );
      }
    }
  ];

  React.useEffect(() => {
    const fetchData = async () => {
      const collectionsResponse = await collectionsApi.collectionsControllerFind();
      setCollectionsData(collectionsResponse.data);
    };

    if (reload === true) {
      setReload(false);
      fetchData();
    }
  }, [collectionsData, reload]);

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 480 }}>
          <Title>Collections</Title>
          <DataGrid
            columns={columns}
            rows={collectionsData}
            getRowId={(row: Collection) => row._id}
          />
          <DefaultButton onClick={handleOpenCreateForm} sx={{ mt: 2 }}>
            Create Collection
          </DefaultButton>
        </Paper>
      </Grid>
      <FormModal open={openCreateForm} handleClose={handleCloseCreateForm}>
        <CreateCollectionForm onSubmit={onCreateFormSubmit} />
      </FormModal>
      <FormModal open={openDeleteForm} handleClose={handleCloseDeleteForm}>
        <DeleteCollectionForm params={deleteFormParams} onSubmit={onDeleteFormSubmit} />
      </FormModal>
      <DefaultSnackbar
        open={openSnackbar}
        handleClose={handleCloseSnackbar}
        severity={snackbarSeverity}
        message={snackbarMessage}
      ></DefaultSnackbar>
    </React.Fragment>
  );
}
