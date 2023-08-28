import React from "react";
import { IOperation } from "../../shared/models/operation";
import { MyDataTable } from "../../shared/components/my-data-table";
import { useState } from 'react';

export const OperationList = ({list}:{list: IOperation[]}) => {
	const [page, setPage] = useState(1)
	const [rowsPerPage, setRowsPerPage] = useState(5)

	const handlePageChange = (event: unknown, newPage: number) =>
		setPage(newPage);

	const handleRowsPerPageChange = (number: number) => setRowsPerPage(number)

  return (
    <MyDataTable<IOperation>
      data={list}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      page={0}
      rowsPerPage={0}
      rowsPerPageOptions={[5,10,25,50,100]}
    />
  );
};
