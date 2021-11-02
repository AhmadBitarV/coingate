import { useEffect, useState } from "react";
import axios from "axios";
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
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const useStyles = makeStyles((theme) => {
  return {
    card: {
      minHeight: "28.125rem",
      width: "100%",
      padding: "2rem 1rem",
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

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

const payments = [
  {
    name: "Paypal",
    icon: <AccountBalanceIcon />,
    value: "paypal",
    id: "1",
  },

  {
    name: "Credit Card",
    icon: <CreditCardIcon />,
    value: "creditCard",
    id: "2",
  },

  {
    name: "Bank Transfer",
    icon: <LocalAtmIcon />,
    value: "bankTransfer",
    id: "3",
  },
];

const App: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();

  const [loaded, setLoaded] = useState<boolean>(false);
  const [amount1, setAmount1] = useState<number | undefined>();
  const [amount2, setAmount2] = useState<number | undefined>();
  const [currency1, setCurrency1] = useState<string>("EUR");
  const [currency2, setCurrency2] = useState<string>("USD");
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [rates, setRates] = useState<string[]>([]);

  useEffect(() => {
    axios.get("https://api.coingate.com/v2/rates").then((res: any) => {
      setRates(res.data.merchant);
      setCurrencies(Object.keys(res.data.merchant));
      setLoaded(true);

      console.log(res.data);
    });
  }, []);

  const onAmountOneChangeHandler = (amount1: number) => {
    const result =
      amount1 * rates[currency1.toUpperCase()][currency2.toUpperCase()];
    setAmount2(+result.toFixed(2));
    setAmount1(amount1);
  };

  const onAmountTwoChangeHandler = (amount2: number) => {
    const result =
      amount2 * rates[currency2.toUpperCase()][currency1.toUpperCase()];
    setAmount1(+result.toFixed(2));
    setAmount2(amount2);
  };

  const onSelectOneHandler = (currency1: string) => {
    let result = 0;
    if (amount1) {
      result =
        amount1 * rates[currency1.toUpperCase()][currency2.toUpperCase()];
    }

    setAmount2(+result.toFixed(2));
    setCurrency1(currency1);
  };

  const onSelectTwoHandler = (currency2: string) => {
    let result = 0;
    if (amount2) {
      amount2 * rates[currency2.toUpperCase()][currency1.toUpperCase()];
    }
    setAmount1(+result.toFixed(2));
    setCurrency2(currency2);
  };

  return (
    <Card
      sx={{ borderRadius: "25px", overflow: "visible" }}
      className={classes.card}
    >
      {loaded ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            width: "100%",
          }}
        >
          <CardContent
            sx={{ paddingTop: "1rem" }}
            className={classes.cardContent}
          >
            <InputUI
              label={"Pay"}
              options={currencies}
              inputValue={amount1}
              selectValue={currency1}
              onInputChange={onAmountOneChangeHandler}
              onCurrencyChange={onSelectOneHandler}
              autoFocus
            />

            <InputUI
              label={"Buy"}
              options={currencies}
              inputValue={amount2}
              selectValue={currency2}
              onInputChange={onAmountTwoChangeHandler}
              onCurrencyChange={onSelectTwoHandler}
            />

            <Typography>Payment method</Typography>
            <FormControl className={classes.select}>
              <Select
                disableUnderline
                defaultValue={payments[0].value}
                IconComponent={KeyboardArrowDownIcon}
              >
                {payments.map((payment) => {
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
              paddingTop: "2rem",
            }}
          >
            <Button
              onClick={() => router.push("/authenticate")}
              className={classes.button}
              disabled={!amount1 || !amount2 ? true : false}
            >
              Buy {currency2}
            </Button>
          </CardActions>
        </div>
      ) : (
        <Box>
          <CircularProgress />
        </Box>
      )}
    </Card>
  );
};

export default App;
