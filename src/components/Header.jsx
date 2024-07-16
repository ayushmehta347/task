import React, { useContext, useEffect,useNavigate } from "react";
import '../styles/app.css';
import { Link } from "react-router-dom";
import { Context } from "../main";

const Header = () => {
    const { authenticated, setAuthenticated } = useContext(Context);
   // const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthenticated(true);
        }
    }, [setAuthenticated]);

    const handleLogout = async () => {
        try {
            localStorage.removeItem('token');
            setAuthenticated(false);
            navigate('/login');
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <nav className="header">
            <div>
                <h2>Task Management</h2>
            </div>
            <article>
                <div className="link">
                    {!authenticated ? (
                        <>
                            <Link className="route" to={"/login"}><span>Login</span></Link>
                            <Link className="route" to={"/signup"}><span>SignUp</span></Link>
                        </>
                    ) : (
                        <Link className="route" to={"/login"} onClick={handleLogout}><span>Logout</span></Link>
                    )}
                </div>
            </article>
        </nav>
    );
}

export default Header;
