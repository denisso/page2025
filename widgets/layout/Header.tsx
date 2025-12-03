import { Navigation } from "../Navigation/Nav";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.link}>
      <Navigation />
    </header>
  );
};
