import { Link } from "@/shared/ui";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.link}>
      <Link href="/">Home</Link>
      <Link href="/posts">Home</Link>
    </header>
  );
};
