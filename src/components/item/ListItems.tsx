import {
  Box,
  Container,
  Divider,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Zoom,
} from "@mui/material";
import { InventoryItem } from "../../shared/InventoryItem";
import { useNavigate } from "react-router-dom";

const items: InventoryItem[] = [
  {
    item: {
      name: "yo",
    },
    quantity: 90,
  },
  {
    item: {
      name: "mon",
    },
    quantity: 90,
  },
  {
    item: {
      name: "biruther",
    },
    quantity: 90,
  },
  {
    item: {
      name: "yo",
    },
    quantity: 90,
  },
  {
    item: {
      name: "mon",
    },
    quantity: 90,
  },
  {
    item: {
      name: "biruther",
    },
    quantity: 90,
  },
  {
    item: {
      name: "yo",
    },
    quantity: 90,
  },
  {
    item: {
      name: "mon",
    },
    quantity: 90,
  },
  {
    item: {
      name: "biruther",
    },
    quantity: 90,
  },
];

function ListItems() {
  const navigate = useNavigate();

  const navigateTo = (path: string) => navigate(path);

  return (
    <Box>
      <List>
        {items.map((inventoryItem, index) => (
          <>
            <ListItem key={index} secondaryAction={inventoryItem.quantity}>
              <ListItemButton
                key={`${index}-list-item-button`}
                onClick={() => navigateTo(`/items/${index}`)}
              >
                <ListItemText
                  primary={inventoryItem.item.name}
                  key={`${index}-list-item-text`}
                />
              </ListItemButton>
            </ListItem>
            <Divider variant="middle" />
          </>
        ))}
      </List>
      <Container
        sx={{
          position: "sticky",
          bottom: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1rem",
        }}
      >
        <Fab
          aria-label="add"
          variant="extended"
          onClick={() => navigateTo("/items/add")}
        >
          Add Item
        </Fab>
      </Container>
    </Box>
  );
}

export default ListItems;
