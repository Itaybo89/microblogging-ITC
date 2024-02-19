import { doc, getDoc } from "firebase/firestore";
import "./toot.css";
import nl2br from "react-nl2br";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

const Toot = ({ tootObj }) => {
  const [user, setUser] = useState({});

  const getSingleUser = async (tootObj) => {
    try {
      const docRef = doc(db, "users", tootObj.username);
      const docSnap = await getDoc(docRef);
      const userInfo = docSnap.data();
      console.log(userInfo);
      setUser(userInfo);
    } catch (err) {
      console.log("Error retrieving user info:", err);
    } finally {
      console.log(`${user}`);
    }
  };

  useEffect(() => {
    getSingleUser(tootObj);
  }, []);

  return (
    <div className="toot">
      <div className="user-image">
        <img src={user.image} alt="User Profile" />
      </div>
      <div className="toot-content">
        <li key={tootObj.id}>
          <span id="header-span">
            <span id="user">{user.userName}</span>
            <span id="date">
              {new Date(
                tootObj.date.seconds * 1000 + tootObj.date.nanoseconds / 1000000
              ).toLocaleString()}
            </span>
          </span>
          <span id="tootMsg">{nl2br(tootObj.content)}</span>
        </li>
      </div>
    </div>
  );
};
export default Toot;
