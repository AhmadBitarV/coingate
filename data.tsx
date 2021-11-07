import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";

export const paymentMethod = [
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

export interface Links {
  text: string;
  link: string;
}

export const links = [
  { text: "Products", link: "/products" },
  { text: "Resources", link: "/resources" },
  { text: "Buy Instantly", link: "/buy-instantly" },
  { text: "Log In", link: "/authenticate" },
];
