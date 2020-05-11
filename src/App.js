import React from 'react';
import './App.css';

function NavBar() {
    return(
        <header className={"app-navbar"} >
            <div>
                <Button text={"Sign Up"} className={"navbar-button"} />
                <Button text={"Log In"} className={"navbar-button"} />
            </div>
            <SideNav />

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

function IconButton(props) {
    return (
            <svg id="menu-button" width="40" height="40" viewBox="0 0 20 20" onClick={props.onClick}
                 xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z"
                      clip-rule="evenodd"/>
            </svg>
    )
}

class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false}
    }
    toggleSidebar() {
        console.log("hek")
        if (this.state.isOpen == true) {
            document.getElementById("mySidenav").style.left = "0px";
            document.getElementById("mySidenav").style.boxShadow = "0px 0px 50px rgba(0,0,0,0.5)";
            document.getElementById("menu-button").style.left = "405px";
            document.getElementById("menu-button").style.fill = "#EFFCF6";
            document.getElementById("menu-button").style.transform = "rotate(180deg)";
        } else {
            document.getElementById("mySidenav").style.left = "-450px";
            document.getElementById("mySidenav").style.boxShadow = "0px 0px 20px rgba(0,0,0,0)";
            document.getElementById("menu-button").style.left = "5px";
            document.getElementById("menu-button").style.fill = "#147D64";
            document.getElementById("menu-button").style.transform = "rotate(0deg)";
        }
        this.setState({isOpen: !this.state.isOpen})
    }
    render() {
        return (
            <div id={"mySidenav"}>
                <IconButton className={"navbar-button"} onClick={() => this.toggleSidebar()} />
            </div>

        )
    }
}

function App() {
    return (
        <div className="App">
            <NavBar />
            <div className="App-body">
                <div className="App-header">
                    <h1>
                        <b>rollinit</b>
                    </h1>

                    <h4>
                        A better way to roll initiative or something idk
                    </h4>
                </div>

                <Button text={"CREATE ENCOUNTER"} className={"main-button"} />
                <Button text={"MANAGE LIBRARY"} className={"main-button"} />
                <Button text={"JOIN ENCOUNTER"} className={"main-button"} />
            </div>
        </div>
    );
}



export default App;
