import React from "react";
import Link from "next/link";
import cn from "clsx";
import { HeaderProps } from "./Header.props";
import styles from "./Header.module.scss";

export const Header = ({}: HeaderProps): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerBody}>
          <Link href="/">
            <a className={styles.logo}>Code Knowledge Test</a>
          </Link>

          <div
            onClick={toggleMobileMenu}
            className={cn(styles.headerBurger, {
              [styles.active]: isMobileMenuOpen,
            })}
          >
            <span></span>
          </div>

          <nav
            className={cn(styles.headerMenu, {
              [styles.headerMenuActive]: isMobileMenuOpen,
            })}
          >
            <ul>
              <li>
                <Link href="/questions">
                  <a className={styles.link}>All Questions</a>
                </Link>
              </li>
              <li>
                <Link href="/test">
                  <a className={styles.link}>Test</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
    </>
  );
};
