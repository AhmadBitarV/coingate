import { Button as ButtonMui } from "@material-ui/core";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    button: {
      borderRadius: "5px 50px 50px 50px",
      color: `${theme.palette.common.white}`,
      backgroundColor: `${theme.palette.secondary.main}`,
      textTransform: "capitalize",
      fontWeight: theme.typography.body1.fontWeight,
      padding: "0.8em 2em",
      boxShadow: "none",
      fontSize: theme.typography.body1.fontSize,

      "&:hover": {
        backgroundColor: `${theme.palette.secondary.main}`,
        boxShadow: `0 0 1rem ${theme.palette.secondary.main}`,
      },
    },
  };
});

interface Props {
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  children,
  onClick,
  href,
  className,
  disabled,
}) => {
  const classes = useStyles();

  return (
    <ButtonMui
      className={`${classes.button} ${className}`}
      variant="contained"
      href={href}
      onClick={onClick}
      endIcon={<KeyboardArrowRightIcon color="inherit" />}
      color="primary"
      disabled={disabled}
    >
      {children}
    </ButtonMui>
  );
};

export default Button;
