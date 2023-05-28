import React from "react";
import Join from "./components/Join/Join";
import Chat from "./components/chat/Chat";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App(){
    return(
    <Router>
        <Routes>
            <Route path="/" exact Component={Join}/>
            <Route path="/Chat" exact Component={Chat}/>
        </Routes>
    </Router>)
};

export default App;
