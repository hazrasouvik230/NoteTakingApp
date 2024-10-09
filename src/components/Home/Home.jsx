import React, { useState } from 'react';
import Content from '../Content/Content';
import SideBar from '../SideBar/SideBar';
import styles from './Home.module.css'

function Home() {
  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <div className={styles['home']}>
      <SideBar onGroupSelect={setSelectedGroup} />
      <Content selectedGroup={selectedGroup} />
    </div>
  );
}

export default Home;