import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "components/button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Select, MenuItem, FormControl } from "@material-ui/core";
import CardContent from "@mui/material/CardContent";
import { CardActions } from "@mui/material";
import InputUI from "components/input";

import { paymentMethod } from "../data";

const useStyles = makeStyles((theme) => {
  return {
    card: {
      minHeight: "28.125rem",
      width: "100%",
      padding: "2rem 0",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "25px",
      overflow: "visible",

      "&:after": {
        content: "''",
        position: "absolute",
        top: "-2rem",
        left: "-3rem",
        backgroundColor: "#e9f6ff",
        width: "100%",
        height: "100%",
        borderRadius: "25px",
        transform: "rotate(-5deg)",
        zIndex: "-1",

        [theme.breakpoints.down("sm")]: {
          display: "none",
        },
      },
    },

    cardContent: {
      display: "grid",
      gap: "1.5625rem",
    },

    select: {
      padding: "0.6rem 1rem",
      border: `1px solid ${theme.palette.grey[100]}`,
      borderRadius: "20px",
    },

    img: {
      maxWidth: "1.5rem",
    },

    option: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "1rem",
    },

    button: {
      width: "100%",
      margin: 0,
    },
  };
});

interface Props {
  currencies: string[];
  rates: {
    merchant: object[];
  };
}

const App: React.FC<Props> = ({ currencies, rates }) => {
  const classes = useStyles();
  const router = useRouter();

  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");
  const [paycurrency, setPaycurrency] = useState<string>("EUR");
  const [buycurrency, setButcurrency] = useState<string>("BTC");

  const onPayInputHandler = (input1: string) => {
    let rate =
      rates.merchant[paycurrency.toUpperCase()][buycurrency.toUpperCase()];
    let input2 = +input1 * rate;

    // and here is a workaround in case the "rate" wasn't found in the first object "paycurrency"
    if (!rate) {
      rate =
        rates.merchant[buycurrency.toUpperCase()][paycurrency.toUpperCase()];
      input2 = +input1 / rate;
    }

    setInput2(input2.toFixed(8));
    setInput1(input1);
  };

  const onBuyInputHandler = (input2: string) => {
    let rate =
      rates.merchant[buycurrency.toUpperCase()][paycurrency.toUpperCase()];
    let input1 = +input2 * rate;

    // and here is a workaround in case the "rate" wasn't found in the first object "paycurrency"
    if (!rate) {
      rate =
        rates.merchant[paycurrency.toUpperCase()][buycurrency.toUpperCase()];
      input1 = +input2 / rate;
    }

    setInput1(input1.toFixed(8));
    setInput2(input2);
  };

  const onPayCurrencyHandler = (paycurrency: string) => {
    let rate =
      rates.merchant[paycurrency.toUpperCase()][buycurrency.toUpperCase()];
    let input2 = +input1 * rate;

    // and here is a workaround in case the "rate" wasn't found in the first object "paycurrency"
    if (!rate) {
      rate =
        rates.merchant[buycurrency.toUpperCase()][paycurrency.toUpperCase()];
      input2 = +input1 / rate;
    }
    setInput2(input2.toFixed(8));
    setPaycurrency(paycurrency);
  };

  const onBuyCurrencyHandler = (buycurrency: string) => {
    let rate =
      rates.merchant[buycurrency.toUpperCase()][paycurrency.toUpperCase()];
    let input1 = +input2 * rate;

    // and here is a workaround in case the "rate" wasn't found in the first object "paycurrency"
    if (!rate) {
      rate =
        rates.merchant[paycurrency.toUpperCase()][buycurrency.toUpperCase()];
      input1 = +input2 / rate;
    }

    setInput1(input1.toFixed(8));
    setButcurrency(buycurrency);
  };

  return (
    <Card className={classes.card}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          width: "100%",
        }}
      >
        <CardContent
          sx={{
            padding: "0 1.5rem",
            paddingTop: "1rem",
          }}
          className={classes.cardContent}
        >
          <InputUI
            label={"Pay"}
            options={currencies}
            inputValue={input1}
            selectValue={paycurrency}
            onInputChange={onPayInputHandler}
            onCurrencyChange={onPayCurrencyHandler}
            autoFocus
          />

          <InputUI
            label={"Buy"}
            options={currencies}
            inputValue={input2}
            selectValue={buycurrency}
            onInputChange={onBuyInputHandler}
            onCurrencyChange={onBuyCurrencyHandler}
          />

          <Typography>Payment method</Typography>
          <FormControl className={classes.select}>
            <Select
              disableUnderline
              defaultValue={paymentMethod[0].value}
              IconComponent={KeyboardArrowDownIcon}
            >
              {paymentMethod.map((payment) => {
                return (
                  <MenuItem
                    className={classes.option}
                    value={payment.value}
                    key={payment.id}
                  >
                    {payment.icon}
                    {payment.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </CardContent>

        <CardActions
          sx={{
            padding: "0 1.5rem",
            paddingTop: "2rem",
          }}
        >
          <Button
            onClick={() => router.push("/authenticate")}
            className={classes.button}
            disabled={!input1 || !input2 ? true : false}
          >
            Buy {buycurrency}
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};

export default App;
