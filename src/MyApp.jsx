import React from "react";
import Header from "./components/header";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./components/home";
import AddTeam from "./components/addTeam";
import ViewTeam from "./components/viewTeam";
import "./App.css";

class MyApp extends React.Component {

    render() {
        return <div>
            <BrowserRouter>
                <Header/>
                <div className='Main-Content'>
                    <Switch>
                        <Route exact={true}
                               path={"/"}
                               component={Home}/>

                        <Route exact={true}
                               path={"/create-team"}
                               component={AddTeam}/>

                        <Route exact={true}
                               path={"/view-team/:id"}
                               component={ViewTeam}/>

                    </Switch>
                </div>
            </BrowserRouter>


        </div>
    }
}

export default MyApp;
