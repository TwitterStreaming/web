import React from "react";
import { useAverageSentiment } from "../../context/useSentimentAnalysis";

const SentimentGaugeChart = () => {
    const { averageSentiment } = useAverageSentiment();

    const sentimentPolarity =
        averageSentiment?.average_sentiment?.average_polarity || 0;

    const getGaugeInfo = (polarity) => {
        if (polarity > 0.1)
            return {
                label: "Positive",
                color: "#4CAF50",
                textColor: "#2E7D32",
            };
        if (polarity < -0.1)
            return {
                label: "Negative",
                color: "#F44336",
                textColor: "#C62828",
            };
        return {
            label: "Neutral",
            color: "#FFC107",
            textColor: "#FF8F00",
        };
    };

    const { label, color, textColor } = getGaugeInfo(sentimentPolarity);
    const percentage = ((sentimentPolarity + 1) / 2) * 100;

    return (
        <div style={styles.container}>
            <div style={styles.title}>Sentiment Analysis</div>

            <div style={styles.gauge}>
                <div
                    style={{
                        ...styles.fill,
                        width: `${percentage}%`,
                        backgroundColor: color,
                    }}
                />
                <div
                    style={{
                        ...styles.marker,
                        left: `${percentage}%`,
                    }}
                />
            </div>

            <div style={{ ...styles.score, color: textColor }}>
                {sentimentPolarity.toFixed(2)}
            </div>
            <div style={{ ...styles.label, color: textColor }}>{label}</div>
        </div>
    );
};

const styles = {
    container: {
        width: "auto",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    title: {
        fontSize: "24px",
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: "20px",
        color: "#333",
    },
    gauge: {
        width: "100%",
        height: "60px",
        backgroundColor: "#e0e0e0",
        borderRadius: "30px",
        position: "relative",
        overflow: "hidden",
    },
    fill: {
        height: "100%",
        transition: "width 0.5s ease-in-out, background-color 0.5s ease-in-out",
        borderRadius: "30px",
    },
    marker: {
        position: "absolute",
        width: "4px",
        height: "20px",
        backgroundColor: "#333",
        top: "50%",
        transform: "translateY(-50%)",
        transition: "left 0.5s ease-in-out",
    },
    score: {
        fontSize: "32px",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: "20px",
    },
    label: {
        fontSize: "18px",
        textAlign: "center",
        marginTop: "10px",
        textTransform: "uppercase",
        letterSpacing: "1px",
    },
};

export default SentimentGaugeChart;