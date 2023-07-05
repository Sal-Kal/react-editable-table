import * as React from "react";
import { useEffect, useState } from "react";
import { fetchTableData } from "../redux/tableDataSlice";
import { CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  attributes,
  details,
  booleans,
  capitalizeFirst,
} from "../utilities/tableUtils";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MaterialModal from "./MaterialModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const MaterialTable = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.tableData);
  const [modalState, setModalState] = useState(false);
  const [editRow, setEditRow] = useState({});

  const handleOpen = (row) => {
    setEditRow(row);
    setModalState(true);
  };
  const handleClose = () => setModalState(false);

  const Row = (props) => {
    const { row } = props;
    const [open, setOpen] = useState(false);
    return (
      <React.Fragment>
        <TableRow key={row.id}>
          {attributes.map((atr, id) => (
            <StyledTableCell>
              {booleans.includes(atr) ? (
                row[atr] === 0 ? (
                  <CancelIcon sx={{ color: " #0288d1" }} />
                ) : (
                  <CheckCircleIcon sx={{ color: "#01579b" }} />
                )
              ) : row[atr] === null || row[atr] === "" ? (
                "-"
              ) : (
                row[atr]
              )}
            </StyledTableCell>
          ))}
          <StyledTableCell>
            <Tooltip arrow>
              <IconButton onClick={() => setOpen((prevState) => !prevState)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </Tooltip>
          </StyledTableCell>
          <StyledTableCell>
            <Tooltip title="Edit">
              <IconButton onClick={() => handleOpen(row)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </StyledTableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={16}>
            <Collapse
              in={open}
              timeout="auto"
              unmountOnExit
              sx={{ backgroundColor: "#f3f3f3" }}
            >
              <Box sx={{ margin: 1 }}>
                <Table size="medium" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      {details.map((atr) => (
                        <TableCell>{capitalizeFirst(atr)}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      {details.map((atr, id) => (
                        <TableCell>
                          {booleans.includes(atr) ? (
                            row[atr] === 0 ? (
                              <CancelIcon sx={{ color: " #0288d1" }} />
                            ) : (
                              <CheckCircleIcon sx={{ color: "#01579b" }} />
                            )
                          ) : row[atr] === null || row[atr] === "" ? (
                            "-"
                          ) : (
                            row[atr]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  useEffect(() => {
    dispatch(fetchTableData());
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || data.length === 0) {
    return <div>No Data</div>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {attributes.map((atr) => (
                <StyledTableCell>{capitalizeFirst(atr)}</StyledTableCell>
              ))}
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <Row row={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MaterialModal
        openState={modalState}
        closeModal={handleClose}
        row={editRow}
      />
    </>
  );
};

export default MaterialTable;
