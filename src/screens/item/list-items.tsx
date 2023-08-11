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
    </Box>
  );
}

export default ListItems;