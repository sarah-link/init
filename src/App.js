import React from 'react';
import logo from './logo.svg';
import './App.css';

class HamburgerMenu extends React.Component {
    render() {
        return (
            <div></div>
        )
    }
}

function Header() {
    return(
        <header className={"app-header"} >
            <Button text={"Sign Up"} className={"header-button"} />
            <Button text={"Log In"} className={"header-button"} />
        </header>
    )
}

function Button(props) {
    return(
        <a className={props.className} href="/">
            {props.text}
        </a>
    )
}


function App() {
    return (
        <div className="App">
            <Header />
            <div className="App-body">
                <h1>
                    <b>init</b>
                </h1>

                <h4>
                    A better way to roll initiative or something idk
                </h4>

                <Button text={"CREATE ENCOUNTER"} className={"main-button"} />
                <Button text={"MANAGE LIBRARY"} className={"main-button"} />
            </div>
        </div>
    );
}

export default App;
