import React from 'react';
import styles from './NoteItem.module.css'

function NoteItem({ short, label, color }) {
  return (
    <li className={styles['noteItem']}>
      <div className={styles['circle']} style={{ backgroundColor: color }}>
        {short}
      </div>
      <div className={styles['groupName']}>
        {label}
      </div>
    </li>
  );
}

export default NoteItem;
