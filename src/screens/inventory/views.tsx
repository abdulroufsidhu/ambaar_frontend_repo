import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { IInventory, IProduct, Inventory } from "../../shared/models/inventory";
import useAppContext from "../../shared/hooks/app-context";
import { useState, useEffect, isValidElement, } from "react";
import { MyFab } from "../../shared/components/buttons";
import {
  AddShoppingCartOutlined,
  EditOutlined,
  ScannerOutlined,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { MyBarcodeScanner } from "../../shared/components/barcode-scanner";
import { TextResult } from "dynamsoft-javascript-barcode";

interface ItemAddProp {
  inventory?: IInventory
  onSuccess?: (inventory: IInventory) => void
}

export const InventoryItemAdd = ({ inventory, onSuccess }: ItemAddProp) => {
  const [product, setProduct] = useState<IProduct>(inventory?.product ?? {});
  const [scannerActive, setScannerActive] = useState<boolean>(false);
  const [context, dispatch] = useAppContext();

  const handleInputChange = (field: keyof IProduct, value: any) => {
    setProduct((prevInput) => ({
      ...prevInput,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (inventory) {
      Inventory.update({ ...inventory, product }).then(() => !!onSuccess && onSuccess({ product, branch: context.branch })).catch(error =>
        console.error(error)
      );
    } else {
      Inventory.add({ product: product, branch: context.branch }).then((item) => !!onSuccess && onSuccess(item)).catch((error) =>
        console.error(error)
      );
    }
    dispatch({ action: "CLOSE_POPUP" });
  };

  const handleScanner = () => {
    setScannerActive((prev) => !prev);
  };

  const onScanerClicked = (result: TextResult) => {
    handleInputChange("serialNumber", result.barcodeText);
  };

  const onScannerScanned = (results: TextResult[]) => {
    console.table(results);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h3">Add Product</Typography>
      <FormControl required>
        <TextField
          label="Name"
          type="text"
          value={product.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </FormControl>
      <FormControl required>
        <TextField
          multiline
          maxRows={8}
          minRows={4}
          label="Detail"
          type="text"
          value={product.detail}
          onChange={(e) => handleInputChange("detail", e.target.value)}
        />
      </FormControl>
      <FormControl required>
        <TextField
          label="Colour"
          type="text"
          value={product.colour}
          onChange={(e) => handleInputChange("colour", e.target.value)}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Variant"
          type="text"
          value={product.variant}
          onChange={(e) => handleInputChange("variant", e.target.value)}
        />
      </FormControl>
      <FormControl required>
        <TextField
          label="Unit Buy Price"
          type="number"
          value={product.unitBuyPrice}
          onChange={(e) => handleInputChange("unitBuyPrice", e.target.value)}
        />
      </FormControl>
      <FormControl required>
        <TextField
          label="Unit Sell Price"
          type="number"
          value={product.unitSellPrice}
          onChange={(e) => handleInputChange("unitSellPrice", e.target.value)}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Unit Descount Prince"
          type="number"
          value={product.unitDescountPrice}
          onChange={(e) =>
            handleInputChange("unitDescountPrice", e.target.value)
          }
        />
      </FormControl>
      <FormControl required>
        <TextField
          label="Quantity"
          type="number"
          value={product.quantity}
          onChange={(e) => handleInputChange("quantity", e.target.value)}
        />
      </FormControl>
      <MyBarcodeScanner
        active={scannerActive}
        onClicked={onScanerClicked}
        onScanned={onScannerScanned}
      />
      <FormControl required>
        <TextField
          label="Serial"
          type="text"
          value={product.serialNumber}
          onChange={(e) => handleInputChange("serialNumber", e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleScanner}>
                  <ScannerOutlined />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
      <Button onClick={handleSubmit}>Submit</Button>
    </Stack>
  );
};

export const InventoryItemList = () => {
  const [context, dispatch] = useAppContext();
  const [list, setList] = useState<IInventory[]>([]);
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  useEffect(() => {
    !!context.branch?._id &&
      Inventory.list(context.branch?._id)
        .then((l) => setList(l))
        .catch((error) => console.error(error));
    return () => setList([]);
  }, [context.branch,]);

  const handleAdd = () => {
    dispatch({
      action: "OPEN_POPUP",
      payload: {
        popupChild: <InventoryItemAdd onSuccess={onAddSuccess} />,
      },
    });
    return undefined;
  };

  const onAddSuccess = (inventory: IInventory) => {
    setList(
      prev => {
        const newState = prev.map(item => item.product?._id === inventory.product?._id ? inventory : item)
        const index = newState.indexOf(inventory)
        console.log(index, inventory)
        if (index < 0) {
          newState.push(inventory)
        }
        return newState
      }
    )
  }

  const handleEdit = (inventory: IInventory) => {
    dispatch({
      action: "OPEN_POPUP",
      payload: {
        popupChild: <InventoryItemAdd inventory={inventory} onSuccess={onAddSuccess} />
      }
    })
  }


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!context.branch)
    return (
      <FormHelperText error={true} sx={{ fontSize: 24 }}>
        Please Select Branch
      </FormHelperText>
    );

  return (
    <Stack spacing={2}>
      {list.length < 1 && "No Data Found"}
      <TableContainer sx={{ height: "50vh" }} >
        <Table stickyHeader={true}>
          <TableHead>
            <TableRow>
              <TableCell>Serial</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Colour</TableCell>
              <TableCell>Variant</TableCell>
              <TableCell>Detail</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody key="inventory.views.list.tablebody">
            {list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((inventoryItem, index) => (
              <TableRow
                key={`inventory.views.list.tablebody-${inventoryItem.product?._id ?? ""
                  }`}
              >
                <TableCell
                  key={`inventory.views.list.tablebody-${inventoryItem.product?._id ?? ""
                    }-serial${inventoryItem.product?.serialNumber ?? index.toString()
                    }`}
                >
                  {inventoryItem.product?.serialNumber}
                </TableCell>
                <TableCell
                  key={`inventory.views.list.tablebody-${inventoryItem.product?._id ?? ""
                    }-name${inventoryItem.product?.name ?? index.toString()}`}
                >
                  {inventoryItem.product?.name}
                </TableCell>
                <TableCell
                  key={`inventory.views.list.tablebody-${inventoryItem.product?._id ?? ""
                    }-colour${inventoryItem.product?.colour ?? index.toString()}`}
                >
                  {inventoryItem.product?.colour}
                </TableCell>
                <TableCell
                  key={`inventory.views.list.tablebody-${inventoryItem.product?._id ?? ""
                    }-variant${inventoryItem.product?.variant ?? index.toString()
                    }`}
                >
                  {inventoryItem.product?.variant}
                </TableCell>
                <TableCell
                  key={`inventory.views.list.tablebody-${inventoryItem.product?._id ?? ""
                    }-detail${inventoryItem.product?.detail ?? index.toString()}`}
                >
                  {inventoryItem.product?.detail}
                </TableCell>
                <TableCell
                  key={`inventory.views.list.tablebody-${inventoryItem.product?._id ?? ""
                    }-detail${inventoryItem.product?.detail ?? index.toString()}-operations`}
                >
                  <IconButton color="primary" onClick={() => handleEdit(inventoryItem)} ><EditOutlined /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
        component="div"
        count={list.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <MyFab
        label="Add Product"
        onClick={handleAdd}
        startIcon={<AddShoppingCartOutlined />}
      />
    </Stack>
  );
};
