const express = require('express');
const db = require('../db.cjs');
const { authenticateToken } = require('../middleware/auth.cjs');

const router = express.Router();

// Get customer bookings
router.get('/customer', authenticateToken, (req, res) => {
    try {
        if (req.user.type !== 'customer') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const bookings = db.prepare(`
      SELECT b.*, v.business_name as vendor_name, v.category as vendor_category,
             (SELECT COUNT(*) FROM reviews r WHERE r.booking_id = b.id) as has_review
      FROM bookings b
      LEFT JOIN vendors v ON b.vendor_id = v.id
      WHERE b.customer_id = ?
      ORDER BY b.created_at DESC
    `).all(req.user.id);

        const mapped = bookings.map(b => ({
            id: `BK${String(b.id).padStart(3, '0')}`,
            rawId: b.id,
            event: b.event_name,
            vendor: b.vendor_name || 'Unknown Vendor',
            vendorId: b.vendor_id,
            date: b.event_date,
            status: b.status === 'confirmed' || b.status === 'completed'
                ? (new Date(b.event_date) < new Date() ? 'completed' : 'upcoming')
                : b.status,
            amount: b.amount,
            location: b.location || 'Not specified',
            canReview: b.has_review === 0 && (b.status === 'completed' || (b.status === 'confirmed' && new Date(b.event_date) < new Date()))
        }));

        res.json(mapped);
    } catch (err) {
        console.error('Get customer bookings error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get vendor orders
router.get('/vendor', authenticateToken, (req, res) => {
    try {
        if (req.user.type !== 'vendor') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const orders = db.prepare(`
      SELECT b.*, c.name as customer_name, c.phone as customer_phone
      FROM bookings b
      LEFT JOIN customers c ON b.customer_id = c.id
      WHERE b.vendor_id = ?
      ORDER BY b.created_at DESC
    `).all(req.user.id);

        const mapped = orders.map(o => ({
            id: `ORD${String(o.id).padStart(3, '0')}`,
            rawId: o.id,
            customer: o.customer_name || 'Unknown Customer',
            event: o.event_name,
            date: o.event_date,
            amount: o.amount,
            status: o.status,
            location: o.location || 'Not specified'
        }));

        res.json(mapped);
    } catch (err) {
        console.error('Get vendor orders error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update booking status (accept/decline)
router.patch('/:id/status', authenticateToken, (req, res) => {
    try {
        if (req.user.type !== 'vendor') {
            return res.status(403).json({ error: 'Only vendors can update booking status' });
        }

        const { status } = req.body;
        if (!['confirmed', 'declined', 'completed'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const booking = db.prepare('SELECT * FROM bookings WHERE id = ? AND vendor_id = ?').get(req.params.id, req.user.id);
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        db.prepare('UPDATE bookings SET status = ? WHERE id = ?').run(status, req.params.id);

        res.json({ message: 'Booking status updated', status });
    } catch (err) {
        console.error('Update booking status error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
