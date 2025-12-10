const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Route 1: Home (WILL BE TESTED)
app.get('/', (req, res) => {
    res.json({ message: 'Banking API' });
});

// Route 2: Transfer (WILL BE TESTED)
app.get('/transfer', (req, res) => {
    const amount = req.query.amount || 0;

    // Business logic
    if (amount > 10000) {
        return res.status(400).json({
            error: 'Amount exceeds limit'
        });
    }

    res.json({
        status: 'success',
        amount: amount,
        message: 'Transfer processed'
    });
});

// Route 3: Balance (NOT TESTED - will show as uncovered!)
app.get('/balance', (req, res) => {
    const accountId = req.query.accountId;

    // This code will show as UNCOVERED because no test calls it!
    if (!accountId) {
        return res.status(400).json({
            error: 'Account ID required'
        });
    }

    res.json({
        accountId: accountId,
        balance: 1000,
        currency: 'USD'
    });
});

// Route 4: Withdraw (NOT TESTED - will show as uncovered!)
app.get('/withdraw', (req, res) => {
    // This entire route is uncovered!
    const amount = req.query.amount || 0;

    if (amount > 500) {
        return res.status(400).json({
            error: 'Withdrawal limit exceeded'
        });
    }

    res.json({
        status: 'success',
        withdrawn: amount
    });
});

// ============================================
// IMPORTANT: Only start server if not in test!
// ============================================
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Banking API running on port ${PORT}`);
    });
}

// ============================================
// IMPORTANT: Export app for testing!
// ============================================
module.exports = app;