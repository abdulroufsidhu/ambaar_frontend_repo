import {
  FormHelperText,
  IconButton,
  Stack,
} from "@mui/material";
import { IInventory, IProduct, Inventory } from "../../shared/models/inventory";
import useAppContext from "../../shared/hooks/app-context";
import { useState, useEffect, ReactNode } from "react";
import { MyFab } from "../../shared/components/buttons";
import {
  AddShoppingCartOutlined,
  EditOutlined,
  LoyaltyOutlined,
} from "@mui/icons-material";
import { MyDataTable } from "../../shared/components/my-data-table";
import { removeObjectProperties } from '../../shared/utils/object-properties-remover';
import { OperationAdd } from "../operation";
import { IOperation } from "../../shared/models/operation";
import { printReciept } from "../../shared/utils/printer";
import { InventoryItemAdd } from ".";


interface IProductActionable extends IProduct {
  serialNumber?: string;
  unitBuyPrice?: number;
  unitSellPrice?: number;
  unitDescountPrice?: number;
  quantity?: number;
  actions?: ReactNode;
}

export const InventoryItemList = () => {
  const [context, dispatch] = useAppContext();
  const [list, setList] = useState<IInventory[]>([]); // TODO remove this state and use Inventory.list instead
  const [products, setProducts] = useState<IProductActionable[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  useEffect(() => {
    !!context.branch?._id &&
      Inventory.fetch(context.branch?._id)
        .then((l) => l && setList(l))
        .catch((error) => { console.error(error); setList([]) });
    return () => setList([]);
  }, [context.branch]);

  useEffect(() => {
    setProducts(
      list
        .filter((item) => !!item.product)
        .map((item) => {
          const actionableProduct: IProductActionable = {
            ...item.product!,
            ...item,
            actions: (
              <>
                <IconButton onClick={() => handleSale(item)} color="success">
                  <LoyaltyOutlined />
                </IconButton>
                <IconButton onClick={() => handleEdit(item)} color="primary">
                  <EditOutlined />
                </IconButton>
              </>
            ),
          }
          const filteredObject = removeObjectProperties(actionableProduct, ["product", "branch"])
          return filteredObject;
        })
    );
    return () => setProducts([]);
  }, [list]);

  const handleAdd = () => {
    dispatch({
      action: "OPEN_POPUP",
      payload: {
        popupChild: <InventoryItemAdd onSuccess={onAddSuccess} />,
      },
    });
    return undefined;
  };

  const handleSaleSuccess = (item: IInventory, operation: IOperation) => {
    setList(prev =>
      prev.map(inv => inv._id === item._id ? { ...item, quantity: (inv.quantity ?? 0) - (operation.quantity ?? 0) } : inv)
    )
    printReciept(operation)
    dispatch({ action: "CLOSE_POPUP" })
  }

  const handleSale = (item: IInventory) => {
    dispatch({
      action: "OPEN_POPUP",
      payload: {
        popupChild: <OperationAdd inventory={item} onAddSuccess={(operation) => handleSaleSuccess(item, operation)} />
      }
    })
  }

  const onAddSuccess = (inventory: IInventory) => {
    setList((prev) => {
      const newState = prev.map((item) =>
        item.product?._id === inventory.product?._id ? inventory : item
      );
      const index = newState.indexOf(inventory);
      console.log(index, inventory);
      if (index < 0) {
        newState.push(inventory);
      }
      return newState;
    });
  };

  const handleEdit = (inventory: IInventory) => {
    dispatch({
      action: "OPEN_POPUP",
      payload: {
        popupChild: (
          <InventoryItemAdd inventory={inventory} onSuccess={onAddSuccess} />
        ),
      },
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (number: number) => {
    setRowsPerPage(number);
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
      <MyDataTable<IProductActionable>
        data={products}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
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
