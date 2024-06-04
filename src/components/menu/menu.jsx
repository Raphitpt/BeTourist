import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Home, Plan, Location, Bookmarks } from "../../assets/icon/Icon";
import { Paper } from "@mui/material";
import { isIOS, isMobile } from "react-device-detect";

export default function LabelBottomNavigation() {
  const [value, setValue] = React.useState("home");
  const [paddingBottom, setPaddingBottom] = React.useState(0);

  React.useEffect(() => {
    if (isIOS && isMobile) {
      setPaddingBottom(3);
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: paddingBottom,
      }}
    >
      <BottomNavigation value={value} onChange={handleChange} className="">
        <BottomNavigationAction
          value="home"
          icon={
            value === "home" ? <Home fill="#252525" /> : <Home fill="#BEBEBE" />
          }
        />
        <BottomNavigationAction
          value="maps"
          icon={
            value === "maps" ? <Plan fill="#252525" /> : <Plan fill="#BEBEBE" />
          }
        />
        <BottomNavigationAction
          value="nearby"
          icon={
            value === "nearby" ? (
              <Location fill="#252525" />
            ) : (
              <Location fill="#BEBEBE" />
            )
          }
        />
        <BottomNavigationAction
          value="history"
          icon={
            value === "history" ? (
              <Bookmarks fill="#252525" />
            ) : (
              <Bookmarks fill="#BEBEBE" />
            )
          }
        />
      </BottomNavigation>
    </Paper>
  );
}
