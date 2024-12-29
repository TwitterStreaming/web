// @ts-check
import React, { useState } from "react";
import "../../styles/Header.css";
import profilePic from "../../Assets/money.png";
import { FaSearch } from "react-icons/fa";
import { searchByKeyword } from "../../data/database_caller";

const Header = ({ updateSearchedData }) => {
    const [searchText, setSearchText] = useState("");
    async function search() {
        if (searchText !== "") {
            updateSearchedData(await searchByKeyword(searchText));
        }
    }

    return (
        <header className="header">
            <div className="header-content">
                <h1>Twitter Stream Processing Pipeline</h1>
                <div className="header-right">
                    <div className="search-container">
                        <input
                            onChange={(e) =>
                                setSearchText(e.currentTarget.value)
                            }
                            type="text"
                            placeholder="Search"
                        />
                        <FaSearch onClick={search} className="search-icon" />
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
