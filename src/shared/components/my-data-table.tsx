import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

interface MyDataTableProps<T> {
  data: T[];
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (number: number) => void;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
}

const formatColumnName = (columnName: string): string => {
  // Convert "serial_number", "serialNumber", "SerialNumber" to "Serial Number"
  return columnName
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const MyDataTable = <T extends Record<string, any>>({
  data,
  page,
  rowsPerPage,
  rowsPerPageOptions,
  onPageChange,
  onRowsPerPageChange,
}: MyDataTableProps<T>) => {
  if (data.length === 0) {
    return <div>No data available.</div>;
  }

  const excludedIdPatterns = /^(_)*(?:ID|CREATED_AT|UPDATED_AT|CREATEDAT|UPDATEDAT)$/i; // Match _id, __id, ID, Id, iD in a case-insensitive way

  const columns = Object.keys(data[0]).filter(column => !excludedIdPatterns.test(column));

  return (
    <>
      <TableContainer>
        <Table stickyHeader={true}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{formatColumnName(column)}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => {
              return (
                <TableRow key={index}>
                  {columns.map((key) => {
                    return <TableCell key={`${index}${key}`}>{item[key]}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={(e) => onRowsPerPageChange(+e.target.value)}
      />
    </>
  );
};
