//import {Fragment} from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from './components/Navbar';

function App() {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main >
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                </Routes>

            </main>
            <footer className="footer mt-auto py-3 bg-dark">
                <div className="container text-center">
                    <span className="text-muted">© 2024 BoostWash</span>
                </div>
            </footer>
        </>
    )
}


export default App;