import React from "react";

function ToDo({ id, task, completed, updateTask }) {
    const toDoStyle = {
        // color: 'green'
    };

    return (
        <div>
            {completed ? <p onClick={() => updateTask(id, 'state', false)}>done</p> : <p onClick={() => updateTask(id, 'state', true)}>not done</p>}
            <p>{task}</p>
        </div>
    );
};

export default ToDo;