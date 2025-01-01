import axios from "axios";

export async function getMostRelevantTweet() {
    try {
        const res = await axios.get(
            "http://127.0.0.1:8000/api/most-used-hashtag/",
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

/**
 * @param {string} text
 */
export async function searchByKeyword(text) {
    try {
        const res = await axios.get(
            `http://127.0.0.1:8000/api/search/?q=${text}`,
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

/**
 * @param {string} hashtag
 */
export async function searchByHashtag(hashtag) {
    try {
        const res = await axios.get(
            `http://127.0.0.1:8000/api/tweets/hashtag/?hashtag=${hashtag}`,
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

/** @returns {import("./database_caller").TweetResponse[]} */
export async function getAllTweets() {
    try {
        const res = await axios.get("http://127.0.0.1:8000/api/all");
        return res.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

/** @returns {import("./database_caller").SentimentAnalysisResponse} */
export async function getAverageSentimentAnalysis(text) {
    try {
        const res = await axios.get(
            `http://127.0.0.1:8000/api/sentiment/?q=${text}`,
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}