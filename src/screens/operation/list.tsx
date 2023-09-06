import React from "react";
import { IOperation } from "../../shared/models/operation";
import { MyDataTable } from "../../shared/components/my-data-table";
import { useState } from "react";
import { removeObjectProperties } from "../../shared/utils/object-properties-remover";
import { IconButton } from "@mui/material";
import { printReciept } from "../../shared/utils/printer";
import useAppContext from "../../shared/hooks/app-context";
import { PrintOutlined } from "@mui/icons-material";

export const OperationList = ({ list }: { list: IOperation[] }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handlePageChange = (event: unknown, newPage: number) =>
    setPage(newPage);

  const handleRowsPerPageChange = (number: number) => setRowsPerPage(number);

  const handlePrint = (printable: IOperation) => {
    printReciept(printable)
  };

  const printableObject = list.map((item) => {
    if (!item.inventory) return {};
    if (!item.inventory.product) return {};
    if (!item.person) return {};
    const prod = removeObjectProperties(item.inventory.product, ["_id"]);
    const inv = removeObjectProperties(item.inventory, [
      "_id",
      "product",
      "branch",
    ]);
    const per = removeObjectProperties(item.person, ["_id"]);
    const op = removeObjectProperties(item, [
      "inventory",
      "employee",
      "person",
    ]);
    const i = {
      ...prod,
      person: per.name,
      ...per,
      ...inv,
      ...op,
      actions: (
        <>
          <IconButton onClick={() => handlePrint(item)} >
            <PrintOutlined color="success" />
          </IconButton>
        </>
      ),
    };
    return i;
  });

  return (
    <MyDataTable<IOperation>
      data={printableObject}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      page={page}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[5, 10, 25, 50, 100]}
    />
  );
};
