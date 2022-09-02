import React from 'react'
import '../css/notFoundPage.css'


export default function NotFoundPage() {

    return (
        <div className="not-found">
            <center>
                <img src="./../images/404.jpg" className="not-found-img" alt="Not-Found"/>

                <h1 className='oops'>Ooops!</h1>
                <h1 className='oops'>Page Not Found</h1>
            </center>
        </div>
    )
}
