import React, { useState } from "react";
import { getHashtagCount, searchHashtag } from "../../data/database_caller";

const Search = () => {
    const [query, setQuery] = useState("");
    const [suggestion, setSuggestion] = useState("");
    const [hashtagData, setHashtagData] = useState(null);
    const [error, setError] = useState("");

    const fetchSuggestion = async (value) => {
        if (!value) {
            setSuggestion("");
            return;
        }

        try {
            const response = await searchHashtag(value);
            const matchingHashtag = response?.tweets;

            if (matchingHashtag) {
                setSuggestion(matchingHashtag);
            } else {
                setSuggestion("");
            }
        } catch (err) {
            console.error("Error fetching suggestions:", err);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        fetchSuggestion(value);
    };

    const handleKeyDown = (e) => {
        if ((e.key === "Tab" || e.key === "Enter") && suggestion) {
            e.preventDefault();
            setQuery(suggestion);
            setSuggestion("");
        }
    };

    const handleSubmit = async () => {
        if (!query) {
            setError("Please enter a hashtag.");
            return;
        }
        setError("");

        try {
            const data = await getHashtagCount(query);

            if (data?.tweet_count) {
                setHashtagData({
                    hashtag: query,
                    tweetCount: data.tweet_count,
                });
            } else {
                setError("No data found for this hashtag.");
            }
        } catch (err) {
            console.error("Error fetching tweet count:", err);
            setError("Failed to fetch tweet count.");
        }
    };

    return (
        <div
            style={{
                marginTop: "200px",
                textAlign: "center",
                height: "500px",
            }}
        >
            <h1>Autocomplete Hashtag Search</h1>
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        width: "50%",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        padding: "8px",
                        fontSize: "16px",
                    }}
                >
                    <input
                        type="text"
                        value={query}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Search by hashtag..."
                        style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            fontSize: "16px",
                            paddingRight: "20px",
                        }}
                    />

                    {suggestion && suggestion.slice(1).startsWith(query) && (
                        <span
                            style={{
                                position: "absolute",
                                color: "#ccc",
                                left: `${suggestion.length * 5}px`,
                                pointerEvents: "none",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {suggestion.slice(1).slice(query.length)}
                        </span>
                    )}
                </div>
            </div>

            <button
                style={{ marginTop: "10px" }}
                className="button-type"
                onClick={handleSubmit}
            >
                Submit
            </button>

            {error && <div style={{ color: "red" }}>{error}</div>}

            {hashtagData && (
                <div
                    style={{
                        marginTop: "20px",
                        padding: "30px",
                        border: "1px solid rgb(204, 204, 204)",
                        borderRadius: "4px",
                        backgroundColor: "rgb(249, 249, 249)",
                        width: "200px",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    <h3>Hashtag: {hashtagData.hashtag}</h3>
                    <p>Tweet Count: {hashtagData.tweetCount}</p>
                </div>
            )}
        </div>
    );
};

export default Search;
