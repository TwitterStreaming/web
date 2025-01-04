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

/** @returns {Promise<import("./database_caller").TweetResponse>} */
export async function getAllTweets() {
    try {
        const res = await axios.get("http://127.0.0.1:8000/api/all/");
        return res.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

/** @returns {Promise<import("./database_caller").TrendsResponse>} */
export async function getTrendsTweetsOverTime(query, interval) {
    try {
        const res = await axios.get(
            `http://127.0.0.1:8000/api/trends/?q=${query}&interval=${interval}`,
        );
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

export async function getTotalTweets() {
    try {
        const res = await axios.get("http://127.0.0.1:8000/api/doc_count/");
        return res.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function getHashtagCount(query) {
    try {
        const res = await axios.get(
            `http://localhost:8000/api/hashtag_count/?q=%23${encodeURIComponent(query)}`,
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export async function searchHashtag(value) {
    try {
        const res = await axios.get(
            `http://localhost:8000/api/hatag_search/?q=${value}`,
        );
        return res.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
