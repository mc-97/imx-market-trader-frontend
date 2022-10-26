import * as React from 'react';
import Title from '../../components/Title';
import {
  DataGrid,
  GridColumns,
  GridRenderCellParams,
  GridValueFormatterParams
} from '@mui/x-data-grid';
import {
  CreateLimitOrderDto,
  CreateLimitOrderDtoOrderTypeEnum,
  LimitOrder,
  LimitOrdersApiFactory
} from '../../api';
import { AlertColor, Grid, Paper } from '@mui/material';
import BigNumber from 'bignumber.js';
import DefaultButton from '../../components/DefaultButton';
import FormModal from '../../components/FormModal';
import CreateLimitOrderForm from './CreateLimitOrderForm';
import DefaultSnackbar from '../../components/DefaultSnackbar';
import { checkEnumValue } from '../../utils/checkEnumValue';
import { isNumeric } from '../../utils/isNumeric';
import DeleteLimitOrderForm, { DeleteLimitOrderFormParams } from './DeleteLimitOrderForm';

export default function LimitOrders() {
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
    const collectionId = data.get('collectionId')?.toString() || undefined;
    const assetName = data.get('assetName')?.toString() || undefined;
    const orderType = data.get('orderType')?.toString() || undefined;
    const priceLevel = data.get('priceLevel')?.toString() || undefined;
    const feesPercent = data.get('feesPercent')?.toString() || undefined;
    const maxQuantity = data.get('maxQuantity')?.toString() || undefined;
    if (
      walletId === undefined ||
      collectionId === undefined ||
      assetName === undefined ||
      orderType === undefined ||
      priceLevel === undefined ||
      feesPercent === undefined ||
      maxQuantity === undefined
    ) {
      setSnackbarSeverity('warning');
      setSnackbarMessage('Some params are empty');
      handleOpenSnackbar();
    } else if (
      !checkEnumValue(CreateLimitOrderDtoOrderTypeEnum, orderType) ||
      !isNumeric(priceLevel) ||
      !isNumeric(feesPercent) ||
      !isNumeric(maxQuantity)
    ) {
      setSnackbarSeverity('warning');
      setSnackbarMessage('Some params are invalid');
      handleOpenSnackbar();
    } else {
      const createLimitOrderDto: CreateLimitOrderDto = {
        walletId,
        collectionId,
        assetName,
        orderType: orderType as CreateLimitOrderDtoOrderTypeEnum,
        priceLevel: BigNumber(priceLevel).shiftedBy(18).toString(),
        feesPercent: parseInt(feesPercent),
        maxQuantity: parseInt(maxQuantity)
      };
      limitOrdersApi.limitOrdersControllerCreate(createLimitOrderDto).then((response) => {
        if (response.data && response.data._id) {
          setSnackbarSeverity('success');
          setSnackbarMessage('Successfully created limit order');
        } else {
          setSnackbarSeverity('warning');
          setSnackbarMessage('Failed to create limit order');
        }
        handleOpenSnackbar();
        handleCloseCreateForm();
        setReload(true);
      });
    }
  };

  const [deleteFormParams, setDeleteFormParams] = React.useState<DeleteLimitOrderFormParams>({});
  const [openDeleteForm, setOpenDeleteForm] = React.useState(false);

  const handleOpenDeleteForm = (params: DeleteLimitOrderFormParams) => {
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
    const collectionId = data.get('collectionId')?.toString() || undefined;
    const assetName = data.get('assetName')?.toString() || undefined;
    const orderType = data.get('orderType')?.toString() || undefined;
    if (
      walletId === undefined ||
      collectionId === undefined ||
      assetName === undefined ||
      orderType === undefined
    ) {
      setSnackbarSeverity('warning');
      setSnackbarMessage('Some params are empty');
      handleOpenSnackbar();
    } else if (!checkEnumValue(CreateLimitOrderDtoOrderTypeEnum, orderType)) {
      setSnackbarSeverity('warning');
      setSnackbarMessage('Order type is invalid');
      handleOpenSnackbar();
    } else {
      limitOrdersApi
        .limitOrdersControllerDeleteLimitOrders(walletId, collectionId, assetName, orderType)
        .then((response) => {
          if (response.data.acknowledged === true) {
            setSnackbarSeverity('success');
            setSnackbarMessage(`Deleted ${response.data.deletedCount} limit orders`);
          } else {
            setSnackbarSeverity('warning');
            setSnackbarMessage('Failed to delete limit orders');
          }
          handleOpenSnackbar();
          handleCloseDeleteForm();
          setReload(true);
        });
    }
  };

  const [limitOrdersData, setLimitOrdersData] = React.useState<LimitOrder[]>([]);
  const [reload, setReload] = React.useState(true);
  const limitOrdersApi = LimitOrdersApiFactory();

  const columns: GridColumns = [
    { field: 'walletId', headerName: 'Wallet ID', type: 'string', width: 120 },
    { field: 'collectionId', headerName: 'Collection Name', type: 'string', width: 150 },
    { field: 'assetName', headerName: 'Asset Name', type: 'string', width: 150 },
    { field: 'orderType', headerName: 'Order Type', type: 'string', width: 100 },
    {
      field: 'priceLevel',
      headerName: 'Price Level',
      type: 'number',
      width: 120,
      valueFormatter: (params: GridValueFormatterParams<string>) => {
        if (params.value === null) {
          return '';
        }

        const valueFormatted = BigNumber(params.value).shiftedBy(-18).toLocaleString();
        return `${valueFormatted} ETH`;
      }
    },
    { field: 'priceLevelMultiplier', headerName: 'Multiplier', type: 'number', width: 80 },
    {
      field: 'feesPercent',
      headerName: 'Fees',
      type: 'number',
      width: 80,
      valueFormatter: (params: GridValueFormatterParams) => {
        if (params.value === null) {
          return '';
        }

        const valueFormatted = params.value.toLocaleString();
        return `${valueFormatted} %`;
      }
    },
    { field: 'maxQuantity', headerName: 'Max Quantity', type: 'number', width: 150 },
    {
      field: 'delete',
      headerName: 'Delete',
      renderCell: (params: GridRenderCellParams) => {
        return (
          <DefaultButton
            onClick={() =>
              handleOpenDeleteForm({
                walletId: params.row.walletId,
                collectionId: params.row.collectionId,
                assetName: params.row.assetName,
                orderType: params.row.orderType
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
      const limitOrdersResponse = await limitOrdersApi.limitOrdersControllerFind();
      setLimitOrdersData(limitOrdersResponse.data);
    };

    if (reload === true) {
      setReload(false);
      fetchData();
    }
  }, [limitOrdersData, reload]);

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 480 }}>
        <Title>LimitOrders</Title>
        <DataGrid
          columns={columns}
          rows={limitOrdersData ?? []}
          getRowId={(row: LimitOrder) => row._id}
        />
        <DefaultButton onClick={handleOpenCreateForm} sx={{ mt: 2 }}>
          Create Limit Order
        </DefaultButton>
      </Paper>
      <FormModal open={openCreateForm} handleClose={handleCloseCreateForm}>
        <CreateLimitOrderForm onSubmit={onCreateFormSubmit} />
      </FormModal>
      <FormModal open={openDeleteForm} handleClose={handleCloseDeleteForm}>
        <DeleteLimitOrderForm params={deleteFormParams} onSubmit={onDeleteFormSubmit} />
      </FormModal>
      <DefaultSnackbar
        open={openSnackbar}
        handleClose={handleCloseSnackbar}
        severity={snackbarSeverity}
        message={snackbarMessage}
      ></DefaultSnackbar>
    </Grid>
  );
}
