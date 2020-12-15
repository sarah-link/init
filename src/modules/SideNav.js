import React from "react";
import onClickOutside from "react-onclickoutside";

class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false}
    }
    handleClickOutside = () => {
        this.setState({isOpen: false})
    };
    toggleSidebar() {
        this.setState({isOpen: !this.state.isOpen})
    }
    render() {
        let collapseID = ''
        if (this.state.isOpen === true) {
            collapseID = "sidenav-expanded"
        } else {
            collapseID = "sidenav-collapsed"
        }

        return (
            <div className={"sidenav"} id={collapseID}>
                <i className={"eva eva-arrow-ios-forward navbar-button"} id={"menu-button"} onClick={() => this.toggleSidebar()} />
            </div>
        )
    }
}

const SideNavClickable = onClickOutside(SideNav);

export {SideNav, SideNavClickable}