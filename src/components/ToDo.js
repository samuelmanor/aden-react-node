import React from "react";

function ToDo({ task, completed }) {
    const toDoStyle = {
        // color: 'green'
    }
    return (
        <div>
            {completed ? <p>done</p> : <p>not done</p>}
            <p>{task}</p>
        </div>
    );
};

export default ToDo;