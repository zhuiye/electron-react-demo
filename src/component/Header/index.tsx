import React from 'react';

import styles from './header.module.css';
import IconGroup from './IconGroup';

function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.dragZone} />
      <IconGroup />
    </div>
  );
}

export default Header;
