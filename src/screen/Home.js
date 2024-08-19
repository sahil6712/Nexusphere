// Home.js
import React from "react";
import Navbar from "../component/Navbar";
import Card from "../component/Card";
import Footer from "../component/Footer";
import './Home.css'; // Import custom CSS for Home

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-4 mb-4">
              <Card imgSource="https://i.ytimg.com/vi/Qmt0QwzEmh0/maxresdefault.jpg" togo='/dsa' subject="Data Structure" />
            </div>
            <div className="col-md-4 mb-4">
              <Card imgSource="https://www.simplilearn.com/ice9/free_resources_article_thumb/What_is_CPP.jpg" togo='/dsa' subject="CPP" />
            </div>
            <div className="col-md-4 mb-4">
              <Card imgSource="data:image/jpeg;base64,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" togo='/dsa' subject="Java" />
            </div>
            <div className="col-md-4 mb-4">
              <Card imgSource="https://t3.ftcdn.net/jpg/03/70/42/66/360_F_370426690_Pejt9KxjWTHPklsKwripaxr0iA17zupF.jpg" togo='/dsa' subject="English" />
            </div>
            <div className="col-md-4 mb-4">
              <Card imgSource="https://www.simplilearn.com/ice9/free_resources_article_thumb/What_is_CPP.jpg" togo='/dsa' subject="Aptitude" />
            </div>
            <div className="col-md-4 mb-4">
              <Card imgSource="https://www.simplilearn.com/ice9/free_resources_article_thumb/What_is_CPP.jpg" togo='/dsa' subject="Object Oriented Programming" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
