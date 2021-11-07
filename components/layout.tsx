import Drawer from "components/drawer";
import Header from "components/header";
import { makeStyles } from "@material-ui/core";

import { useState } from "react";

import { links } from "data";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    },

    layout: {
      flexGrow: 1,
      display: "flex",
      justifyContent: "center",
      color: "red",
    },

    header: {
      width: "100%",
      display: "flex",
      gap: "2rem",
    },

    wrapper: {
      width: "100%",
    },

    grow: {
      flexGrow: 1,
    },

    link: {
      fontWeight: theme.typography.body1.fontWeight,
      fontSize: theme.typography.body1.fontSize,
      color: theme.palette.grey[200],
      textTransform: "capitalize",
      transition: "all 0.2s",

      "&:hover": {
        color: theme.palette.common.black,
        background: "none",
      },
    },
  };
});

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  // SideDrawer logic
  const [open, setOpen] = useState(false);
  const toggleDrawer = (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <Header onClick={toggleDrawer} links={links} />
      <Drawer ListItems={links} open={open} toggleDrawer={toggleDrawer} />
      <div className={classes.layout}>{children}</div>
    </div>
  );
};

export default Layout;
