import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFirestore } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { TootContext } from "../../MyContext";
import "./loginPage.css";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const { setTrigger, trigger, setUserId, userId } = useContext(TootContext);
    const navigate = useNavigate();
    const db = getFirestore();

    const login = async (e) => {
        e.preventDefault();
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredentials);
            localStorage.setItem('userId', userCredentials.user.uid);
            setUserId(userCredentials.user.uid);
            console.log(`this is user id = ${userId}`);
            navigate("/HomePage");
        }
        catch (err) {
            console.log("Error message:", err.message);
            setErrorMessage("Login failed. Please check your email and password.");
        }
        finally {
            setTrigger(!trigger);
        }
    }

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <div className="login-form">
                <input
                    className="login-input"
                    placeholder="Email.."
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="Password.."
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="button-container">
                    <button className="login-button" onClick={login}>
                        Login
                    </button>
                </div>
                {/* Display error message */}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
            </div>
            <Link className="login-link" to="/SignUp">
                Sign Up for Free!
            </Link>
        </div>
    );
}

export default LoginPage;
