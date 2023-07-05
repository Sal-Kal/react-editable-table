import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { capitalizeFirst } from "./ConfigTable";
import { updateData } from "../redux/tableDataSlice";

const EditModal = ({ openState = false, closeModal, row }) => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.tableData);

  const [rowState, setRowState] = useState({});

  const attributeNames = Object.keys(data[0]);

  let modalRef = useRef(null);

  useEffect(() => {
    modalRef.current.scrollTo(0, 0);
    setRowState(row);
  }, [row]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRowState((prevRow) => ({
      ...prevRow,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const updateTable = () => {
    const updatedData = data.map((item) => {
      if (item.id === row.id) {
        return rowState;
      } else {
        return item;
      }
    });
    dispatch(updateData(updatedData));
    closeModal();
  };

  return (
    <dialog open={openState} className="edit-modal" ref={modalRef}>
      <h2
        style={{
          backgroundColor: "#009879",
          textAlign: "center",
          padding: "25px 0px",
          color: "white",
          width: "100%",
          position: "sticky",
          top: "0",
        }}
      >
        Edit Values:
      </h2>
      <div>
        <form style={{ marginTop: "2rem" }} onSubmit={handleSubmit}>
          {attributeNames.map((atr, id) => {
            if (atr === "id") return null;
            return (
              <div className="form-item" key={id}>
                <label htmlFor={atr}>{capitalizeFirst(atr)}</label>
                <input
                  type="text"
                  value={rowState[atr] == null ? "" : rowState[atr]}
                  name={atr}
                  style={{ width: "18rem", textAlign: "center" }}
                  onChange={handleChange}
                />
              </div>
            );
          })}
          <div className="form-item">
            <button className="form-button" onClick={updateTable}>
              Save
            </button>
            <button className="form-button" onClick={closeModal}>
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default EditModal;
