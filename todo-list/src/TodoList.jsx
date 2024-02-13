import React, { useState, useEffect } from "react";

export default function TodoList(props) {
  const { onEdit, onSelect, seq, text, toggleCompleted, isClicked } = props;

  const [ isEdit, setEdit ] = useState(false);
  
  const [ eText, setEText ] = useState(text.text);

  const handleEdit = () => {
    if (isEdit) {
      onEdit(seq, eText);
    }
    setEdit(!isEdit);
  };

  useEffect(() => {
    if (isClicked) {
      const timeoutId = setTimeout(() => {
        setEdit(false);
      }, 1500); // Adjust the duration based on your animation
      return () => clearTimeout(timeoutId);
    }
  }, [isClicked]);

  return (
    <div className={`list ${isClicked ? 'animationClass' : ''} ${text.completed ? '' : 'completed'}`}>
      <li key={seq} style={{ textDecoration: text.completed ? 'line-through' : 'none' }}>
        {isEdit ? (
          <input
            type="text"
            value={eText}
            onChange={(e) => setEText(e.target.value)}
            onBlur={handleEdit}
            autoFocus
          />
        ) : (
          <>
            {text.task}
            <i
              className="fa-regular fa-trash-can"
              title="Delete"
              onClick={() => {
                onSelect(seq);
              }}
            ></i>
            <i
              className="fa-regular fa-pen-to-square"
              title="Edit"
              onClick={handleEdit}
            ></i>
            <i
              className="fa-regular fa-square-check"
              title="CheckBox"
              onClick={() => toggleCompleted(seq)}
            ></i>
          </>
        )}
      </li>
    </div>
  );
}
