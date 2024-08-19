
import Home from "./screen/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screen/Login";
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from "./screen/Signup.js";
import Assessment from "./screen/Assessment.js"
import Privatespace from './screen/Privatespace.js';
import Fetchexam from "./screen/Fetchexam.js";
import Leaderboard from "./screen/Leaderboard.js";
import NoticeBoard from "./screen/NoticeBoard.js";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route exact path = '/' element = {<Home/>}></Route>
          <Route exact path = '/login' element = {<Login/>}></Route>
          <Route exact path = '/signup' element = {<Signup></Signup>}></Route>
          <Route exact path = '/dsa'    element = {<Assessment></Assessment>}></Route>
          <Route exact path = '/privatespace' element = {<Privatespace></Privatespace>}></Route>
          <Route exact path = '/fetchexam' element = {<Fetchexam></Fetchexam>}></Route>
          <Route exact path = '/lead' element = {<Leaderboard></Leaderboard>}></Route>
          <Route exact path = '/noticeboard' element = {<NoticeBoard></NoticeBoard>}></Route>
        </Routes>
      </>
    </Router>
  );
}

export default App;
