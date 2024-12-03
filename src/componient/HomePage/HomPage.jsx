import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Style/HomePage.scss"
import VideoIntroduction from "./Section/VideoIntroduction";
import Solution from "./Section/Solution";
const HomePage = () => {
    return (
        <div className="homepage-container">
            <VideoIntroduction />
            <Solution />
        </div>
    );
};

export default HomePage;
