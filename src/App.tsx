import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import CreateExercise from "./pages/CreateExercise";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App() {
    useEffect(() => {
        document.title = 'Resolute';
        document.body.style.backgroundImage = "linear-gradient(90deg, #253654, #3d4652, #253654)";
    }, []);
    return (
        <Router>
            <div className="App">
                <header/>
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path='/exercises/create' element={<CreateExercise/>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
