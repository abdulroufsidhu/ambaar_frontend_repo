import {
  FormControl,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IInventory, IProduct, Inventory } from "../../shared/models/inventory";
import useAppContext from "../../shared/hooks/app-context";
import { useState, useEffect, useMemo, useReducer } from "react";
import { MyFab } from "../../shared/components/buttons";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";

export const InventoryItemAdd = () => {
  const [product, setProduct] = useState<IProduct>({});
  const [context, dispatch] = useAppContext();

  const handleInputChange = (field: keyof IProduct, value: any) => {
    setProduct((prevInput) => ({
      ...prevInput,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    Inventory.add({ product, branch: context.branch?._id }).catch((error) =>
      console.error(error)
    );
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
      <FormControl required>
        <TextField
          label="Serial"
          type="text"
          value={product.serialNumber}
          onChange={(e) => handleInputChange("serialNumber", e.target.value)}
        />
      </FormControl>
      <Button onClick={handleSubmit}>Submit</Button>
    </Stack>
  );
};

export const InventoryItemList = () => {
  const [context, dispatch] = useAppContext();
  const [list, setList] = useState<IInventory[]>([]);
  useEffect(() => {
    !!context.branch?._id &&
      Inventory.list(context.branch?._id)
        .then((l) => setList(l))
        .catch((error) => console.error(error));
    return () => setList([]);
  }, [context.branch]);

  const handleAdd = () => {
    dispatch({
      action: "OPEN_POPUP",
      payload: {
        popupChild: <InventoryItemAdd />,
      },
    });
    return undefined;
  };

  console.log(list);

  return (
    <Stack spacing={2}>
      <List>
        {list.map((InventoryItem) => (
          <ListItem>
            <ListItemText
              primary={InventoryItem.product?.name}
              secondary={
                <>
                  {InventoryItem.product?.colour} <br />
                  {InventoryItem.product?.unitSellPrice}
                  <br />
                  {InventoryItem.product?.unitDescountPrice} <br />
                </>
              }
              prefix={InventoryItem.product?.quantity?.toString() ?? ""}
            />
          </ListItem>
        ))}
      </List>
      <MyFab
        label="Add Product"
        onClick={handleAdd}
        startIcon={<AddShoppingCartOutlined />}
      />
    </Stack>
  );
};
