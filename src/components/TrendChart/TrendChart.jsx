import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
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
} from 'chart.js';
import '../../styles/TrendChartStyle.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const Overview = () => {
    const [data, setData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Tweets Over Time',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: '#4bc0c0',
                borderWidth: 2,
                pointBackgroundColor: '#4bc0c0',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#4bc0c0',
                pointHoverBorderColor: '#fff',
                fill: true,
            },
        ],
    });

    useEffect(() => {
        // Mock API data for tweets
        const mockApiData = {
            hours: ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h', '23h'],
            hourlyTweetCounts: [15, 20, 18, 25, 30, 10, 5, 8, 40, 50, 45, 60, 80, 70, 55, 65, 75, 90, 85, 60, 50, 30, 20, 10],
            dailyTweetCounts: [120, 135, 150, 110, 180, 190, 200],
            days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        };

        // Aggregation: Switch between hourly and daily data (hourly by default)
        setData({
            labels: mockApiData.hours,
            datasets: [
                {
                    label: 'Hourly Tweets',
                    data: mockApiData.hourlyTweetCounts,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: '#4bc0c0',
                    borderWidth: 2,
                    pointBackgroundColor: '#4bc0c0',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#4bc0c0',
                    pointHoverBorderColor: '#fff',
                    fill: true,
                },
            ],
        });
    }, []);

    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: '#fff',
                },
            },
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: '#fff',
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#fff',
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
                    <Line data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default Overview;
