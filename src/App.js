import React, { useEffect, useState } from "react";
import "./App.css";
import Map from "./components/Map/Map";
import TrendChart from "./components/TrendChart/TrendChart";
import Header from "./components/Header/Header";
import SentimentGaugeChart from "./components/SentimentGaugeChart/SentimentGaugeChart";
import { extractLocation } from "./utils/extract_data";

function App() {
    const [searchedData, setSearchedData] = useState(null);
    const [locations, setLocations] = useState([]);

    function updateSearchedData(data) {
        setSearchedData(data);
    }

    useEffect(() => {
        if (searchedData) {
            setLocations(extractLocation(searchedData));
        }
    }, [searchedData]);

    return (
        <div className="app">
            <div className="main-content">
                <Header updateSearchedData={updateSearchedData} />
                <div className="flex">
                    <div className="column-charts">
                        <TrendChart />
                        <SentimentGaugeChart />
                    </div>
                    <div className="column-charts">
                        <Map locations={locations} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
