import React from "react";

function Page({ page }) {
    const pageStyle = {
        border: '1px solid black'
    }
    const dateBoxStyle = {
        color: 'green'
    };

    return (
        <div style={pageStyle}>
            <div style={dateBoxStyle}>
                <h2>{page.day}</h2>
                <h2>{page.month}</h2>
            </div>

            <p>{page.entry}</p>
            {/* <button onClick={() => console.log(currentPage)}>button</button> */}
        </div>
    )
};

export default Page;