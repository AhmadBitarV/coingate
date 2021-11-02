import styles from "./logo.module.scss";
import LogoIcon from "assets/logo.png";
import Image from "next/image";

const Logo = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginRight: "3rem" }}>
      <Image width={180} height={28} src={LogoIcon} alt="CoinGate Logo" />
    </div>
  );
};

export default Logo;
