import { SearchOffOutlined, SearchOutlined } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
} from "@mui/material";
import { useState, useEffect, isValidElement } from "react";
import { isJSON } from "../utils/object-properties-remover";

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
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function splitArray<T>(arr: T[], chunkSize: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    result.push(chunk);
  }

  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const MyDataTable = <T extends Record<string, any>>({
  data,
  page,
  rowsPerPage,
  rowsPerPageOptions,
  onPageChange,
  onRowsPerPageChange,
}: MyDataTableProps<T>) => {
  const [filter, setFilter] = useState("");
  const [filterAttrib, setFilterAttrib] = useState("");
  const [tableData, setTableData] = useState(data);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [columns, setColumns] = useState<string[]>();

  useEffect(() => {
    setTableData(data);
  }, [data]);

  useEffect(() => {
    const excludedIdPatterns =
      /^(_)*(?:ID|CREATED_AT|UPDATED_AT|CREATEDAT|UPDATEDAT)$/i; // Match _id, __id, ID, Id, iD in a case-insensitive way
    setColumns((prev) =>
      tableData.length > 0
        ? Object.keys(data[0]).filter(
            (column) => !excludedIdPatterns.test(column)
          )
        : prev
    );
  }, [tableData, data]);

  const handleFilterAttribChange = (newValue: string) => {
    setFilterAttrib(newValue);
  };

  const handleFilterChange = (newValue: string) => {
    setFilter(newValue);
  };

  const applyFilter = () => {
    setSearchPerformed(true);
    setTableData(data.filter((item) => item[filterAttrib] == filter));
  };

  const cancelFilter = () => {
    setFilter("");
    setTableData(data);
    setSearchPerformed(false);
  };

  return (
    <>
      <Paper sx={{ m: 2, p: 2 }}>
        <Toolbar sx={{ mb: 2 }}>
          <Stack
            direction="row"
            flexWrap="wrap"
            sx={{ transitionDuration: "500ms" }}
          >
            <TextField
              sx={{ margin: 1 }}
              label="Filter"
              value={filter}
              onChange={(e) => handleFilterChange(e.target.value)}
              InputProps={{
                endAdornment: (
                  <>
                    {searchPerformed ? (
                      <IconButton onClick={cancelFilter}>
                        <SearchOffOutlined />
                      </IconButton>
                    ) : (
                      <IconButton onClick={applyFilter}>
                        <SearchOutlined />
                      </IconButton>
                    )}
                  </>
                ),
              }}
            />
            <FormControl sx={{ margin: 1 }}>
              <InputLabel id="attrib-selector-lable">Attribute</InputLabel>
              <Select
                sx={{ minWidth: "10rem" }}
                labelId="attrib-selector-lable"
                label="Attribute"
                value={filterAttrib}
                defaultValue={columns?.at(0)}
                onChange={(e) => handleFilterAttribChange(e.target.value)}
              >
                {columns?.map((name) => (
                  <MenuItem value={name}>{formatColumnName(name)}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Toolbar>
        {tableData.length > 0 ? (
          <>
            <TableContainer>
              <Table size="small" stickyHeader={true}>
                <TableHead>
                  <TableRow>
                    {columns?.map((column) => (
                      <TableCell
                        key={column}
                        sx={{
                          position:
                            column.toLowerCase().trim() === "actions"
                              ? "sticky"
                              : "relative",
                          right: 0,
                          top: 0,
                        }}
                      >
                        {formatColumnName(column)}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData &&
                    splitArray(tableData, rowsPerPage)[page]?.map(
                      (item, index) => {
                        return (
                          <TableRow key={index} sx={{ position: "relative" }}>
                            {columns?.map((key) => {
                              return (
                                <TableCell
                                  key={`${index}${key}`}
                                  sx={{
                                    p: 0,
                                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                                    position: isValidElement(item[key])
                                      ? "sticky"
                                      : "relative",
                                    right: 0,
                                    top: 0,
                                  }}
                                >
                                  <Paper
                                    sx={{
                                      px: 2,
                                      overflow: "auto",
                                      resize: "both",
                                      height: "5rem",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    {
                                      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                                      isJSON(item[key]) && !isValidElement(item[key])
                                        ? JSON.stringify(item[key])
                                        : item[key]
                                    }
                                  </Paper>
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      }
                    )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={rowsPerPageOptions}
              component="div"
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onPageChange}
              onRowsPerPageChange={(e) => onRowsPerPageChange(+e.target.value)}
            />
          </>
        ) : (
          "No Data Found"
        )}
      </Paper>
    </>
  );
};
