import React, { useState } from "react";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";
import "./signUp.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TootContext } from "../../MyContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const db = getFirestore();

  const signIn = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
      });
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/");
    }
  };

  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
      });
    } catch (err) {
      console.error(err);
    } finally {
      navigate("/");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <div className="signup-form">
        <input
          className="signup-input"
          placeholder="Email.."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="signup-input"
          type="password"
          placeholder="Password.."
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="button-container">
          <button className="signup-button" onClick={signIn}>
            Sign Up
          </button>
          <button className="login-button" onClick={signIn}>
            Login
          </button>
        </div>
      </div>
      <button className="google-button" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
};

export default SignUp;
