import React, { useState, useEffect } from "react";

function CalRow({ id, calArr, handleUpdate }) {
    const [hover, setHover] = useState(false);
    const [eventText, setEventText] = useState('');

    const calStyle = {
        normal: {
            // margin: 0,
            cursor: 'pointer',
            fontSize: 15,
            display: 'flex'
        },

        hover: {
            backgroundColor: 'rgba(219, 210, 195, 0.5)',
        },

        event: {
            marginLeft: 10
        }
    };

    function updateEvent() {
        handleUpdate(id, 'event', eventText);
    };

    useEffect(() => {
        if (calArr) {
            const ev = calArr.map(e => e.time === id ? e.event : null);
            setEventText(ev[1]);
        };
    }, [calArr, id]);

    return (
        <div onClick={updateEvent} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ ...calStyle.normal, ...(hover ? calStyle.hover : null)}}>
            <p>{id % 3 === 0 || id === 0 ? id : '-'}</p>

            <p style={{ ...calStyle.normal, ...calStyle.event }}>{eventText}</p>
        </div>
    );
};

export default CalRow;