// utils/jsonbin.js

// Using a publicly accessible free JSONBin for demo applications
// This bypasses Vercel's read-only filesystem without requiring MongoDB setup
const BIN_ID = process.env.JSONBIN_ID || '67c2a71cad19ca34f814bc7c';
const MASTER_KEY = process.env.JSONBIN_KEY || '$2a$10$wE9q.OQk3g.A2.A2.A2.A2.A2.A2.A2.A2.A2.A2.A2.A2.A2.A2.'; // Replace with actual keys if provided in .env

const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// Headers required for authentication and JSON formatting
const headers = {
    'Content-Type': 'application/json',
    'X-Master-Key': MASTER_KEY
};

/**
 * Fetch all records from the cloud JSONBin
 * @returns {Promise<Array>} Array of financial records
 */
const getRecords = async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers
        });
        const data = await response.json();
        return data.record || [];
    } catch (error) {
        console.error('JSONBin GET Error:', error.message);
        return [];
    }
};

/**
 * Save records array back to the cloud JSONBin
 * @param {Array} records - The modified array of financial records
 * @returns {Promise<Boolean>} Success status
 */
const saveRecords = async (records) => {
    try {
        await fetch(API_URL, {
            method: 'PUT',
            headers,
            body: JSON.stringify(records)
        });
        return true;
    } catch (error) {
        console.error('JSONBin PUT Error:', error.message);
        return false;
    }
};

module.exports = {
    getRecords,
    saveRecords
};
