/**
 * [TODO] Step 0: Import the dependencies, fs and papaparse
 */
const fs = require('fs')
const Papa = require('papaparse')

/**
 * [TODO] Step 1: Parse the Data
 *      Parse the data contained in a given file into a JavaScript objectusing the modules fs and papaparse.
 *      According to Kaggle, there should be 2514 reviews.
 * @param {string} filename - path to the csv file to be parsed
 * @returns {Object} - The parsed csv file of app reviews from papaparse.
 */
function parseData(filename) {
    const csv = fs.readFileSync(filename, 'utf8');
    const { data, errors, meta } = Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
    });
    // console.log('File content:', data);
    // console.log('File length:', data.length);
    // console.log("data", data);
    // console.log("data length", data.length);
    return data;

}

/**
 * [TODO] Step 2: Clean the Data
 *      Filter out every data record with null column values, ignore null gender values.
 *
 *      Merge all the user statistics, including user_id, user_age, user_country, and user_gender,
 *          into an object that holds them called "user", while removing the original properties.
 *
 *      Convert review_id, user_id, num_helpful_votes, and user_age to Integer
 *
 *      Convert rating to Float
 *
 *      Convert review_date to Date
 * @param {Object} csv - a parsed csv file of app reviews
 * @returns {Object} - a cleaned csv file with proper data types and removed null values
 */
function cleanData(csv) {
    function containsNull(record) {
        for (const key in record) {
            if (key !== 'user_gender' && (record[key] === null || record[key] === '')) {
                return true;
            }
        }
        return false;
    }

    function cleanRecord(record) {
        record.user = {
            user_id: parseInt(record.user_id),
            user_age: parseInt(record.user_age),
            user_country: record.user_country,
            user_gender: record.user_gender
        }
        delete record.user_id;
        delete record.user_age;
        delete record.user_country;
        delete record.user_gender;
        record.review_id = parseInt(record.review_id);
        record.num_helpful_votes = parseInt(record.num_helpful_votes);
        record.rating = parseFloat(record.rating);
        record.review_date = new Date(record.review_date);
        return record;
    }

    const cleaned = csv.filter(record => !containsNull(record)).map(record => {
        return cleanRecord(record);
    });
    // console.log("cleaned", cleaned);
    // console.log("cleaned length", cleaned.length);
    return cleaned;
}

/**
 * [TODO] Step 3: Sentiment Analysis
 *      Write a function, labelSentiment, that takes in a rating as an argument
 *      and outputs 'positive' if rating is greater than 4, 'negative' is rating is below 2,
 *      and 'neutral' if it is between 2 and 4.
 * @param {Object} review - Review object
 * @param {number} review.rating - the numerical rating to evaluate
 * @returns {string} - 'positive' if rating is greater than 4, negative is rating is below 2,
 *                      and neutral if it is between 2 and 4.
 */
function labelSentiment({ rating }) {}

/**
 * [TODO] Step 3: Sentiment Analysis by App
 *      Using the previous labelSentiment, label the sentiments of the cleaned data
 *      in a new property called "sentiment".
 *      Add objects containing the sentiments for each app into an array.
 * @param {Object} cleaned - the cleaned csv data
 * @returns {{app_name: string, positive: number, neutral: number, negative: number}[]} - An array of objects, each summarizing sentiment counts for an app
 */
function sentimentAnalysisApp(cleaned) {}

/**
 * [TODO] Step 3: Sentiment Analysis by Language
 *      Using the previous labelSentiment, label the sentiments of the cleaned data
 *      in a new property called "sentiment".
 *      Add objects containing the sentiments for each language into an array.
 * @param {Object} cleaned - the cleaned csv data
 * @returns {{lang_name: string, positive: number, neutral: number, negative: number}[]} - An array of objects, each summarizing sentiment counts for a language
 */
function sentimentAnalysisLang(cleaned) {}

/**
 * [TODO] Step 4: Statistical Analysis
 *      Answer the following questions:
 *
 *      What is the most reviewed app in this dataset, and how many reviews does it have?
 *
 *      For the most reviewed app, what is the most commonly used device?
 *
 *      For the most reviewed app, what the average star rating (out of 5.0)?
 *
 *      Add the answers to a returned object, with the format specified below.
 * @param {Object} cleaned - the cleaned csv data
 * @returns {{mostReviewedApp: string, mostReviews: number, mostUsedDevice: String, mostDevices: number, avgRating: float}} -
 *          the object containing the answers to the desired summary statistics, in this specific format.
 */
function summaryStatistics(cleaned) {}

/**
 * Do NOT modify this section!
 */
module.exports = {
    parseData,
    cleanData,
    sentimentAnalysisApp,
    sentimentAnalysisLang,
    summaryStatistics,
    labelSentiment
};
