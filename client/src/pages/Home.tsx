import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { getToken } from "../services/localStorage";

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();

        if (!token)
            navigate('/login');


    }, []);


    return <h1>Home page</h1>
}


export default Home;