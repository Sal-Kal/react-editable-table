import * as React from "react";
import { useEffect, useState } from "react";
import { Form, Field, FormSpy } from "react-final-form";
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "../redux/tableDataSlice";
import createDecorator from "final-form-focus";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CheckBox from "@mui/material/Checkbox";
import ToggleSwitch from "./ToggleSwitch";
import AssetButtons from "./AssetButtons";

import {
  attributes,
  details,
  booleans,
  capitalizeFirst,
  groups,
} from "../utilities/tableUtils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  width: "60%",
  height: "75%",
  borderRadius: "0.4rem",
  scrollbarWidth: "none",
  p: 0,
  overflow: "auto",
};

const focusOnError = createDecorator();

const MaterialModal = ({ openState, closeModal, row }) => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.tableData);

  const updateTable = (values) => {
    const updatedData = data.map((item) => {
      if (item.id === values.id) {
        return values;
      } else {
        return item;
      }
    });
    dispatch(updateData(updatedData));
    closeModal();
  };

  return (
    <Modal open={openState} onClose={closeModal}>
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h4"
          component="h4"
          align="center"
          sx={{
            backgroundColor: "#01579b",
            color: "white",
            width: "100%",
            paddingInline: "3rem",
            paddingBlock: "1rem",
            position: "sticky",
            top: "0",
            zIndex: "1",
          }}
        >
          Edit Values:
        </Typography>
        <Form
          initialValues={row}
          onSubmit={updateTable}
          decorators={[focusOnError]}
        >
          {({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBlock: "2rem",
                  gap: "1rem",
                }}
              >
                {attributes.map((atr, id) => {
                  return (
                    <Box
                      sx={{
                        width: "60%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <label>{capitalizeFirst(atr)}</label>
                      <Field
                        name={atr}
                        component={
                          booleans.includes(atr)
                            ? ToggleSwitch
                            : groups.includes(atr)
                            ? AssetButtons
                            : "input"
                        }
                      />
                    </Box>
                  );
                })}
                {details.map((atr, id) => {
                  return (
                    <Box
                      sx={{
                        width: "60%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <label>{capitalizeFirst(atr)}</label>
                      <Field
                        name={atr}
                        component={
                          booleans.includes(atr) ? ToggleSwitch : "input"
                        }
                      />
                    </Box>
                  );
                })}
                <button type="submit" disabled={submitting}>
                  Submit
                </button>
                <pre>{JSON.stringify(values, undefined, 2)}</pre>
              </Box>
            </form>
          )}
        </Form>
      </Box>
    </Modal>
  );
};

export default MaterialModal;
