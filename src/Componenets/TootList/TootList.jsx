import React, { useContext, useState } from "react";
import "./tootList.css";
import { TootContext } from "../../MyContext";
import Toot from "../Toot/Toot";

function TootList() {
  const { tootList } = useContext(TootContext);

  const sortedTootList = [...tootList].sort((a, b) => b.date - a.date);

  return (
    <ul id="tootUl">
      {sortedTootList.map((tootObj) => (
        <Toot tootObj={tootObj} key={tootObj.id} />
      ))}
    </ul>
  );
}

export default TootList;
