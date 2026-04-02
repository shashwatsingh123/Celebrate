const express = require('express');
const db = require('../db.cjs');
const { authenticateToken } = require('../middleware/auth.cjs');

const router = express.Router();

// Create event plan
router.post('/', authenticateToken, (req, res) => {
    try {
        if (req.user.type !== 'customer') {
            return res.status(403).json({ error: 'Only customers can create events' });
        }

        const { eventType, eventDate, guestCount, budget, address, city, pincode, services, specialRequests } = req.body;

        if (!eventType || !eventDate || !guestCount || !budget || !address || !city || !pincode) {
            return res.status(400).json({ error: 'All required fields must be provided' });
        }

        const result = db.prepare(`
      INSERT INTO events (customer_id, event_type, event_date, guest_count, budget, address, city, pincode, services, special_requests)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
            req.user.id,
            eventType,
            eventDate,
            parseInt(guestCount),
            budget,
            address,
            city,
            pincode,
            JSON.stringify(services || []),
            specialRequests || null
        );

        // Auto-create bookings for matching vendors based on selected services
        const serviceCategories = services || [];
        if (serviceCategories.length > 0) {
            const vendors = db.prepare(
                `SELECT * FROM vendors WHERE category IN (${serviceCategories.map(() => '?').join(',')}) AND available = 1`
            ).all(...serviceCategories);

            const insertBooking = db.prepare(`
        INSERT INTO bookings (event_id, vendor_id, customer_id, event_name, amount, status, location, event_date)
        VALUES (?, ?, ?, ?, ?, 'pending', ?, ?)
      `);

            for (const vendor of vendors) {
                insertBooking.run(
                    result.lastInsertRowid,
                    vendor.id,
                    req.user.id,
                    eventType,
                    0,
                    `${city}, ${pincode}`,
                    eventDate
                );
            }
        }

        res.status(201).json({
            id: result.lastInsertRowid,
            message: 'Event plan created successfully'
        });
    } catch (err) {
        console.error('Create event error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get customer's events
router.get('/my', authenticateToken, (req, res) => {
    try {
        if (req.user.type !== 'customer') {
            return res.status(403).json({ error: 'Access denied' });
        }

        const events = db.prepare(
            'SELECT * FROM events WHERE customer_id = ? ORDER BY created_at DESC'
        ).all(req.user.id);

        // Parse services JSON
        const parsed = events.map(e => ({
            ...e,
            services: JSON.parse(e.services)
        }));

        res.json(parsed);
    } catch (err) {
        console.error('Get events error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
