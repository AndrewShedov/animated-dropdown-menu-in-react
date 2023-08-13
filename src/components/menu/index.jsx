import styles from "./Menu.module.css";
import { useState, useEffect, useRef } from "react";
import Kitten from "../SVG/Kitten";
export default function Menu() {
  const [showMenu, setShowMenu] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const buttonShowMenu = (Visibility) => {
    if (Visibility) {
      setShowMenu(true);
    } else {
      setFadeOut(true);
    }
  };
  // Click tracking outside the menu
  const menuRef = useRef();
  useEffect(() => {
    if (menuRef.current) {
      const handler = (e) => {
        if (!menuRef.current.contains(e.target)) {
          setFadeOut(true);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }
  });
  return (
    <div className={styles.menu_wrap}>
      <div
        className={styles.menu_button}
        onClick={() => buttonShowMenu(!showMenu)}
      >
        <Kitten />
      </div>
      {showMenu && (
        <div
          ref={menuRef}
          className={
            fadeOut
              ? `${styles.menu} ${styles.menu__fade_out}`
              : `${styles.menu}`
          }
          onAnimationEnd={(e) => {
            if (e.animationName === styles.fadeOut) {
              setShowMenu(false);
              setFadeOut(false);
            }
          }}
        >
          <ul className={styles.menu_list}>
            <li>My profile</li>
            <li>Settings</li>
            <li>Exit</li>
          </ul>
        </div>
      )}
    </div>
  );
}
