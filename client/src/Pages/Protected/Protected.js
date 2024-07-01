import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = ({ Component }) => {

    const navigate = useNavigate()

    useEffect(() => {
        let token = localStorage.getItem("access-token")
        if (!token) {
            navigate("/login")
        }
    })


    return (
        <div>
            <Component />
        </div>
    );
};

export default Protected;