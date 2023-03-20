import React, { useState, useEffect } from "react";
import ToDo from "./ToDo";

function Page({ page, pageService, setCurrentPage }) {
    const [toDoArr, setToDoArr] = useState({});
    const [editingState, setEditingState] = useState(false);
    const [entryText, setEntryText] = useState(page.entry);

    const pageStyle = {
        page: {
            width: 600,
            height: 590,
            // marginLeft: 20,
            // marginTop: 20,
            borderRadius: 15,
            backgroundColor: '#efece6'
        },

        dateBox: {
            backgroundColor: 'rgba(219, 210, 195, 0.5)',
            borderRadius: 15,
            width: 250,
            height: 110,
            marginLeft: 20,
            marginTop: 20,
            position: 'absolute'
        },

        toDo: {
            position: 'absolute',
            marginLeft: 280,
            marginTop: 20
        },

        entry: {
            position: 'absolute',
            border: '2px solid rgba(219, 210, 195)',
            borderRadius: 10,
            height: 340,
            width: 280,
            marginLeft: 280,
            marginTop: 150,
            padding: 10,
            backgroundColor: 'transparent',
            resize: 'none',
            fontSize: 17
        },

        button: {
            position: 'absolute',
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: 22,
            cursor: 'pointer',
            marginLeft: 520,
            marginTop: 478
        }
    };

    useEffect(() => {
        if (page) {
            setToDoArr(page.todos);
        }
    }, [page]);

    function handleUpdate(objId, keyToUpdate, newState) {
        const pageCopy = { ...page };
        const toDoToUpdate = pageCopy.todos.find(t => t.id === objId);

        if (keyToUpdate === 'task') {
            toDoToUpdate.task = newState;
            pageService.update(page.id, pageCopy)
                .then(res => setCurrentPage(res));
        } else if (keyToUpdate === 'state') {
            toDoToUpdate.completed = newState;
            pageService.update(page.id, pageCopy)
                .then(res => setCurrentPage(res));
        } else if (keyToUpdate === 'entry') {
            pageCopy.entry = newState;
            pageService.update(page.id, pageCopy)
                .then(res => setCurrentPage(res));
        };
    };

    useEffect(() => {
        const textArea = document.getElementById('text-area');
        if (textArea) {
            textArea.value = page.entry;
            textArea.focus();
        }
    }, [editingState, page.entry]);

    function handleTextChange() {
        const textArea = document.getElementById('text-area');
        setEntryText(textArea.value);
    };

    function updateEntry() {
        if (entryText === '') {
            setEntryText('lorem ipsum dolor sit amet');
        }
        handleUpdate(page.id, 'entry', entryText);
        setEditingState(false);
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

            {editingState ? 
                <div>
                    <textarea style={pageStyle.entry} id='text-area' maxLength='550' onInput={handleTextChange} />
                    <button style={pageStyle.button} onClick={updateEntry} >save</button>
                </div>
                : <p style={pageStyle.entry} onClick={() => setEditingState(true)} >{page.entry}</p>}

            <div style={pageStyle.toDo}>
                {mapToDos()}
            </div>
        </div>
    )
};

export default Page;