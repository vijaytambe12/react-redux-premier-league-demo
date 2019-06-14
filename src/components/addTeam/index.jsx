import React from "react";
import {Button} from "../button";
import "./addTeam.css";
import {connect} from "react-redux";
import {addTeam} from "../../actions";
import {withRouter} from "react-router-dom";

class AddTeam extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id:0,
            playerIDArray: [],
            captainID: 0,
            viceCaptainID: 0,
            name: ''
        };

        this.togglePlayer = this.togglePlayer.bind(this);
        this.addPlayer = this.addPlayer.bind(this);
        this.removePlayer = this.removePlayer.bind(this);
        this.isPlayerInTeam = this.isPlayerInTeam.bind(this);
        this.makePlayerCaptain = this.makePlayerCaptain.bind(this);
        this.makePlayerViceCaptain = this.makePlayerViceCaptain.bind(this);
        this.nameChange = this.nameChange.bind(this);

    }

    render() {

        const {allPlayers} = this.props;

        console.log(this.state);
        const players = allPlayers.map((item, key) => {
            return (
                <li key={key}>
                    <div className="player-row">
                        <div className='player-details-div'>
                             <span>
                            <img src={item.avatar} alt={item.name} className="avatar"/>
                        </span>
                            <span className="player-name">
                            {item.name}
                        </span>
                        </div>
                        <div className="captain-div">
                            <div className="captain-div-options">
                                <div
                                    className={this.state.captainID === item.id ? "letter-circle letter-circle-active" : "letter-circle"}
                                    onClick={() => this.makePlayerCaptain(item.id)}>
                                    C
                                </div>
                                <div
                                    className={this.state.viceCaptainID === item.id ? "letter-circle letter-circle-active" : "letter-circle"}
                                    onClick={() => this.makePlayerViceCaptain(item.id)}>
                                    VC
                                </div>
                            </div>
                            <div className="checkbox-div">
                                <Button icon={this.isPlayerInTeam(item.id) ? "check" : "plus"} value={item.id}
                                        name={this.isPlayerInTeam(item.id) ? "Selected" : "Add"}
                                        onClick={() => this.togglePlayer(item.id)}/>
                            </div>
                        </div>
                    </div>
                </li>
            )
        });

        return <div className="add-team-main">
            <div className="home-header">
                <div className="title">
                    <h2>Create Team</h2>
                </div>
            </div>

            <div className="add-team-div">
                <div className="name-div">
                    <input placeholder={"Enter Name"} className={"input-text-box"} type={"text"} value={this.state.name} onChange={this.nameChange}/>
                </div>
                <div className="save-button-div">
                    <Button onClick={() => this.clickSave()} name={"Save Team"}/>
                </div>
            </div>
            <div className="info-div">
                {this.state.playerIDArray.length} Players selected, {11 - this.state.playerIDArray.length} to go.
            </div>
            <div className="add-player-table">
                <ul>
                    {players}
                </ul>
            </div>
        </div>
    }

    togglePlayer = (id) => {
        if (this.state.playerIDArray.includes(id)) {
            this.removePlayer(id);
            if (this.state.captainID === id) {
                this.setState({captainID:0});
            }

            if (this.state.viceCaptainID === id) {
                this.setState({viceCaptainID:0});
            }
        } else {
            this.addPlayer(id);
        }
    };

    addPlayer = (id) => {
        if (this.state.playerIDArray.length < 11) {
            this.setState(prevState => ({
                playerIDArray: [...prevState.playerIDArray, id]
            }));
        }
    };

    makePlayerCaptain = (id) => {
        if (this.state.playerIDArray.includes(id)) {
            if (this.state.viceCaptainID === id) {
                alert("Yeh already Vice Captain Hain na BRO..");
            } else {
                this.setState({captainID: id});
            }
        } else {
            alert("Isko Pehle add to kar");
        }
    };


    makePlayerViceCaptain = (id) => {
        if (this.state.playerIDArray.includes(id)) {

            if (this.state.captainID === id) {
                alert("Yeh already Captain Hain na BRO..");
            } else {
                this.setState({viceCaptainID: id});
            }
        } else {
            alert("Isko Pehle add to kar");

        }
    };

    removePlayer = (id) => {
        let array = [...this.state.playerIDArray];
        let index = array.indexOf(id);
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({playerIDArray: array});
        }
    };

    isPlayerInTeam = (id) => {
        return this.state.playerIDArray.includes(id)
    };

    clickSave = () => {
        if (this.state.playerIDArray.length < 11) {
            alert('Please select all 11 players.')
            return;
        }
        if (this.state.playerIDArray.length >= 11 && this.state.name !== "" && this.state.captainID > 0 && this.state.viceCaptainID > 0) {
            const text = this.state.name;
            const validateRegEX = /^([a-zA-Z]){3,15}$/;
            if (validateRegEX.test(text) === false) {
                alert("Team Name should have minimum 3 characters and max 15 characters. only Alphabets[A to Z and a to z] are allowed");
            } else {
                this.props.saveTeam(this.state);
                this.props.history.push("/");
            }


        } else  {
            alert("Please fill in all the fields");
        }

    };

    nameChange = (event) => {
        this.setState({name:event.target.value, id:this.props.allTeams.length + 1});
    }
}

const mapStateToProps = (state) => {
    return {
        allPlayers: state.masterPlayerData,
        allTeams: state.teams
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveTeam: (team) => dispatch(addTeam(team))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddTeam));
