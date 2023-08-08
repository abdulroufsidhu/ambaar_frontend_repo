import React from "react";
import { useState } from "react";
import { Item } from "../../shared/item";
import { Button, Container, Stack, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const navigate = useNavigate();

  const [item, setItem] = useState<Item>(() => {
    return {};
  });

  const setItemName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setItem((prev) => {
      return { ...prev, name: e.target.value };
    });
  const setItemDetails = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setItem((prev) => {
      return { ...prev, details: e.target.value };
    });
  const setItemVariant = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setItem((prev) => {
      return { ...prev, variant: e.target.value };
    });
  const setItemColour = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setItem((prev) => {
      return { ...prev, colour: e.target.value };
    });
  const setItemSerialNumber = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setItem((prev) => {
      return { ...prev, serialNumber: e.target.value };
    });

  return (
    <>
      <Stack marginY={2} spacing={2} flexWrap="wrap" useFlexGap>
        <Button
          onClick={() => navigate(-1)}
          sx={{ display: "flex", justifyContent: "start" }}
        >
          &#10092;
        </Button>
        <TextField
          label="Name*"
          onChange={(e) => setItemName(e)}
          value={item.name}
        />
        <TextField
          label="Details"
          onChange={(e) => setItemDetails(e)}
          value={item.name}
        />
        <TextField
          label="Variant*"
          onChange={(e) => setItemVariant(e)}
          value={item.name}
        />
        <TextField
          label="Colour"
          onChange={(e) => setItemColour(e)}
          value={item.name}
        />
        <TextField
          label="SerialNumber*"
          onChange={(e) => setItemSerialNumber(e)}
          value={item.name}
        />
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button variant="outlined" startIcon={"💾"}>
            {" "}
            Save{" "}
          </Button>
        </Container>
      </Stack>
    </>
  );
}

export default AddItem;
