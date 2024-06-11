import { useState, useEffect } from "react";
import "./HomePage.css";

function HomePage() {
    // Array of cycling homepage images
    const homePageImages = [
        "https://cdn.nba.com/manage/2023/06/jokic-murray061223.jpg",
        "https://cdn.nba.com/manage/2022/06/stephen-curry-celebrates-finals-mvp.jpg",
        "https://cdn.nba.com/manage/2021/07/middleton-budenholzer-giannis.jpg",
    ];

    // States
    const [currentHomePageImageIndex, setCurrentHomePageImageIndex] =
        useState(0);

    // Image cycling
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentHomePageImageIndex((prevIndex) =>
                prevIndex === homePageImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000);

        return () => clearInterval(intervalId);
    }, [homePageImages.length]);

    return (
        <div className="homepage-container">
            <section className="homepage-top-section">
                <div className="homepage-top-section-left">
                    <img
                        src={homePageImages[currentHomePageImageIndex]}
                        alt="homepage picture"
                    />
                </div>
                <div className="homepage-top-section-right">
                    <h1>Welcome to My Fantasy Notebook!</h1>
                    <p>
                        Blah blah blah. Blah blah blah. Blah blah blah. Blah
                        blah blah. Blah blah blah. Blah blah blah. Blah blah
                        blah. Blah blah blah. Blah blah blah. Blah blah blah.
                    </p>
                </div>
            </section>
            <footer className="homepage-footer">
                <h3>Random footer stuff.</h3>
            </footer>
        </div>
    );
}

export default HomePage;
