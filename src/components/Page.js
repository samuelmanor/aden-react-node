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
        page: {
            width: 600,
            height: 600,
            marginLeft: 20,
            borderRadius: 15,
            backgroundColor: '#efece6',
        },

        dateBox: {
            backgroundColor: 'rgba(219, 210, 195, 0.5)',
            borderRadius: 15,
            width: 250,
            height: 110,
            marginLeft: 20,
            marginTop: 20,
            position: 'absolute',
        },

        toDo: {
            position: 'absolute',
            marginLeft: 280,
            marginTop: -12,
        },
    }

    function handleUpdate(taskId, k, newState) {
        const pageCopy = { ...page };
        const toDoToUpdate = pageCopy.todos.find(t => t.id === taskId);

        if (k === 'task') {
            toDoToUpdate.task = newState;
            pageService.update(page.id, pageCopy)
                .then(res => setCurrentPage(res));
        } else if (k === 'state') {
            toDoToUpdate.completed = newState;
            pageService.update(page.id, pageCopy)
                .then(res => setCurrentPage(res));
        };
    };

    function mapToDos() {
        return toDoArr?.map?.(obj => <ToDo key={obj.id} id={obj.id} task={obj.task} completed={obj.completed} handleUpdate={handleUpdate} />);
    };

    return (
        <div style={pageStyle.page}>
            <div style={pageStyle.dateBox}>
                <h2>{page.day}</h2>
                <h2>{page.month}</h2>
            </div>

            <p>{page.entry}</p>

            <div style={pageStyle.toDo}>
                {mapToDos()}
            </div>
        </div>
    )
};

export default Page;