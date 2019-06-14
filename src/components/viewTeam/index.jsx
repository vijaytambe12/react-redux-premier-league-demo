import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Delete} from "../icons/Delete";

import {deleteTeam} from "../../actions";

import "./viewTeam.css";


class ViewTeam extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            teamDetails: {}
        };

        this.playerByID = this.playerByID.bind(this);
        this.deleteTeam = this.deleteTeam.bind(this);
    }

    componentDidMount() {

        let id = this.props.match.params.id;

        let filterTeams = this.props.allTeams.filter(teamObj => {
            return teamObj.id === Number.parseInt(id);
        });

        if (filterTeams.length > 0) {
            this.setState({teamDetails: filterTeams[0]})
        }

    }

    render() {
        console.log(this.state.teamDetails);
        if (!this.state.teamDetails.playerIDArray) {
            return <div> Loading </div>
        }

        const captain = this.playerByID(this.state.teamDetails.captainID);
        const viceCaptain = this.playerByID(this.state.teamDetails.viceCaptainID);
        const players = this.state.teamDetails.playerIDArray.map((item, index) => {
            if (item !== captain.id && item !== viceCaptain.id) {
                const player = this.playerByID(item);
                return <li key={index}>
                    <div className="player-row">
                        <div className='player-details-div'>
                             <span>
                            <img src={player.avatar} alt={player.name} className="avatar"/>
                        </span>
                            <span className="player-name">
                            {player.name}
                        </span>
                        </div>
                        <div className={"player-designation-div"}>
                        <span>
                            {this.state.teamDetails.captainID === player.id ? "Captain" : ""}
                        </span>
                            <span>
                            {this.state.teamDetails.viceCaptainID === player.id ? "Vice Captain" : ""}
                        </span>
                        </div>
                    </div>
                </li>
            }
        });
        return <div>
            <div className="home-header">
                <div className="title">
                    <h2>Team Details - {this.state.teamDetails.name}</h2>
                </div>
                <div className={"delete-div"}>
                    <Delete onClick={() => this.deleteTeam(this.state.teamDetails.id)}/>
                </div>
            </div>
            <div className={"add-player-table"}>
                <ul>
                    <li>
                        <div className="player-row">
                            <div className='player-details-div'>
                             <span>
                            <img src={captain.avatar} alt={captain.name} className="avatar"/>
                        </span>
                                <span className="player-name">
                            {captain.name}
                        </span>
                            </div>
                            <div className={"player-designation-div"}>
                        <span>
                           Captain
                        </span>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="player-row">
                            <div className='player-details-div'>
                             <span>
                            <img src={viceCaptain.avatar} alt={viceCaptain.name} className="avatar"/>
                        </span>
                                <span className="player-name">
                            {viceCaptain.name}
                        </span>
                            </div>
                            <div className={"player-designation-div"}>

                                <span>
                           Vice Captain
                        </span>
                            </div>
                        </div>
                    </li>
                    {players}
                </ul>
            </div>
        </div>
    }

    deleteTeam = (id) => {
        this.props.deleteTeam(id);
        this.props.history.push("/");
    };

    playerByID = (id) => {
        let result = this.props.allPlayers.filter(obj => {
            return obj.id === id
        });
        return result[0];
    };

}

const mapStateToProps = state => {
    return {
        allTeams: state.teams,
        allPlayers: state.masterPlayerData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        deleteTeam: (id) => dispatch(deleteTeam(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewTeam));
