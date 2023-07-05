import Switch from "@mui/material/Switch";

const ToggleSwitch = ({ input }) => {
  const handleChange = (event) => {
    input.onChange(event.target.checked ? 1 : 0);
  };

  return (
    <Switch
      checked={input.value === 1}
      onChange={handleChange}
      value={input.value === 1 ? "1" : "0"}
    />
  );
};

export default ToggleSwitch;
