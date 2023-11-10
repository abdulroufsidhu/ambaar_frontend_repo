import { IInventory } from "../../shared/models/inventory";
import useAppContext from "../../shared/hooks/app-context";
import { IOperation, Operation } from "../../shared/models/operation";
import { useState } from "react";
import {
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {User} from "../../shared/models/user";
import { printReciept } from "../../shared/utils/printer";

interface OperationAddProps {
  inventory: IInventory;
  onAddSuccess: (operation: IOperation) => void
}

export const OperationAdd = ({ inventory, onAddSuccess }: OperationAddProps) => {
  const [context, contextDispatch] = useAppContext();
  const [operation, setOperation] = useState<IOperation>({
    employee: User.getInstance().jobs?.filter(
      (j) => j.branch?._id === context.branch?._id
    )[0],
    inventory,
    action: "sale",
  });

  const updatePerson = (key: string, value: string) =>
    setOperation((prev) => {
      return { ...prev, person: { ...prev.person, [key]: value } };
    });
  const updateOperation = (key: string, value: string) =>
    setOperation((prev) => {
      return { ...prev, [key]: value };
    });

  const handleSubmit = () => {
    console.log("operation", operation);
    Operation.add({ ...operation }).then((res) => {
      res.data && onAddSuccess(res.data)
    }
    ).catch(error => console.error(error));
    return undefined;
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h3">Customer Info</Typography>
      <FormControl required>
        <TextField
          label="Name"
          type="text"
          value={operation.person?.name}
          onChange={(e) => updatePerson("name", e.target.value)}
        />
      </FormControl>
      <FormControl required>
        <TextField
          label="Contact"
          type="tel"
          value={operation.person?.contact}
          onChange={(e) => updatePerson("contact", e.target.value)}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="National Id"
          type="tel"
          value={operation.person?.nationalId}
          onChange={(e) => updatePerson("nationalId", e.target.value)}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Quantity"
          type="number"
          value={operation.quantity}
          onChange={(e) => updateOperation("quantity", e.target.value)}
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Price"
          type="number"
          value={operation.price}
          onChange={(e) => updateOperation("price", e.target.value)}
        />
      </FormControl>
      <Button onClick={handleSubmit}> Submit </Button>
    </Stack>
  );
};
