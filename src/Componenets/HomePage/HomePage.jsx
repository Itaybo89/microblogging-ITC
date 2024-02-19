import React, { useContext, useEffect} from "react";
import "./homePage.css";
import CreateToot from "../CreateToot/CreateToot";
import ButtonExample from "../ButtonExample/ButtonExample";
import TootList from "../TootList/TootList";
import { TootContext } from "../../MyContext";


function HomePage() {
  const { getAllTootsWithSnapshot, loading, isError } = useContext(TootContext);

  useEffect(() => {
    const unsubscribe = getAllTootsWithSnapshot();
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <CreateToot />
      <div className="Spinner-container">
        {loading ? <ButtonExample /> : <TootList />}
        {loading ? <span id="tootLoading"></span> : <></>}
        {isError && <div id="failed-err">Oops something went wrong...</div>}
        {isError && <span id="error-toot" />}
      </div>
    </div>
  );
}

export default HomePage;
