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
    const { trends } = useTrends();

    const [isDaily, setIsDaily] = useState(true); 
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: "Tweets Over Time",
                data: [],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "#4bc0c0",
                borderWidth: 2,
                pointBackgroundColor: "#4bc0c0",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#4bc0c0",
                pointHoverBorderColor: "#fff",
                fill: true,
            },
        ],
    });
    useEffect(() => {
        async function getData() {
            const trendsData = trends.trends;

            const hourlyTweetCounts = new Array(24).fill(0);
            const dailyTweetCounts = [];
            const days = [];

            trendsData.forEach((trend) => {
                const date = new Date(trend.date);
                console.log(trend);

                // Group by hour
                const hour = date.getUTCHours();
                hourlyTweetCounts[hour] += trend.count;

                // Group by day
                const day = date.toLocaleDateString("en-US", {
                    weekday: "long",
                });
                const dayIndex = days.indexOf(day);
                if (dayIndex === -1) {
                    days.push(day);
                    dailyTweetCounts.push(trend.count);
                } else {
                    dailyTweetCounts[dayIndex] += trend.count;
                }
            });

            if (isDaily) {
                setData({
                    labels: days.length > 0 ? days : ["No Data"],
                    datasets: [
                        {
                            label: "Daily Tweets",
                            data: dailyTweetCounts,
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            borderColor: "#4bc0c0",
                            borderWidth: 2,
                            pointBackgroundColor: "#4bc0c0",
                            pointBorderColor: "#fff",
                            pointHoverBackgroundColor: "#4bc0c0",
                            pointHoverBorderColor: "#fff",
                            fill: true,
                        },
                    ],
                });
            } else {
                setData({
                    labels: Array.from({ length: 24 }, (_, i) => `${i}h`),
                    datasets: [
                        {
                            label: "Hourly Tweets",
                            data: hourlyTweetCounts,
                            backgroundColor: "rgba(192, 75, 192, 0.2)",
                            borderColor: "#c04bc0",
                            borderWidth: 2,
                            pointBackgroundColor: "#c04bc0",
                            pointBorderColor: "#fff",
                            pointHoverBackgroundColor: "#c04bc0",
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
    }, [trends]);

    const toggleView = () => setIsDaily((prev) => !prev);

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
                            <span>42,178</span>
                            <span>All Time</span>
                        </div>
                    </div>
                    <div className="stat">
                        <h3>Relevant Tweets</h3>
                        <div className="details">
                            <span>29,140</span>
                            <span>Filtered</span>
                        </div>
                    </div>
                    <div className="stat">
                        <h3>Tweets with Location</h3>
                        <div className="details">
                            <span>25,080</span>
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