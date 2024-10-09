import React, { useState, useEffect } from 'react';
import NoteItem from '../NoteItem/NoteItem';
import GroupModal from '../GroupModal/GroupModal';
import styles from './SideBar.module.css'

function Sidebar({ onGroupSelect }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setGroups(storedGroups);
  }, []);

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const addGroup = (newGroup) => {
    setGroups([...groups, newGroup]);
  };

  const getGroupInitials = (name) => {
    const words = name.trim().split(' ');
    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <div className={styles['sideBar']}>
      <h1 className={styles['heading']}>Pocket Notes</h1>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {groups.map((group, index) => (
          <li key={index} onClick={() => onGroupSelect(group)}>
            <NoteItem
              short={getGroupInitials(group.name)}
              label={group.name}
              color={group.color}
            />
          </li>
        ))}
      </ul>
      <button onClick={openModal} className={styles['addBtn']}>+</button>
      {isModalOpen && <GroupModal onClose={closeModal} onSave={addGroup} />}
    </div>
  );
}

export default Sidebar;