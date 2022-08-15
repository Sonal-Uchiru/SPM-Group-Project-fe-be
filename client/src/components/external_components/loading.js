import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => (
    <div className="d-flex justify-content-center mt-5">
        <ReactLoading type={"spinningBubbles"} color={"#1363DF"} height={"50px"} width={"50px"}/>
    </div>
);

export default Loading;