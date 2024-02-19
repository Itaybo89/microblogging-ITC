import React, { useState, useContext, useRef, useEffect } from "react";
import "./profile.css";
import { TootContext } from "../../MyContext";
import { db, storage } from "../../firebase";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { userName, setUserName, userId } = useContext(TootContext);
  const [isToggle, setIsToggle] = useState(true);
  const [profPic, setProfPic] = useState(null);
  const [oldImage, setOldImage] = useState("");
  const [nameText, setNameText] = useState("")
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setProfPic(e.target.files[0]);
  };

  const updateUserProfile = async (imageUrl) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { image: imageUrl, userName: nameText });
    } catch (error) {
      console.error("Error Warnning Warnning:", error);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const storageRef = ref(storage, `/images/${profPic.name}`);
      await uploadBytes(storageRef, profPic);
      const imageUrl = await getDownloadURL(storageRef);
      localStorage.setItem("userName", nameText);
      setUserName(nameText);
      setIsToggle(!isToggle);

      updateUserProfile(imageUrl);
    } catch (error) {
      console.error("Intruders Alert:", error);
    } finally {
      setIsToggle(isToggle);
      navigate("/HomePage");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", userId);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setOldImage(userData.image);
          console.log(userData);
          setUserName(userData.userName);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [isToggle]);

  return (
    <div id="profilion">
      <h1 id="profile-title">Profile</h1>
      <span id="show-picture">
        <img
          src={profPic ? URL.createObjectURL(profPic) : oldImage}
          alt="Avatar Preview"
        />
      </span>
      <div id="user-profile">
        <div className="profile-input-wrapper">
          <input
            type="text"
            id="name-input"
            onChange={(e) => setNameText(e.target.value)}
            placeholder="Desired Username"
            value={nameText}
            required
          />
          <button
            id="addPicButton"
            type="button"
            onClick={() => fileInputRef.current.click()}
          >
            <span className="floating-label">Add Profile Picture</span>
            <span className="floating-icon"></span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
            onClick={(e) => (e.target.value = null)}
          />
        </div>
        <button id="saveButton" type="submit" onClick={updateProfile}>
          <span id="saveText">Save</span>
        </button>
      </div>
    </div>
  );
}

export default Profile;

// import { useContext, useState } from "react";
// import "./profile.css";
// import { TootContext } from "../../MyContext";
// import { useNavigate } from "react-router-dom";

// function Profile({}) {
//   const [newName, setNewName, userName] = useState("");
//   const { setUserName } = useContext(TootContext);

//   const navigate = useNavigate();

//   const saveChanges = () => {
//     localStorage.setItem("userName", newName);
//     setUserName(newName);
//     navigate("/HomePage");
//   };

//   return (
//     <div id="profilion">
//       <h1 id="profile-title">Profile</h1>
//       <span id="show-picture">
//         <img src={newAvatar} alt="avatar" />
//       </span>
//       <form id="user-profile">
//         <input
//           type="text"
//           id="name-input"
//           onChange={(e) => setNewName(e.target.value)}
//           placeholder="Desired Username"
//           value={userName}
//           required
//         />
//         <button id="saveButton" type="button" onClick={saveChanges}>
//           <span id="saveText">Save</span>
//           <span id="tootImage"></span>
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Profile;
