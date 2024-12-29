import React, { useState, useEffect } from "react";
import GaugeChart from "react-gauge-chart";

const SentimentGaugeChart = () => {
  const [sentimentScore, setSentimentScore] = useState(0.5); // Initial sentiment score (neutral)

  // Simulate live sentiment score updates (mock data)
  useEffect(() => {
    const interval = setInterval(() => {
      const newScore = Math.random(); // Generate a random sentiment score between 0 and 1
      setSentimentScore(newScore);
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Live Sentiment Analysis</h3>
      <GaugeChart
        id="sentiment-gauge-chart"
        style={styles.chartStyle}
        nrOfLevels={20}
        arcsLength={[0.33, 0.33, 0.34]} // Dividing into 3 segments: Negative, Neutral, Positive
        colors={["#FF0000", "#FFA500", "#4CAF50"]} // Red for Negative, Orange for Neutral, Green for Positive
        percent={sentimentScore}
        arcPadding={0.02}
        textColor="black"
        formatTextValue={(value) => {
          const sentimentLabel = value < 0.33 ? "Negative" : value < 0.66 ? "Neutral" : "Positive";
          return `${sentimentLabel} - ${(value * 100).toFixed(2)}%`;
        }}
      />
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: "#e6e8fd", // Card background color
    borderRadius: "8px", // Rounded corners
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Shadow for card
    padding: "20px", // Padding inside the card
    width: "100%", // Maximum width for the card
    margin: "20px auto", // Center the card
    textAlign: "center", // Align text inside the card
    height: "100%",
  },
  title: {
    margin: "0 0 20px", // Space between title and chart
    fontSize: "18px", // Title font size
    color: "#333", // Title color
  },
  chartStyle: {
    height: 348, // Height for the chart
  },
};

export default SentimentGaugeChart;