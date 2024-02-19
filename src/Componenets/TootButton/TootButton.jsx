import "./tootButton.css";


function TootButton({charError}) {
  return (
    <>
      <button id="tootButton" type="submit" disabled={charError}>
        <span id="tootText">toot</span>
        <span id="tootImage"></span>
      </button>
      {charError && (
        <span id="charError">Woah there! don't go over 140 chars.</span>
      )}
    </>
  );
}

export default TootButton;
