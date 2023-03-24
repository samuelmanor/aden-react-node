import React, { useState, useEffect } from "react";

function CalRow({ id, calArr, handleUpdateEvent }) {
    const [hover, setHover] = useState(false);
    const [eventText, setEventText] = useState('');
    const [editingState, setEditingState] = useState(false);

    const calStyle = {
        normal: {
            cursor: 'pointer',
            fontSize: 15,
            display: 'flex',
            alignItems: 'center'
        },

        hover: {
            backgroundColor: 'rgba(219, 210, 195, 0.5)'
        },

        event: {
            marginLeft: 10,
            width: 200,
            minHeight: 20
        },

        input: {
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: 15,
            width: 150
        }, 

        button: {
            border: 'none',
            backgroundColor: 'transparent',
            fontSize: 15,
            cursor: 'pointer'
        }
    };

    function updateEvent() {
        handleUpdateEvent(id, eventText);
        setEditingState(false);
    };

    useEffect(() => {
        if (calArr) {
            const obj = calArr.find(e => e.time === id);
            obj ? setEventText(obj.event) : setEventText('');
        };
    }, [calArr, id]);

    useEffect(() => {
        const input = document.getElementById('event-input');
        if (input) {
            input.focus();
        };
    }, [editingState]);

    return (
        <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ ...calStyle.normal, ...(hover ? calStyle.hover : null)}}>
            <p>{id % 3 === 0 || id === 0 ? id : '-'}</p>
            {editingState
            ?
            <div>
                <input id='event-input' maxLength='20' value={eventText} onChange={(e) => setEventText(e.target.value)} style={{ ...calStyle.event, ...calStyle.input }} />
                <button style={calStyle.button} onClick={updateEvent}>save</button>
            </div>
            :
            <div style={calStyle.event} onClick={() => setEditingState(true)}>{eventText}</div>}
        </div>
    );
};

export default CalRow;