import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { createContext, useState } from "react";
import { db } from "./firebase";
import { useEffect } from "react";
import defaultPic from "./Componenets/Profile/toot.png"

const TootContext = createContext("");

const AppContextProvider = ({ children }) => {

  const tootsCollection = collection(db, "toots");
  const [tootText, setTootText] = useState("");
  const [tootList, setTootList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [nickName, setNickName] = useState("");
  const [trigger, setTrigger] = useState(true);
  const [oldImage, setOldImage] = useState(localStorage.getItem('oldImage') || null);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
  const [userName, setUserName] = useState(localStorage.getItem('userName') || 'annon');


  useEffect(() => {
    localStorage.setItem('userId', userId);
}, [userId]);

useEffect(() => {
  localStorage.setItem('oldImage', oldImage);
}, [oldImage]);

  const handleAddToot = async () => {
    try {
      const newToot = {
        username: userId,
        date: new Date(),
        content: tootText,
      };

      await addDoc(tootsCollection, newToot);
      setTootText("");
      console.log(userId);
    } catch (err) {
      console.error("Errors, errors everywhere", err);
    }
  };

  const getAllTootsWithSnapshot = () => {
    setLoading(true);
    const unsubscribe = onSnapshot(tootsCollection, (querySnapshot) => {
      const tootArray = [];
      querySnapshot.forEach((toot) => {
        const tootWithId = {
          id: toot.id,
          ...toot.data(),
        };
        tootArray.push(tootWithId);
      });
      setTootList(tootArray);
      setLoading(false);
    });
    return unsubscribe;
  };

  return (
    <TootContext.Provider
      value={{
        oldImage,
        setOldImage,
        userName,
        setUserName,
        trigger,
        setTrigger,
        tootText,
        setTootText,
        setUserId,
        userId,
        loading,
        isError,
        setIsError,
        nickName,
        setNickName,
        tootList,
        handleAddToot,
        getAllTootsWithSnapshot,
      }}
    >
      {children}
    </TootContext.Provider>
  );
};

export { TootContext };
export default AppContextProvider;
