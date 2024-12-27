import React from "react";
import "../../styles/Header.css";
import profilePic from "../../Assets/money.png";
import { FaSearch } from "react-icons/fa";

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                <h1>Twitter Stream Processing Pipeline</h1>
                <div className="header-right">
                    <div className="search-container">
                        <input type="text" placeholder="Search" />
                        <FaSearch className="search-icon" />
                    </div>
                    <div className="profile-pic">
                        <img src={profilePic} alt="Profile" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;