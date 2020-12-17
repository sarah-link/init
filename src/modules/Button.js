import React, {Fragment} from "react";
import {Link} from 'react-router-dom'

function Button(props) {
    let icon
    if (props.iconClassName) {
        icon = <div className={"button-icon"}><i className={props.iconClassName} /></div>
    }
    return(
        <Link to={props.url} className={props.className}>
            {icon}
            {props.text}
        </Link>
    )
}

export default Button;