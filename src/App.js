import React from 'react';
import './App.css';
import MyApp from "./MyApp";
import Provider from "react-redux/es/components/Provider";
import store from "./store";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck , faPlus} from '@fortawesome/free-solid-svg-icons'

library.add(faCheck);
library.add(faPlus);


function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <MyApp/>
            </Provider>
        </div>
    );
}

export default App;
