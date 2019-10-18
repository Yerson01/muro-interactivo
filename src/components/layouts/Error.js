import React from 'react';

//styles
import '../../css/error.css';

const Error = ({message}) => {
    return (  
        <div className="alert alert-danger">
            <p>{message}</p>
        </div>
    );
}
 
export default Error;