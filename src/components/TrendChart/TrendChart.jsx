import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import "../../styles/TrendChartStyle.css";
import { useTrends } from "../../context/useTrends";
import { useTotalTweets } from "../../context/useTotalTweets";
import { useTotalSearchedTweets } from "../../context/useTotalSearchedTweets";
import { useTweetsNoLocation } from "../../context/useTweetsNoLocation";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

const Overview = () => {
    const { trends, setInterval } = useTrends();

    const { totalTweets } = useTotalTweets();
    const { totalSearchedTweets } = useTotalSearchedTweets();
    const { totalNoLocation } = useTweetsNoLocation();

    const [isDaily, setIsDaily] = useState(true);
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: "Tweets Over Time",
                data: [],
                backgroundColor: "#4e5065",
                borderColor: "#4e5065",
                borderWidth: 2,
                pointBackgroundColor: "rgb(255, 255, 255)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "rgb(255, 255, 255)",
                pointHoverBorderColor: "#fff",
                fill: true,
            },
        ],
    });

    useEffect(() => {
        async function getData() {
            if (isDaily) {
                const dailyTweetCounts = [];
                const dates = [];

                trends.trends.forEach((trend) => {
                    const date = new Date(trend.date);
                    const formattedDate = date.toISOString().split("T")[0];

                    const dateIndex = dates.indexOf(formattedDate);
                    if (dateIndex === -1) {
                        dates.push(formattedDate);
                        dailyTweetCounts.push(trend.count);
                    } else {
                        dailyTweetCounts[dateIndex] += trend.count;
                    }
                });

                setData({
                    labels: dates.length > 0 ? dates : ["No Data"],
                    datasets: [
                        {
                            label: "Daily Tweets",
                            data: dailyTweetCounts,
                            backgroundColor: "#4e5065",
                            borderColor: "#4e5065",
                            borderWidth: 2,
                            pointBackgroundColor: "rgb(255, 255, 255)",
                            pointBorderColor: "#fff",
                            pointHoverBackgroundColor: "rgb(255, 255, 255)",
                            pointHoverBorderColor: "#fff",
                            fill: true,
                        },
                    ],
                });
            } else {
                const hourlyTweetCounts = new Array(24).fill(0);

                trends.trends.forEach((trend) => {
                    const date = new Date(trend.date);
                    const hour = date.getHours();
                    hourlyTweetCounts[hour] += trend.count;
                });

                const hourlyLabels = hourlyTweetCounts.map((_, hourIndex) => {
                    const baseDate = new Date();
                    baseDate.setHours(hourIndex);

                    const options = {
                        hour: "numeric",
                        hour12: true,
                    };

                    const hourString = baseDate.toLocaleString(
                        "en-US",
                        options,
                    );
                    return `${hourString}`;
                });

                setData({
                    labels: hourlyLabels,
                    datasets: [
                        {
                            label: "Hourly Tweets",
                            data: hourlyTweetCounts,
                            backgroundColor: "#4e5065",
                            borderColor: "#4e5065",
                            borderWidth: 2,
                            pointBackgroundColor: "rgb(255, 255, 255)",
                            pointBorderColor: "#fff",
                            pointHoverBackgroundColor: "rgb(255, 255, 255)",
                            pointHoverBorderColor: "#fff",
                            fill: true,
                        },
                    ],
                });
            }
        }

        if (trends) {
            getData();
        }
    }, [isDaily, trends]);

    const toggleView = () => {
        const newInterval = isDaily ? "1h" : "1d";
        setIsDaily((prev) => !prev);
        setInterval(newInterval);
    };

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: "rgba(255, 255, 255, 0.1)",
                },
                ticks: {
                    color: "#fff",
                },
            },
            x: {
                grid: {
                    color: "rgba(255, 255, 255, 0.1)",
                },
                ticks: {
                    color: "#fff",
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: "#fff",
                },
            },
        },
        elements: {
            line: {
                tension: 0.4,
            },
        },
    };

    return (
        <div className="overview">
            <h2>Overview</h2>
            <div className="overview-content">
                <div className="stats">
                    <div className="stat">
                        <h3>Total Tweets</h3>
                        <div className="details">
                            <span>{totalTweets}</span>
                            <span>All Time</span>
                        </div>
                    </div>
                    <div className="stat">
                        <h3>Total Searched Tweets</h3>
                        <div className="details">
                            <span>{totalSearchedTweets}</span>
                            <span>Filtered</span>
                        </div>
                    </div>
                    <div className="stat">
                        <h3>Tweets with no Location</h3>
                        <div className="details">
                            <span>{totalNoLocation}</span>
                            <span>Geotagged</span>
                        </div>
                    </div>
                </div>
                <div className="chart">
                    <button
                        onClick={toggleView}
                        className="toggle-button"
                        style={{
                            marginBottom: "20px",
                            padding: "5px 5px",
                            backgroundColor: "#4bc0c0",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Switch to {isDaily ? "Hourly" : "Daily"}
                    </button>
                    <Line data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default Overview;
