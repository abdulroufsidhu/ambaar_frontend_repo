import {
  Box,
  Container,
  Divider,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const items = [
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
      <List key="items-list">
        {items.map((inventoryItem, index) => (
          <>
            <ListItem
              key={`${index}-item-list-item`}
              secondaryAction={inventoryItem.quantity}
            >
              <ListItemButton
                key={`${index}-item-list-item-list-item-button`}
                onClick={() => navigateTo(`/items/${index}`)}
              >
                <ListItemText
                  key={`${index}-item-list-item-list-item-text`}
                  primary={inventoryItem.item.name}
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
