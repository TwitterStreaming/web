// @ts-check
import React, { useEffect, useState } from "react";
import "../../styles/Header.css";
import profilePic from "../../Assets/money.png";
import { FaSearch } from "react-icons/fa";
import { useSearchByKeyword } from "../../context/useSearchByKeyword";
import { useLocation } from "../../context/useLocation";
import { useTrends } from "../../context/useTrends";

const Header = () => {
    const [searchText, setSearchText] = useState("");
    const { data, fetch: fetchSearchData } = useSearchByKeyword();
    const { fetch: fetchLocations } = useLocation();
    const { fetch: fetchTrends } = useTrends();

    async function searchKeyword() {
        if (searchText !== "") {
            await fetchSearchData(searchText);
            await fetchTrends(searchText);
        }
    }

    useEffect(() => {
        const intervalId = setInterval(async () => {
            await searchKeyword();
        }, 2000);

        return () => clearInterval(intervalId);
    }, [searchText]);

    useEffect(() => {
        if (data) {
            fetchLocations(data);
        }
    }, [data]);

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
                        <FaSearch
                            onClick={searchKeyword}
                            className="search-icon"
                        />
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
