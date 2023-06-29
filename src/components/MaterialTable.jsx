import * as React from "react";
import { useEffect, useState } from "react";
import { fetchTableData } from "../redux/tableDataSlice";
import { CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import { useSelector, useDispatch } from "react-redux";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// Capitalize Table Headings
export const capitalizeFirst = (str) => {
  let misc = str.replaceAll("_", " ");
  misc = misc.split(" ");
  let capitalized = misc.map((str) => {
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
  });
  return capitalized.join(" ");
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const attributes = [
  "enabled",
  "is_fiu",
  "license_start_date",
  "license_end_date",
  "allowed_ip_list_csv",
  "encryption_enabled",
  "computed_itypes",
  "use_custom_css_for_widgets",
  "plan_type",
  "api_level",
  "user_limit",
  "auto_update_limit",
  "asset_class_subscribed",
  "feature_subscribed_to",
];

const details = [
  "enc_key",
  "dec_key",
  "redirection_url",
  "widgets_subscribed",
  "send_invoice_mis_report",
  "invoice_type",
  "mis_frequency",
  "invoice_emails_csv",
  "callback_enabled",
  "autoupdate_callback_url",
  "statement_callback_url",
  "callback_headers_json",
  "transaction_callback_enabled",
  "max_months_of_data_to_fetch",
  "show_drill_down_category",
  "show_transfer_category",
];

const booleans = [
  "enabled",
  "is_fiu",
  "encryption_enabled",
  "use_custom_css_for_widgets",
  "send_invoice_mis_report",
  "callback_enabled",
  "transaction_callback_enabled",
  "show_drill_down_category",
  "show_transfer_category",
];

const Row = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  return <React.Fragment></React.Fragment>;
};

const MaterialTable = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.tableData);

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

  const attributeNames = Object.keys(data[0]);

  return (
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
            <>
              <TableRow key={item.id}>
                {attributes.map((atr, id) => (
                  <StyledTableCell>
                    {booleans.includes(atr) ? (
                      item[atr] === 0 ? (
                        <CancelIcon sx={{ color: "red" }} />
                      ) : (
                        <CheckCircleIcon sx={{ color: "green" }} />
                      )
                    ) : item[atr] === null || item[atr] === "" ? (
                      "null"
                    ) : (
                      item[atr]
                    )}
                  </StyledTableCell>
                ))}
                <StyledTableCell>
                  <Tooltip arrow>
                    <IconButton>
                      <KeyboardArrowDownIcon />
                    </IconButton>
                  </Tooltip>
                </StyledTableCell>
                <StyledTableCell>
                  <Tooltip title="Edit">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={16}
                >
                  <Collapse
                    in={true}
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
                                  item[atr] === 0 ? (
                                    <CancelIcon sx={{ color: "red" }} />
                                  ) : (
                                    <CheckCircleIcon sx={{ color: "green" }} />
                                  )
                                ) : item[atr] === null || item[atr] === "" ? (
                                  "null"
                                ) : (
                                  item[atr]
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
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MaterialTable;
