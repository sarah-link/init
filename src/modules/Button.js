import React from "react";
import {Link} from 'react-router-dom'

function Button(props) {
    return(
        <Link to={props.url} className={props.className}>
            {props.text}
        </Link>
    )
}

export default Button;