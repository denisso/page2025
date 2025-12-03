import { Link } from "@/shared/ui/Link";
import styles from "./Nav.module.css";

export const Navigation = () => {
  return (
    <div className={styles.nav}>
      <Link href="/">Home</Link>
      <Link href="/posts">Posts</Link>
    </div>
  );
};
