import React, { useContext, useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import { AuthContext } from "./Contexts.js";
import { toast } from "react-toastify";
const ProtectedRoute = (props) => {

    const navigate = useNavigate();
    const [canVisit, setcanVisit] = useState(false);
    const auth = useContext(AuthContext);

    const checkUserToken = () => {
        if (auth.token == "" || auth.token === 'undefined') {
            setcanVisit(false);
            toast.error('You need to login to access this page!')
            return navigate('/');
        }
        setcanVisit(true);
    }

    useEffect(() => {
            checkUserToken();
        }, [canVisit]);
        
    return (
        <React.Fragment>
            {
                canVisit ? props.children : null
            }
        </React.Fragment>
    );
}
export default ProtectedRoute;