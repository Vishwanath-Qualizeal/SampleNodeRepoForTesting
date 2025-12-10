// /**
//  * Tests for banking API
//  * These tests will EXECUTE the code and generate coverage!
//  */

// const request = require('supertest');
// const express = require('express');

// // Import the app logic (we'll refactor server.js slightly)
// // For now, let's create a simple test

// describe('Banking API Tests', () => {

//     let app;

//     beforeAll(() => {
//         // Create Express app for testing
//         app = express();

//         // Define routes (same as server.js)
//         app.get('/', (req, res) => {
//             res.json({ message: 'Banking API' });
//         });

//         app.get('/transfer', (req, res) => {
//             const amount = req.query.amount || 0;
//             res.json({
//                 status: 'success',
//                 amount: amount,
//                 message: 'Transfer processed'
//             });
//         });

//         app.get('/balance', (req, res) => {
//             // This route is NOT tested → Will show as uncovered!
//             res.json({
//                 balance: 1000,
//                 currency: 'USD'
//             });
//         });
//     });

//     // TEST 1: Home endpoint
//     test('GET / should return welcome message', async () => {
//         const response = await request(app).get('/');

//         expect(response.status).toBe(200);
//         expect(response.body.message).toBe('Banking API');
//     });

//     // TEST 2: Transfer endpoint with amount
//     test('GET /transfer?amount=100 should process transfer', async () => {
//         const response = await request(app).get('/transfer?amount=100');

//         expect(response.status).toBe(200);
//         expect(response.body.status).toBe('success');
//         expect(response.body.amount).toBe('100');
//     });

//     // TEST 3: Transfer endpoint without amount
//     test('GET /transfer should use default amount', async () => {
//         const response = await request(app).get('/transfer');

//         expect(response.status).toBe(200);
//         expect(response.body.amount).toBe(0);
//     });

//     // NOTE: We're NOT testing GET /balance
//     // This will show as UNCOVERED in coverage report!
// });


/**
 * Tests for banking API
 * NOW imports the REAL server.js!
 */

const request = require('supertest');
const app = require('../server');  // ← Import REAL server.js!

describe('Banking API Tests', () => {

    // TEST 1: Home endpoint
    test('GET / should return welcome message', async () => {
        const response = await request(app).get('/');  // ← Tests REAL server.js!

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Banking API');
    });

    // TEST 2: Transfer endpoint with amount
    test('GET /transfer?amount=100 should process transfer', async () => {
        const response = await request(app).get('/transfer?amount=100');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        expect(response.body.amount).toBe('100');
    });

    // TEST 3: Transfer endpoint without amount
    test('GET /transfer should use default amount', async () => {
        const response = await request(app).get('/transfer');

        expect(response.status).toBe(200);
        expect(response.body.amount).toBe(0);
    });

    // TEST 4: Transfer with large amount (error case)
    test('GET /transfer?amount=20000 should reject large amount', async () => {
        const response = await request(app).get('/transfer?amount=20000');

        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Amount exceeds limit');
    });

    // NOTE: We're NOT testing GET /balance or GET /withdraw
    // This will show as UNCOVERED in coverage report!

});