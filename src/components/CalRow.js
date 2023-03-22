import React, { useState, useEffect } from "react";

function CalRow({ id, calArr, handleUpdateEvent }) {
    // const [hover, setHover] = useState(false);
    // const [eventText, setEventText] = useState('');
    // const [editingState, setEditingState] = useState(false);

    const calStyle = {
        normal: {
            cursor: 'pointer',
            fontSize: 15,
            display: 'flex',
            alignItems: 'center'
        },

        hover: {
            backgroundColor: 'rgba(219, 210, 195, 0.5)',
        },

        event: {
            marginLeft: 10,
            width: 200,
        },

        input: {
            marginLeft: 10,
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: 15,
            width: 150,
        }, 

        button: {

        },

        placeholder: {
            color: 'transparent',
        }
    };

    // BUG: only event with latest time is shown (what the fuck)

    // function updateEvent() {
    //     handleUpdate(id, 'event', eventText);
    //     setEditingState(false);
    // };

    // useEffect(() => {
    //     if (calArr) {
    //         const ev = calArr.map(e => e.time === id ? e.event : '');
    //         setEventText(ev[1]);
    //     };

    //     const input = document.getElementById('event-input');
    //     if (input) {
    //         input.focus();
    //     };
    // }, [editingState, calArr, id]);

    // const placeholder = <p style={calStyle.placeholder}>__________</p>

    return (
        // <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ ...calStyle.normal, ...(hover ? calStyle.hover : null)}}>
        //     <p>{id % 3 === 0 || id === 0 ? id : '-'}</p>

        //     {editingState 
        //     ? <div>
        //         <input style={calStyle.input} id='event-input' maxLength='20' value={eventText} onChange={(e) => setEventText(e.target.value)} /> 
        //         <button style={calStyle.button} onClick={updateEvent}>save</button>
        //       </div>
        //     : <div onClick={() => setEditingState(true)} style={{ ...calStyle.normal, ...calStyle.event }}>{eventText !== '' ? eventText : placeholder}</div>}
        // </div>
        <div>

        </div>
    );
};

export default CalRow;