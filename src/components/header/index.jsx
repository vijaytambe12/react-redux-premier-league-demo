import React from "react";
import "./header.css";
import logo from "./../../logo.png";
import {Button} from "../button";
import {withRouter} from "react-router-dom"


class Header extends React.Component {



    render() {
        return <div className='header-main one-edge-shadow'>
            <div className="logo-div">
                <img src={logo} alt={'Logo'} className="logo" onClick={() => this.goToHome()}/>
            </div>
            <div className='button-div'>
                <Button onClick={() => this.createNewTeam()} name={'Create New Team'}/>
            </div>
        </div>
    }

    createNewTeam = () => {
        this.props.history.push("/create-team");
    }

    goToHome = () => {
        this.props.history.push("/");
    }
}

export default withRouter(Header);
