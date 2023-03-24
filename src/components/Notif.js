import React from "react";

function Notif({ id, day, month, show, setShow, deletePage }) {
    const notifStyle = {
        div: {
            position: 'absolute',
            backgroundColor: '#394a41',
            borderRadius: 10,
            marginLeft: 60,
            marginTop: 200,
            padding: 30,
            height: 140,
            width: 440,
            color: 'white',
            fontSize: 20,
            textAlign: 'center'
        },

        confirm: {
            display: 'flex',
            justifyContent: 'center',
            gap: 40
        },

        button: {
            backgroundColor: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: 30,
            cursor: 'pointer'
        }
    };

    if (show === false) {
        return null;
    };

    function handleNo() {
        setShow(false);
    };

    function handleYes() {
        deletePage(id);
        setShow(false);
    };

    return (
        <div style={notifStyle.div}>
            <p>are you sure you want to delete the page for {month}.{day}?</p>
            <p>this action can't be undone.</p>

            <div style={notifStyle.confirm}>
                <button style={notifStyle.button} onClick={handleYes}>yes</button>
                <button style={notifStyle.button} onClick={handleNo}>no</button>
            </div>
        </div>
    );
};

export default Notif;