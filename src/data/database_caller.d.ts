export type MostRelevantTweet = {
    hashtag: string;
    count: number;
};

export type Location = {
    lat: number;
    lon: number;
}

export type Sentiment = {
    polarity: number;
    subjectivity: number;
}

export type TweetSource = {
    text: string;
    geo_coordinates: Location;
    created_at: string;
    hashtags: string[];
    sentiment: Sentiment;
}

export type Tweet = {
    _index: string;
    _id: string;
    _score: number;
    _source: TweetSource;
}

export type TweetResponse = {
    total: number;
    tweets: Tweet[];
}

export type SentimentAnalysisResponse = {
    average_sentiment: {
        average_polarity: number;
        average_subjectivity: number;
    }
}

export declare async function getMostRelevantTweet(): Promise<MostRelevantTweet>;
export declare async function searchByKeyword(text: string): Promise<TweetResponse[]>;
export declare async function searchByHashtag(hashtag: string): Promise<TweetResponse[]>;
export declare async function getAllTweets(): Promise<TweetResponse[]>;
export declare async function getAverageSentimentAnalysis(text: string): Promise<SentimentAnalysisResponse>;
