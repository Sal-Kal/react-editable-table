import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTableData } from "../redux/tableDataSlice";
import EditIcon from "@mui/icons-material/Edit";
import { CircularProgress } from "@mui/material";
import EditModal from "./EditModal";

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

const ConfigTable = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.tableData);
  const [modalState, setModalState] = useState(false);
  const [editRow, setEditRow] = useState({});

  const handleOpen = (row) => {
    setEditRow(row);
    setModalState(true);
  };
  const handleClose = () => setModalState(false);

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

  try {
    return (
      <div>
        <div
          style={{
            overflowX: "auto",
            overflowY: "auto",
            marginInline: "auto",
            marginBlock: "3rem",
            width: "98%",
            borderRadius: "10px",
            border: "2px solid black",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          <table className="config-table">
            <thead>
              <tr>
                {attributeNames.map((atr, id) => (
                  <th style={{ paddingInline: "0.5rem" }} key={id} id={atr}>
                    {capitalizeFirst(atr)}
                  </th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>
              {data.map((item) => (
                <tr key={item.id}>
                  {attributeNames.map((atr, id) => (
                    <td style={{ padding: "0.5rem" }} key={id}>
                      {item[atr] == null ? "null" : item[atr]}
                    </td>
                  ))}
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleOpen(item)}
                    >
                      <EditIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <EditModal
          openState={modalState}
          closeModal={handleClose}
          row={editRow}
        />
      </div>
    );
  } catch (error) {
    return <div>{error}</div>;
  }
};

export default ConfigTable;
