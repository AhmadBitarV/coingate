import { makeStyles } from "@material-ui/core/styles";
import { Select, MenuItem, FormControl, TextField } from "@material-ui/core";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import ada from "assets/icons/ada.svg";
import btc from "assets/icons/btc.svg";
import eth from "assets/icons/eth.svg";
import ltc from "assets/icons/ltc.svg";
import euro from "assets/icons/euro.png";

export const icons = [
  { name: "btc", link: btc },
  { name: "ltc", link: ltc },
  { name: "eth", link: eth },
  { name: "ada", link: ada },
  { name: "eur", link: euro },
];

const useStyles = makeStyles((theme) => {
  return {
    container: {
      border: `1px solid ${theme.palette.grey[100]}`,
    },

    notchedOutline: {
      border: "none",
    },

    grid: {
      justifyContent: "space-between",
      alignItems: "center",
    },

    icon: {
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      alignItems: "center",
      border: `1px solid ${theme.palette.grey[200]}`,
      borderRadius: "20px",
    },

    select: {
      minWidth: "75px",
    },

    input: {
      "&&& $input": {
        padding: "1px",
      },
    },

    option: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "1rem",
    },
  };
});

interface InputProps {
  inputValue: string;
  selectValue: string;
  options: string[];
  type?: "cash" | "crypto";
  label: string;
  onInputChange: (ev: any) => void;
  onCurrencyChange: (ev: any) => void;
  autoFocus?: boolean;
}

const InputFunc: React.FC<InputProps> = (props) => {
  const classes = useStyles();
  return (
    <Box
      className={classes.container}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      paddingX={2}
      borderRadius={6}
    >
      <Typography variant="body2" component="p">
        {props.label}
      </Typography>
      <TextField
        className={classes.input}
        type="number"
        autoFocus={props.autoFocus}
        value={props.inputValue}
        variant="outlined"
        InputProps={{
          classes: {
            notchedOutline: classes.notchedOutline,
          },
        }}
        onChange={(ev) => props.onInputChange(ev.target.value)}
      />

      <Divider variant="middle" orientation="vertical" flexItem />

      <FormControl
        style={{
          minWidth: "100px",
        }}
      >
        <Select
          disableUnderline
          IconComponent={KeyboardArrowDownIcon}
          onChange={(ev) => props.onCurrencyChange(ev.target.value)}
          value={props.selectValue}
        >
          {props.options.map((option) => {
            let icon = null;

            let targetedIcon = icons.find((icon) => {
              return icon.name === option.toLowerCase();
            });

            if (targetedIcon?.link) {
              icon = targetedIcon.link;
            } else {
              icon = icons[0].link;
            }

            return (
              <MenuItem key={option} className={classes.option} value={option}>
                <Image width={24} height={24} src={icon} alt="currency icon" />
                {option}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default InputFunc;
