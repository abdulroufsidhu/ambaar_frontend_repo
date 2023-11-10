import {
  FormControl,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IInventory,  Inventory } from "../../shared/models/inventory";
import useAppContext from "../../shared/hooks/app-context";
import { useState,  } from "react";
import {
  ScannerOutlined,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { MyBarcodeScanner } from "../../shared/components/barcode-scanner";
import { TextResult } from "dynamsoft-javascript-barcode";

interface ItemAddProp {
  inventory?: IInventory;
  onSuccess?: (inventory: IInventory) => void;
}

export const InventoryItemAdd = ({ inventory, onSuccess }: ItemAddProp) => {
  const [scannerActive, setScannerActive] = useState<boolean>(false);
  const [context, dispatch] = useAppContext();
  const [item, setItem] = useState<IInventory>(
    inventory ??
    ({
      product: {},
      branch: context.branch,
      serialNumber: "",
      unitBuyPrice: 0,
      unitSellPrice: 0,
      unitDescountPrice: 0,
      quantity: 1,
    } as IInventory)
  );

  const handleInputChange = (field: keyof IInventory, value: any) => {
    const nestedField: (keyof IInventory)[] = field.split(".") as (keyof IInventory)[];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    let actualValue = value;
    if (nestedField.length > 1) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      actualValue = {
        ...item[nestedField[0]],
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        [nestedField[1]]: value,
      };
    }
    setItem((prevInput) => ({
      ...prevInput,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      [nestedField[0]]: actualValue,
    }));
  };

  const handleSubmit = () => {
    if (inventory) {
      Inventory.update({ ...inventory, ...item })
        .then(() => !!onSuccess && onSuccess(item))
        .catch((error) => console.error(error));
    } else {
      Inventory.add({ ...item })
        .then((item) => !!onSuccess && item && onSuccess(item))
        .catch((error) => console.error(error));
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
          value={item.product?.name}
          onChange={(e) => handleInputChange("product.name", e.target.value)}
        />
      </FormControl>
      <FormControl required>
        <TextField
          multiline
          maxRows={8}
          minRows={4}
          label="Detail"
          type="text"
          value={item.product?.detail}
          onChange={(e) => handleInputChange("product.detail", e.target.value)}
        />
      </FormControl>
      <FormControl required>
        <TextField
          label="Colour"
          type="text"
          value={item.product?.colour}
          onChange={(e) => handleInputChange("product.colour", e.target.value)}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Variant"
          type="text"
          value={item.product?.variant}
          onChange={(e) => handleInputChange("product.variant", e.target.value)}
        />
      </FormControl>
      <FormControl required>
        <TextField
          label="Unit Buy Price"
          type="number"
          value={item.unitBuyPrice}
          onChange={(e) => handleInputChange("unitBuyPrice", e.target.value)}
        />
      </FormControl>
      <FormControl required>
        <TextField
          label="Unit Sell Price"
          type="number"
          value={item.unitSellPrice}
          onChange={(e) => handleInputChange("unitSellPrice", e.target.value)}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Unit Descount Prince"
          type="number"
          value={item.unitDescountPrice}
          onChange={(e) =>
            handleInputChange("unitDescountPrice", e.target.value)
          }
        />
      </FormControl>
      <FormControl required>
        <TextField
          label="Quantity"
          type="number"
          value={item.quantity}
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
          value={item.serialNumber}
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
      <Button onClick={handleSubmit}>{inventory ? "Update" : "Submit"}</Button>
    </Stack>
  );
};
