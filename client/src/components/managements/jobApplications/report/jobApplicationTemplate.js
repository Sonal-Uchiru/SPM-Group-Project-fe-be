import React from 'react';


function JobApplicationTemplate({table1, color}) {
    return (
        <div>
            <center>
                <h1 style={{color: color}}>Hello</h1>
            </center>
            {
                table1.map((item) => {
                    return (
                        <tr>
                            <td>{item._id}</td>
                        </tr>
                    )
                })
            }
        </div>
    );
}

export default JobApplicationTemplate;