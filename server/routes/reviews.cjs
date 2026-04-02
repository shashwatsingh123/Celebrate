const express = require('express');
const db = require('../db.cjs');
const { authenticateToken } = require('../middleware/auth.cjs');

const router = express.Router();

// Create review
router.post('/', authenticateToken, (req, res) => {
    try {
        if (req.user.type !== 'customer') {
            return res.status(403).json({ error: 'Only customers can write reviews' });
        }

        const { bookingId, vendorId, rating, comment } = req.body;

        if (!bookingId || !vendorId || !rating || !comment) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if review already exists
        const existing = db.prepare('SELECT id FROM reviews WHERE booking_id = ? AND customer_id = ?').get(bookingId, req.user.id);
        if (existing) {
            return res.status(409).json({ error: 'Review already submitted for this booking' });
        }

        const result = db.prepare(`
      INSERT INTO reviews (booking_id, customer_id, vendor_id, rating, comment)
      VALUES (?, ?, ?, ?, ?)
    `).run(bookingId, req.user.id, vendorId, rating, comment);

        res.status(201).json({
            id: result.lastInsertRowid,
            message: 'Review submitted successfully'
        });
    } catch (err) {
        console.error('Create review error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get customer reviews
router.get('/customer', authenticateToken, (req, res) => {
    try {
        if (req.user.type !== 'customer') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const reviews = db.prepare(`
      SELECT r.*, v.business_name as vendor_name, b.event_name, b.event_date
      FROM reviews r
      LEFT JOIN vendors v ON r.vendor_id = v.id
      LEFT JOIN bookings b ON r.booking_id = b.id
      WHERE r.customer_id = ?
      ORDER BY r.created_at DESC
    `).all(req.user.id);

        res.json(reviews);
    } catch (err) {
        console.error('Get customer reviews error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get vendor reviews
router.get('/vendor', authenticateToken, (req, res) => {
    try {
        if (req.user.type !== 'vendor') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const reviews = db.prepare(`
      SELECT r.*, c.name as customer_name, b.event_name
      FROM reviews r
      LEFT JOIN customers c ON r.customer_id = c.id
      LEFT JOIN bookings b ON r.booking_id = b.id
      WHERE r.vendor_id = ?
      ORDER BY r.created_at DESC
    `).all(req.user.id);

        res.json(reviews);
    } catch (err) {
        console.error('Get vendor reviews error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
