import React, { useState } from "react";

function ToDo({ id, task, completed, handleUpdate }) {
    const [editingState, setEditingState] = useState(false);
    const [taskText, setTaskText] = useState(task);

    const toDoStyle = {
        done: {
            height: 20,
            width: 20,
            backgroundColor: 'rgba(219, 210, 195, 0.8)',
            borderRadius: 10,
            marginLeft: 10,
            display: 'inline-block',
            cursor: 'pointer',
        },

        notDone: {
            height: 10,
            width: 10,
            borderRadius: 10,
            border: '5px solid rgba(219, 210, 195, 0.8)',
            marginLeft: 10,
            display: 'inline-block',
            cursor: 'pointer',
        },

        p: {
            display: 'inline-block',
            marginTop: 0,
            marginLeft: 10,
            borderBottom: '2px solid rgba(219, 210, 195, 0.8)',
            width: 250,
            fontSize: 17,
        }
    };

    function updateTask() {
        handleUpdate(id, 'task', taskText);
        setEditingState(false);
    }

    return (
        <div>
            {completed ? <div style={toDoStyle.done}onClick={() => handleUpdate(id, 'state', false)}></div> : <div style={toDoStyle.notDone} onClick={() => handleUpdate(id, 'state', true)}></div>}
            {/* <p style={toDoStyle.p}>{task}</p> */}
            {editingState ? 
            <div>
                <input type='text' value={taskText} onChange={(e) => setTaskText(e.target.value)} /> 
                <button onClick={updateTask}>save</button>
            </div>
            : <p onClick={() => setEditingState(editingState => !editingState)} style={toDoStyle.p}>{task}</p>}
        </div>
    );
};

export default ToDo;