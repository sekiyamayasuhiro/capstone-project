import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaGithub, FaLinkedin, FaUser } from "react-icons/fa";
import { useModal } from "../../context/Modal";
import LoginFormModal from "../LoginFormModal";
import "./HomePage.css";

function HomePage() {
    const navigate = useNavigate();
    const sessionUser = useSelector((state) => state.session.user);
    const { setModalContent } = useModal();

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

    const handleProtectedNavigation = (e, path) => {
        e.preventDefault();
        if (sessionUser) {
            navigate(path);
        } else {
            setModalContent(<LoginFormModal redirectPath={path} />);
        }
    };

    return (
        <div className="homepage-container">
            <section className="homepage-top-section">
                <div className="homepage-text-overlay">
                    This is where WE win.
                </div>
                <div className="homepage-top-section-left">
                    <img
                        src={homePageImages[currentHomePageImageIndex]}
                        alt="homepage picture"
                    />
                </div>
            </section>
            <section className="homepage-bottom-section">
                <div>
                    <a
                        href="/leagues"
                        onClick={(e) =>
                            handleProtectedNavigation(e, "/leagues")
                        }
                    >
                        <img src="/homepagelinkpic1.png" alt="Link1" />
                    </a>
                    <p>MANAGE LEAGUES</p>
                </div>

                <div>
                    <a
                        href="/testing"
                        onClick={(e) =>
                            handleProtectedNavigation(e, "/testing")
                        }
                    >
                        <img src="/homepagelinkpic2.png" alt="Link2" />
                    </a>
                    <p>WRITE NOTES</p>
                </div>
                <div>
                    <a
                        href="/testing"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate("/testing");
                        }}
                    >
                        <img src="/homepagelinkpic3.png" alt="Link3" />
                    </a>
                    <p>COMPARE</p>
                </div>
            </section>
            <footer className="homepage-footer">
                <div>© 2024 Fantasy Basketball Notebook</div>
                <div>
                    <a href="https://github.com/sekiyamayasuhiro/capstone-project">
                        <FaGithub size={24} />
                    </a>
                </div>
                <div>
                    <a href="https://sekiyamayasuhiro.github.io">
                        <FaUser size={24} />
                    </a>
                </div>
                <div>
                    <a href="http://www.linkedin.com/in/yasuhiro-sekiyama-86474a329">
                        <FaLinkedin size={24} />
                    </a>
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
