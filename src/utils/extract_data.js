/** @param {import("../data/database_caller").TweetResponse} tweet
 * @returns {import("../data/database_caller").Location[]}
 * */
export function extractLocation(tweet) {
    return tweet.tweets.map((twt) => twt._source.geo_coordinates);
}
