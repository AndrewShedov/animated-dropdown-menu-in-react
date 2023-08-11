import styles from "./menu.module.css";
import { useState, useEffect, useRef } from "react";
import Kitten from "../svg/kitten/index";
export default function Menu() {
  const [showMenu, setShowMenu] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const showMenuButton = (Visibility) => {
    if (Visibility) {
      setShowMenu(true);
    } else {
      setFadeOut(true);
    }
  };
  const menuRef = useRef();
  // Click outside the menu
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
      <div className={styles.menu} onClick={() => showMenuButton(!showMenu)}>
        <Kitten />
      </div>
      {showMenu && (
        <div
          ref={menuRef}
          className={
            fadeOut
              ? `${styles.menu_list} ${styles.menu_listFadeOut}`
              : `${styles.menu_list}`
          }
          onAnimationEnd={(e) => {
            if (e.animationName === styles.fadeOut) {
              setShowMenu(false);
              setFadeOut(false);
            }
          }}
        >
          <a>My profile</a>
          <a>Settings</a>
          <a>Exit</a>
        </div>
      )}
    </div>
  );
}
