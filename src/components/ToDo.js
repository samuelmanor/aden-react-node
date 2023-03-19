import React, { useState, useEffect } from "react";

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
            width: 200,
            fontSize: 17,
        },

        task: {
            display: 'inline-block',
            marginLeft: 10,
            marginBottom: 16,
        },

        input: {
            border: 'none',
            borderBottom: '2px solid rgba(219, 210, 195, 0.8)',
            backgroundColor: 'transparent',
            width: 200,
            fontSize: 17,
        },

        button: {
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: 18,
        }
    };

    function updateTask() {
        handleUpdate(id, 'task', taskText);
        setEditingState(false);
    };

    useEffect(() => {
        const input = document.getElementById('text-box');
        if (input) {
            input.focus();
        }
    }, [editingState])

    return (
        <div>
            {completed ? <div style={toDoStyle.done}onClick={() => handleUpdate(id, 'state', false)}></div> : <div style={toDoStyle.notDone} onClick={() => handleUpdate(id, 'state', true)}></div>}
            
            {editingState ? 
            <div style={toDoStyle.task}>
                <input style={toDoStyle.input} type='text' id='text-box' value={taskText} onChange={(e) => setTaskText(e.target.value)} /> 
                <button style={toDoStyle.button} onClick={updateTask}>save</button>
            </div>
            : <p onClick={() => setEditingState(true)} style={toDoStyle.p}>{taskText === '' ? 'add new...' : task}</p>}
        </div>
    );
};

export default ToDo;