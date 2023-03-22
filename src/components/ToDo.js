import React, { useState, useEffect } from "react";

function ToDo({ id, task, completed, handleUpdateTask }) {
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
            cursor: 'pointer'
        },

        notDone: {
            height: 10,
            width: 10,
            borderRadius: 10,
            border: '5px solid rgba(219, 210, 195, 0.8)',
            marginLeft: 10,
            display: 'inline-block',
            cursor: 'pointer'
        },

        p: {
            display: 'inline-block',
            marginLeft: 10,
            marginTop: 0,
            borderBottom: '2px solid rgba(219, 210, 195, 0.8)',
            width: 200,
            fontSize: 17,
            minHeight: 20
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
            fontSize: 17
        },

        button: {
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: 18,
            cursor: 'pointer'
        }
    };

    function updateTask() {
        handleUpdateTask(id, taskText);
        setEditingState(false);
    };

    useEffect(() => {
        const input = document.getElementById('text-box');
        if (input) {
            input.focus();
        };
    }, [editingState]);

    useEffect(() => {
        setTaskText(task);
    }, [task])

    return (
        <div>
            {completed ? <div style={toDoStyle.done} onClick={() => handleUpdateTask(id, false)}></div> : <div style={toDoStyle.notDone} onClick={() => handleUpdateTask(id, true)}></div>}
            
            {editingState ? 
            <div style={toDoStyle.task}>
                <input style={toDoStyle.input} type='text' id='text-box' maxLength='25' value={taskText} onChange={(e) => setTaskText(e.target.value)} /> 
                <button style={toDoStyle.button} onClick={updateTask}>save</button>
            </div>
            : <p id='task-text' onClick={() => setEditingState(true)} style={toDoStyle.p}>{task}</p>}
        </div>
    );
};

export default ToDo;