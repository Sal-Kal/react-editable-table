import Box from "@mui/material/Box";
import MaterialTable from "./components/MaterialTable";
import "./App.css";

const App = () => {
  return (
    <Box sx={{ marginInline: "auto", width: "95%", marginBlock: "3rem" }}>
      <MaterialTable />
    </Box>
  );
};

export default App;
