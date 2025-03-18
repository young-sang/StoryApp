import React from "react";
import './css/style.css'
import { useEffect, useState } from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import ItemList from "./ItemList.js";
import ItemControl from "./Form.js";
import ItemDetail from "./ItemDetail.js";


function Home() {
  return <h1>홈 페이지</h1>
}


function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">홈</Link></li>
          <li><Link to="/ani">애니</Link></li>
          <li><Link to="/manga">만화</Link></li>
          <li><Link to="/novel">소설</Link></li>
          <li><Link to="/addItem">추가</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<ItemList />} />
        <Route path="/addItem" element={<ItemControl mode={"add"} />} />
        <Route path="/updateItem" element={<ItemControl mode={"update"} />} />
        <Route path="/detail/:mode/:id" element={<ItemDetail/>} />
      </Routes>
    </Router>
  );
}

export default App;
