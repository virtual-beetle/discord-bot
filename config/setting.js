const debug = false;        // whether to open console log debug
const wordDicPath = "./config/sample.json";    // path for your word dictionary
const OPEN_CURRENCY_CONVENTOR_API_KEY = ''  // token for the currency conventor(see on https://free.currencyconverterapi.com/)

const token = 'your tokens'; // token for your bot

const regexResponses = {
    'hello|hi|hey': 'Hello there!',
    'goodbye|bye': 'Goodbye!',
    // Add more patterns and responses as needed
};

// DO NOT EDIT LINES BELOW
module.exports = {
    debug,
    wordDicPath,
    token
}
