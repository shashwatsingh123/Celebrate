const express = require('express');
const db = require('../db.cjs');
const { authenticateToken } = require('../middleware/auth.cjs');

const router = express.Router();

// Get vendor profile
router.get('/profile', authenticateToken, (req, res) => {
    try {
        if (req.user.type !== 'vendor') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const vendor = db.prepare('SELECT id, business_name, email, phone, category, available, work_start, work_end, created_at FROM vendors WHERE id = ?').get(req.user.id);
        if (!vendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }

        res.json(vendor);
    } catch (err) {
        console.error('Get vendor profile error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Toggle availability
router.patch('/availability', authenticateToken, (req, res) => {
    try {
        if (req.user.type !== 'vendor') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const vendor = db.prepare('SELECT available FROM vendors WHERE id = ?').get(req.user.id);
        const newAvailability = vendor.available ? 0 : 1;

        db.prepare('UPDATE vendors SET available = ? WHERE id = ?').run(newAvailability, req.user.id);

        res.json({ available: !!newAvailability });
    } catch (err) {
        console.error('Toggle availability error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update working hours
router.patch('/hours', authenticateToken, (req, res) => {
    try {
        if (req.user.type !== 'vendor') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const { workStart, workEnd } = req.body;
        if (!workStart || !workEnd) {
            return res.status(400).json({ error: 'Start and end times are required' });
        }

        db.prepare('UPDATE vendors SET work_start = ?, work_end = ? WHERE id = ?').run(workStart, workEnd, req.user.id);

        res.json({ message: 'Working hours updated', workStart, workEnd });
    } catch (err) {
        console.error('Update hours error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add blocked date
router.post('/blocked-dates', authenticateToken, (req, res) => {
    try {
        if (req.user.type !== 'vendor') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const { date } = req.body;
        if (!date) {
            return res.status(400).json({ error: 'Date is required' });
        }

        // Check if date already blocked
        const existing = db.prepare('SELECT id FROM blocked_dates WHERE vendor_id = ? AND date = ?').get(req.user.id, date);
        if (existing) {
            return res.status(409).json({ error: 'Date already blocked' });
        }

        db.prepare('INSERT INTO blocked_dates (vendor_id, date) VALUES (?, ?)').run(req.user.id, date);

        res.status(201).json({ message: 'Date blocked successfully' });
    } catch (err) {
        console.error('Add blocked date error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get blocked dates
router.get('/blocked-dates', authenticateToken, (req, res) => {
    try {
        if (req.user.type !== 'vendor') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const dates = db.prepare('SELECT * FROM blocked_dates WHERE vendor_id = ? ORDER BY date ASC').all(req.user.id);
        res.json(dates);
    } catch (err) {
        console.error('Get blocked dates error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get vendor stats
router.get('/stats', authenticateToken, (req, res) => {
    try {
        if (req.user.type !== 'vendor') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const totalBookings = db.prepare('SELECT COUNT(*) as count FROM bookings WHERE vendor_id = ?').get(req.user.id);

        const thisMonthStart = new Date();
        thisMonthStart.setDate(1);
        thisMonthStart.setHours(0, 0, 0, 0);
        const thisMonth = db.prepare('SELECT COUNT(*) as count FROM bookings WHERE vendor_id = ? AND created_at >= ?').get(req.user.id, thisMonthStart.toISOString());

        const totalRevenue = db.prepare('SELECT COALESCE(SUM(amount), 0) as total FROM bookings WHERE vendor_id = ? AND status IN (?, ?)').get(req.user.id, 'confirmed', 'completed');

        const avgRating = db.prepare('SELECT COALESCE(AVG(rating), 0) as avg FROM reviews WHERE vendor_id = ?').get(req.user.id);

        res.json({
            totalBookings: totalBookings.count,
            thisMonth: thisMonth.count,
            totalRevenue: totalRevenue.total,
            avgRating: Math.round(avgRating.avg * 10) / 10
        });
    } catch (err) {
        console.error('Get vendor stats error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
