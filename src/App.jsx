import ConfigTable from "./components/ConfigTable";
// import EditModal from "./components/EditModal";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <ConfigTable />
      </div>
      {/* <EditModal /> */}
    </Provider>
  );
};

export default App;
