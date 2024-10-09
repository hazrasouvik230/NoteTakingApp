import React, { useState } from 'react';
import styles from './GroupModal.module.css'

function GroupModal({ onClose, onSave }) {
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  
  const colors = ['#d1a8ff', '#ff95c5', '#69f0ff', '#ffbeaa', '#337aff', '#87aaff'];

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modalBackground') {
      onClose();
    }
  };

  const handleSave = () => {
    if (groupName.trim() && selectedColor) {
      onSave({ name: groupName, color: selectedColor });
      setGroupName('');
      onClose();
    }
  };

  return (
    <div id="modalBackground" className={styles['modalOverlay']} onClick={handleOutsideClick}>
      <div className={styles['model']}>
      <p className={styles['title']}>Create New group</p>
        
      <div className={styles['inputGroup']}>
          <label>Group Name</label>
          <input
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className={styles['groupName']}
          />
      </div>
      
      <div className={styles['colorPicker']}>
          <label>Choose Color</label>
          <div className={styles['colorOptions']}>
            {colors.map((color, index) => (
              <div
                key={index}
                onClick={() => setSelectedColor(color)}
                className={styles['colorCircles']}
                style={{
                  backgroundColor: color,
                  border: selectedColor === color ? '2px solid #000' : 'none'
                }}
              />
            ))}
          </div>
        </div>
        <div className={styles['btn']}>
          <button onClick={handleSave} className={styles['createBtn']}>Create</button>
        </div>
      </div>
    </div>
  );
}

export default GroupModal;