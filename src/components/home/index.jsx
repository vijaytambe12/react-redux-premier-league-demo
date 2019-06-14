import React from "react";
import "./home.css"
import {Delete} from "../icons/Delete";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

import {deleteTeam} from "../../actions";

class Home extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            searchText: ""
        };

        this.playerByID = this.playerByID.bind();
        this.searchDivChange = this.searchDivChange.bind();
        this.goToDetailsPage = this.goToDetailsPage.bind();
        this.deleteTeam = this.deleteTeam.bind();
    }


    render() {
        let results = [];
        if (this.state.searchText !== "") {
            results = this.props.teams.filter(obj => {
                return obj.name.includes(this.state.searchText);
            });
        } else  {
            results = this.props.teams;
        }


        const teamsDisplay = results.map((item, index) => {
            return <div className="team-card" key={index} onClick={() => this.goToDetailsPage(item.id)}>
                <div className="title">
                    <h4>{item.name}</h4>
                </div>
                <div className="description">
                    <div className="sub-heading">
                        <span>C:</span> {this.playerByID(item.captainID).name}
                    </div>
                    <div className="sub-heading">
                        <span>VC: </span> {this.playerByID(item.viceCaptainID).name}
                    </div>
                </div>
                <div className="delete-button">
                    <Delete onClick={(e) => {
                        this.deleteTeam(e, item.id);
                    }}/>
                </div>
            </div>
        });
        return <div className="home-main">
            <div className="home-header">
                <div className="title">
                    <h2>My Teams</h2>
                </div>
                <div className="search-div">
                    <form>
                        <input className={"input-text-box"} type={'text'} placeholder={"Please Search For Teams"}
                               onChange={this.searchDivChange}/>
                    </form>
                </div>
            </div>

            <div className="home-content">
                {teamsDisplay}
            </div>

            <div className="no-team-div">
                {teamsDisplay.length === 0 ? "No Team to Display" : ""}
            </div>

        </div>

    }

    goToDetailsPage = (id) => {
        this.props.history.push("/view-team/" + id);
    };

    playerByID = (id) => {
        let result = this.props.allPlayers.filter(obj => {
            return obj.id === id
        });
        return result[0];
    };

    deleteTeam = (event, id) => {
        this.props.deleteTeamProps(id);
        event.stopPropagation();
    };

    searchDivChange = (event) => {
        const text = event.target.value;
        this.setState({searchText:text});
    }
}

const mapStateToProps = state => {
    return {
        teams: state.teams,
        allPlayers: state.masterPlayerData
    }
};

const mapDispatchToProps = dispatch => {
    return {
        deleteTeamProps: (id) => {
            dispatch(deleteTeam(id))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));
