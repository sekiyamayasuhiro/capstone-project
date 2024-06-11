import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import homepagelinkpic1 from "../../../public/homepagelinkpic1.png";
import homepagelinkpic2 from "../../../public/homepagelinkpic2.png";
import homepagelinkpic3 from "../../../public/homepagelinkpic3.png";
import "./HomePage.css";

function HomePage() {
    const navigate = useNavigate();
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
                    <h1>Welcome to MyFantasyNotebook!</h1>
                    <p>
                        Explore the ultimate fantasy basketball experience with
                        MyFantasyNotebook, where up-to-date NBA data,
                        customizable leagues, and advanced scouting tools come
                        together to elevate your strategy. Create and manage
                        your leagues and teams, enjoy detailed stats and player
                        comparisons, and enrich your fantasy sports journey.
                        Enhance your engagement by personalizing player profiles
                        with scouting reports and adding memorable images to
                        your gallery! Start building your championship team
                        today and experience fantasy basketball like never
                        before!
                    </p>
                </div>
            </section>
            <section className="homepage-bottom-section">
                <div>
                    <a
                        href="/testing"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/testing");
                        }}
                    >
                        <img src={homepagelinkpic1} alt="Link1" />
                    </a>
                    <p>Pic Link Description 1</p>
                </div>

                <div>
                    <a
                        href="/testing"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/testing");
                        }}
                    >
                        <img src={homepagelinkpic2} alt="Link2" />
                    </a>
                    <p>Pic Link Description 2</p>
                </div>
                <div>
                    <a
                        href="/testing"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/testing");
                        }}
                    >
                        <img src={homepagelinkpic3} alt="Link3" />
                    </a>
                    <p>Pic Link Description 3</p>
                </div>
            </section>
            <footer className="homepage-footer">
                <div>© 2024 MyFantasyNotebook</div>
                <div>
                    <a href="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/143.png">
                        About Me
                    </a>
                </div>
                <div>
                    <a href="https://github.com/sekiyamayasuhiro">GitHub</a>
                </div>
                <div>
                    <a href="mailto:sekiyamayasuhiro@gmail.com">Contact Me</a>
                </div>
            </footer>
            <footer>
                <div className="homepage-footer-disclaimer">
                    This application uses real NBA data and images from NBA.com.
                    All rights and trademarks belong to their respective owners.
                    This project is for educational purposes only and is not
                    affiliated with the NBA.
                </div>
            </footer>
        </div>
    );
}

export default HomePage;
