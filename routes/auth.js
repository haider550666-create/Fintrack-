const express = require('express');
const { protect } = require('../middleware/auth');

const router = express.Router();

// ─── POST /api/auth/register ─────────────────────────────────────────────────
// Auth is disabled - all users are treated as guest
router.post('/register', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Registration not required. Access the dashboard directly.',
        token: 'guest-token',
        user: { id: '000000000000000000000000', name: req.body.name || 'Guest User', email: req.body.email || '' }
    });
});

// ─── POST /api/auth/login ────────────────────────────────────────────────────
router.post('/login', (req, res) => {
    res.json({
        success: true,
        message: 'Login not required. Access the dashboard directly.',
        token: 'guest-token',
        user: { id: '000000000000000000000000', name: 'Guest User', email: req.body.email || '' }
    });
});

// ─── GET /api/auth/me ────────────────────────────────────────────────────────
router.get('/me', protect, (req, res) => {
    res.json({ success: true, user: req.user });
});

// ─── PATCH /api/auth/language ────────────────────────────────────────────────
router.patch('/language', protect, (req, res) => {
    res.json({ success: true, message: 'Language preference updated.' });
});

// ─── POST /api/auth/logout ────────────────────────────────────────────────────
router.post('/logout', protect, (req, res) => {
    res.json({ success: true, message: 'Logged out successfully.' });
});

module.exports = router;
