import { makeStyles } from "@material-ui/core";
import { Drawer as DrawerMui } from "@material-ui/core";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Link from "next/link";

import Button from "./button";

const drawerWidth = 275;

const useStyles = makeStyles({
  drawer: {
    flexShrink: 0,
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
});

interface Link {
  text: string;
  link: string;
}

interface Props {
  open: boolean;
  toggleDrawer: (e: any) => void;
  ListItems: Link[];
}

const Drawer: React.FC<Props> = ({ open, toggleDrawer, ListItems }) => {
  const classes = useStyles();

  return (
    <DrawerMui
      className={classes.drawer}
      variant="temporary"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="right"
      open={open}
      onClose={toggleDrawer}
    >
      <List className={classes.list}>
        {ListItems.map((item) => (
          <Link href={item.link} key={item.text} passHref>
            <ListItem style={{ textAlign: "center" }} button>
              <ListItemText primary={item.text} />
            </ListItem>
          </Link>
        ))}
        <Divider style={{ marginBottom: 15 }} />

        <Button>Sign Up</Button>
      </List>
    </DrawerMui>
  );
};

export default Drawer;
