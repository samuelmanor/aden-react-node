import React, { useState } from "react";
import ToDo from "./ToDo";

function Page({ page }) {
    const [toDoArr, setToDoArr] = useState(page.todos);

    const pageStyle = {
        // border: '1px solid black'
    }
    const dateBoxStyle = {
        // color: 'green'
    };

    const toDos = toDoArr.map(obj => (
        <ToDo key={obj.id} task={obj.task} completed={obj.completed} />
    ));

    return (
        <div style={pageStyle}>
            <div style={dateBoxStyle}>
                <h2>{page.day}</h2>
                <h2>{page.month}</h2>
            </div>

            <p>{page.entry}</p>

            {toDos}
            <button onClick={() => console.log(toDos)}>button</button>
        </div>
    )
};

export default Page;