import React from "react";
import "./App.css";
import Map from "./components/Map/Map";
import TrendChart from "./components/TrendChart/TrendChart";
import Header from "./components/Header/Header";
function App() {
    return (
        <div className="app">
            <div className="main-content">
                <Header/>
                <div className="flex">
                    <div className="column-charts">
                        <TrendChart />
                        {/* GaugeChart  */}
                    </div>
                    <div className="column-charts">
                        <Map />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
