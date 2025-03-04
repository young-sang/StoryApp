import React from "react";
import { useEffect, useState } from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import ItemList from "./ItemList.js";

function Home() {
  return <h1>홈 페이지</h1>
}

function ItemControl(props) {

  return (
    <form>
      
      <label htmlFor="title">제목</label>
      <input type="text" name="title" />
      {/* 스토리 별점 */}
      <label htmlFor="story">story</label>
      <select id="story" name="story">
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={1.5}>1.5</option>
        <option value={2}>2</option>
        <option value={2.5}>2.5</option>
        <option value={3}>3</option>
        <option value={3.5}>3.5</option>
        <option value={4}>4</option>
        <option value={4.5}>4.5</option>
        <option value={5}>5</option>
      </select>
      {/* 세계관 별점 */}
      <label htmlFor="worldview">worldview</label>
      <select id="worldview" name="worldview">
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={1.5}>1.5</option>
        <option value={2}>2</option>
        <option value={2.5}>2.5</option>
        <option value={3}>3</option>
        <option value={3.5}>3.5</option>
        <option value={4}>4</option>
        <option value={4.5}>4.5</option>
        <option value={5}>5</option>
      </select>
      {/* 캐릭터 별점 */}
      <label htmlFor="characters">characters</label>
      <select id="characters" name="characters">
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={1.5}>1.5</option>
        <option value={2}>2</option>
        <option value={2.5}>2.5</option>
        <option value={3}>3</option>
        <option value={3.5}>3.5</option>
        <option value={4}>4</option>
        <option value={4.5}>4.5</option>
        <option value={5}>5</option>
      </select>
      {/* 작화 별점 */}
      <label htmlFor="drawing">drawing</label>
      <select id="drawing" name="drawing">
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={1.5}>1.5</option>
        <option value={2}>2</option>
        <option value={2.5}>2.5</option>
        <option value={3}>3</option>
        <option value={3.5}>3.5</option>
        <option value={4}>4</option>
        <option value={4.5}>4.5</option>
        <option value={5}>5</option>
      </select>
      {/* ost 별점 */}
      <label htmlFor="ost">ost</label>
      <select id="ost" name="ost">
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={1.5}>1.5</option>
        <option value={2}>2</option>
        <option value={2.5}>2.5</option>
        <option value={3}>3</option>
        <option value={3.5}>3.5</option>
        <option value={4}>4</option>
        <option value={4.5}>4.5</option>
        <option value={5}>5</option>
      </select>
      {/* 연출 별점 */}
      <label htmlFor="production">production</label>
      <select id="production" name="production">
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={1.5}>1.5</option>
        <option value={2}>2</option>
        <option value={2.5}>2.5</option>
        <option value={3}>3</option>
        <option value={3.5}>3.5</option>
        <option value={4}>4</option>
        <option value={4.5}>4.5</option>
        <option value={5}>5</option>
      </select>
      {/* 설명 */}
      <label htmlFor="desc">설명</label>
      <textarea id="desc"></textarea>

      <input type="submit" value="추가" />
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
