import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  groups,
  assetClasses,
  computedItypes,
  features,
} from "../utilities/tableUtils";
import { useEffect, useState } from "react";

const AssetButtons = ({ input }) => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    setAssets(input.value.split(","));
  }, []);

  const handleAssets = (event, newAsset) => {
    if (newAsset.length) {
      setAssets(newAsset);
      input.onChange(newAsset.join(","));
    } else {
      setAssets([]);
      input.onChange("");
    }
  };
  return (
    <ToggleButtonGroup
      value={assets}
      onChange={handleAssets}
      aria-label="device"
    >
      {input.name === "computed_itypes"
        ? computedItypes.map((asset) => {
            return <ToggleButton value={asset}>{asset}</ToggleButton>;
          })
        : input.name === "asset_class_subscribed"
        ? assetClasses.map((asset) => {
            return <ToggleButton value={asset}>{asset}</ToggleButton>;
          })
        : input.name === "feature_subscribed_to"
        ? features.map((asset) => {
            return <ToggleButton value={asset}>{asset}</ToggleButton>;
          })
        : null}
    </ToggleButtonGroup>
  );
};

export default AssetButtons;
