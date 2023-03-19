import React, { useState, useEffect } from "react";
import ToDo from "./ToDo";

function Page({ page, pageService, setCurrentPage }) {
    const [toDoArr, setToDoArr] = useState({});

    useEffect(() => {
        if (page) {
            setToDoArr(page.todos);
        }
    }, [page]);

    const pageStyle = {
        width: 600,
        height: 600,
        marginLeft: 20,
        borderRadius: 15,

        backgroundColor: '#f7f5f2',
    }
    const dateBoxStyle = {
        backgroundColor: 'rgba(219, 210, 195, 0.5)',
        borderRadius: 15,
        width: 200,
        marginLeft: 20,
    };

    function mapToDos() {
        return toDoArr?.map?.(obj => <ToDo key={obj.id} id={obj.id} task={obj.task} completed={obj.completed} updateTask={updateTask} />);
    };

    function updateTask(taskId, k, newState) {
        const pageCopy = { ...page };

        if (k === 'task') {
            // for editing text content

        } else if (k === 'state') {
            const toDoToUpdate = pageCopy.todos.find(t => t.id === taskId);
            toDoToUpdate.completed = newState;
            pageService.update(page.id, pageCopy)
                .then(
                    setCurrentPage(pageCopy)
                )
        };
    };

    return (
        <div style={pageStyle}>
            <div style={dateBoxStyle}>
                <h2>{page.day}</h2>
                <h2>{page.month}</h2>
            </div>

            <p>{page.entry}</p>

            {mapToDos()}
        </div>
    )
};

export default Page;