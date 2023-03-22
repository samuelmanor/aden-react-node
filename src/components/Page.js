import React, { useState, useEffect } from "react";
import CalRow from "./CalRow";
import ToDo from "./ToDo";

function Page({ page, pageService, setCurrentPage }) {
    const [toDoArr, setToDoArr] = useState({});
    const [calArr, setCalArr] = useState([]);
    const [editingState, setEditingState] = useState(false);
    const [entryText, setEntryText] = useState(page.entry);

    const pageStyle = {
        page: {
            width: 600,
            height: 590,
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
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            gap: 20,
            fontSize: 40,
            alignItems: 'center',
        },

        month: {
            fontSize: 40,
            borderRight: '5px solid rgba(219, 210, 195)',
            paddingRight: 20
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
            height: 400,
            width: 280,
            marginLeft: 280,
            marginTop: 150,
            padding: 10,
            backgroundColor: 'transparent',
            resize: 'none',
            fontSize: 17,
        },

        button: {
            position: 'absolute',
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: 22,
            cursor: 'pointer',
            marginLeft: 520,
            marginTop: 478
        },

        cal: {
            position: 'absolute',
            width: 220,
            height: 420,
            paddingLeft: 10,
            paddingRight: 10,
            marginTop: 150,
            marginLeft: 20,
            borderRight: '2px solid rgba(219, 210, 195)',
            overflow: 'scroll',
        }
    };

    useEffect(() => {
        if (page) {
            setToDoArr(page.todos);
            setCalArr(page.events);
        };
    }, [page]);

    useEffect(() => {
        const textArea = document.getElementById('text-area');
        if (textArea) {
            textArea.value = page.entry;
            textArea.focus();
        }
    }, [editingState, page.entry]);

    function handleUpdateTask(id, state) {
        const pageCopy = { ...page };
        const toUpdate = pageCopy.todos.find(t => t.id === id);

        if (typeof state === 'string') {
            toUpdate.task = state;
        } else if (typeof state === 'boolean') {
            toUpdate.completed = state;
        };

        pageService.update(page.id, pageCopy)
            .then(res => setCurrentPage(res));
    };

    function handleUpdateEntry(state) {
        const pageCopy = { ...page };
        pageCopy.entry = state;

        pageService.update(page.id, pageCopy)
            .then(res => setCurrentPage(res));
    };

    function handleUpdateEvent(id, state) {
        const pageCopy = { ...page };
        const toUpdate = pageCopy.events.find(e => e.time === id);

        if (state === '') {
            toUpdate.event = state;
            const filteredEvents = pageCopy.events.filter(obj => obj.event !== '');
            pageCopy.events = filteredEvents;
            
            
            pageService.update(page.id, pageCopy)
                .then(res => setCurrentPage(res));
                return;
        };
        
        if (toUpdate) {
            toUpdate.event = state;

            pageService.update(page.id, pageCopy)
                .then(res => setCurrentPage(res));
        } else {
            const newEvent = {"time": id, "event": state, "id": pageCopy.events.length + 1};
            const newArr = pageCopy.events.concat(newEvent);
            pageCopy.events = newArr;

            pageService.update(page.id, pageCopy)
                .then(res => setCurrentPage(res));
        };
    };

    function handleTextChange() {
        const textArea = document.getElementById('text-area');
        setEntryText(textArea.value);
    };

    function updateEntry() {
        if (entryText === '') {
            setEntryText('lorem ipsum dolor sit amet');
        }
        handleUpdateEntry(entryText);
        setEditingState(false);
    };

    function createToDos() {
        return toDoArr?.map?.(obj => <ToDo key={obj.id} id={obj.id} task={obj.task} completed={obj.completed} handleUpdateTask={handleUpdateTask} />);
    };

    function createCalEvents() {
        const nums = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3];
        return nums.map(n => <CalRow key={n} id={n} calArr={calArr} handleUpdateEvent={handleUpdateEvent} />);
    };

    return (
        <div style={pageStyle.page}>
            <div style={pageStyle.dateBox}>
                <h2 style={pageStyle.month}>{page.month}</h2>
                <h2>{page.day}</h2>
            </div>

            {editingState ? 
                <div>
                    <textarea style={pageStyle.entry} id='text-area' maxLength='550' onInput={handleTextChange} />
                    <button style={pageStyle.button} onClick={updateEntry}>save</button>
                </div>
                : <p style={pageStyle.entry} onClick={() => setEditingState(true)} >{page.entry}</p>}

            <div style={pageStyle.toDo}>
                {createToDos()}
            </div>

            <div style={pageStyle.cal}>
                {createCalEvents()}
            </div>
        </div>
    )
};

export default Page;