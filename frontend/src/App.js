import React from "react";
import { useEffect, useState } from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import ItemList from "./ItemList.js";

function Home() {
  return <h1>홈 페이지</h1>
}

function ItemControl() {

  return (
    <form>
      <input>제목</input>
      <input>story</input>
      <input>worldview</input>
      <input>characters</input>
      <input>drawing</input>
      <input>ost</input>
      <input>production</input>
      <textarea></textarea>
    </form>
  )
}

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">홈</Link></li>
          <li><Link to="/ani">애니</Link></li>
          <li><Link to="/manga">만화</Link></li>
          <li><Link to="/novel">라이트노벨</Link></li>
          <li><Link to="/addItem">추가</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ani" element={<ItemList title={"ani"} db={"aniitems"} />} />
        <Route path="/manga" element={<ItemList title={"manga"} db={"mangaitems"} />} />
        <Route path="/novel" element={<ItemList title={"Novel"} db={"novelitems"} />} />
        <Route path="/addItem" element={<ItemControl mode={"add"} />} />
        <Route path="/updateItem" element={<ItemControl mode={"update"} />} />
      </Routes>
    </Router>
  );
}

export default App;
