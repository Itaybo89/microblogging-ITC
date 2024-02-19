import "./createToot.css";
import "bootstrap/dist/css/bootstrap.css";
import { TootContext } from "../../MyContext";
import TootButton from "../TootButton/TootButton";
import { useContext } from "react";
import { useState } from "react";

function CreateToot() {
  const tootSound = new Audio("./tootoot-cute.mp3");
  const [charError, setCharError] = useState(false);
  const { loading, handleAddToot, tootText, setTootText } =
    useContext(TootContext);

  const handleText = (e) => {
    const newText = e.target.value;
    if (newText.length <= 140 && !loading) {
      setTootText(newText);
    }
    setCharError(newText.length > 140);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddToot(tootText);
    tootSound.play();
    setTootText("");
  };

  return (
    <form id="tootForm" onSubmit={handleSubmit}>
      <div id="textWrapper">
        <textarea
          placeholder="Pick a card, any card."
          id="tootTextArea"
          value={tootText}
          onChange={handleText}
          required
        ></textarea>
        <TootButton charError={charError} />
      </div>
    </form>
  );
}

export default CreateToot;
