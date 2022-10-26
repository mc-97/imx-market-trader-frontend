import * as React from 'react';
import Title from '../../components/Title';
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridValueFormatterParams
} from '@mui/x-data-grid';
import { CreateNewWalletDto, Wallet, WalletsApiFactory } from '../../api';
import { AlertColor, Grid, Paper } from '@mui/material';
import BigNumber from 'bignumber.js';
import DeleteWalletForm, { DeleteWalletFormParams } from './DeleteWalletForm';
import FormModal from '../../components/FormModal';
import DefaultSnackbar from '../../components/DefaultSnackbar';
import DefaultButton from '../../components/DefaultButton';
import CreateWalletForm from './CreateWalletForm';

export default function Wallets() {
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
    const walletId = data.get('walletId')?.toString() || undefined;
    if (walletId === undefined) {
      setSnackbarSeverity('warning');
      setSnackbarMessage('Wallet ID is empty');
      handleOpenSnackbar();
    } else {
      const createWalletDto: CreateNewWalletDto = { _id: walletId };
      walletsApi.walletsControllerCreateAndRegisterWallet(createWalletDto).then((response) => {
        if (response.data.length === 1) {
          setSnackbarSeverity('success');
          setSnackbarMessage('Successfully created wallet');
        } else {
          setSnackbarSeverity('warning');
          setSnackbarMessage('Failed to create wallet');
        }
        handleOpenSnackbar();
        handleCloseCreateForm();
        setReload(true);
      });
    }
  };

  const [deleteFormParams, setDeleteFormParams] = React.useState<DeleteWalletFormParams>({});
  const [openDeleteForm, setOpenDeleteForm] = React.useState(false);

  const handleOpenDeleteForm = (params: DeleteWalletFormParams) => {
    setDeleteFormParams(params);
    setOpenDeleteForm(true);
  };

  const handleCloseDeleteForm = () => {
    setOpenDeleteForm(false);
  };

  const onDeleteFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const walletId = data.get('walletId')?.toString() || undefined;
    if (walletId === undefined) {
      setSnackbarSeverity('warning');
      setSnackbarMessage('Wallet ID is empty');
      handleOpenSnackbar();
    } else {
      walletsApi.walletsControllerDelete(walletId).then((response) => {
        if (response.data.acknowledged === true) {
          setSnackbarSeverity('success');
          setSnackbarMessage(`Deleted ${response.data.deletedCount} wallets`);
        } else {
          setSnackbarSeverity('warning');
          setSnackbarMessage('Failed to delete wallets');
        }
        handleOpenSnackbar();
        handleCloseDeleteForm();
        setReload(true);
      });
    }
  };

  const [walletsData, setWalletsData] = React.useState<Wallet[]>([]);
  const [reload, setReload] = React.useState(true);
  const walletsApi = WalletsApiFactory();

  const columns: GridColumns = [
    { field: '_id', headerName: 'ID', type: 'string', width: 200 },
    { field: 'address', headerName: 'Address', type: 'number', width: 350 },
    {
      field: 'balance',
      headerName: 'balance',
      type: 'number',
      width: 200,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        if (params.value === null) {
          return '';
        }

        const valueFormatted = BigNumber(params.value).shiftedBy(-18).toLocaleString();
        return `${valueFormatted} ETH`;
      }
    },
    {
      field: 'delete',
      headerName: 'Delete',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <DefaultButton
            onClick={() =>
              handleOpenDeleteForm({
                walletId: params.row._id
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
      const walletsResponse = await walletsApi.walletsControllerFind();
      setWalletsData(walletsResponse.data);
    };

    if (reload === true) {
      setReload(false);
      fetchData();
    }
  }, [walletsData, reload]);

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 480 }}>
          <Title>Wallets</Title>
          <DataGrid
            columns={columns}
            rows={walletsData ?? []}
            getRowId={(row: Wallet) => row._id}
          />
          <DefaultButton onClick={handleOpenCreateForm} sx={{ mt: 2 }}>
            Create and register new wallet
          </DefaultButton>
        </Paper>
      </Grid>
      <FormModal open={openCreateForm} handleClose={handleCloseCreateForm}>
        <CreateWalletForm onSubmit={onCreateFormSubmit} />
      </FormModal>
      <FormModal open={openDeleteForm} handleClose={handleCloseDeleteForm}>
        <DeleteWalletForm params={deleteFormParams} onSubmit={onDeleteFormSubmit} />
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
