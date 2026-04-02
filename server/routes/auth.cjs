const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db.cjs');
const { JWT_SECRET } = require('../middleware/auth.cjs');

const router = express.Router();

// Customer Signup
router.post('/customer/signup', (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        // Check if email already exists
        const existing = db.prepare('SELECT id FROM customers WHERE email = ?').get(email);
        if (existing) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const result = db.prepare(
            'INSERT INTO customers (name, email, phone, password) VALUES (?, ?, ?, ?)'
        ).run(name, email, phone || null, hashedPassword);

        const token = jwt.sign(
            { id: result.lastInsertRowid, email, name, type: 'customer' },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            token,
            user: { id: result.lastInsertRowid, name, email, phone, type: 'customer' }
        });
    } catch (err) {
        console.error('Customer signup error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Customer Login
router.post('/customer/login', (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const customer = db.prepare('SELECT * FROM customers WHERE email = ?').get(email);
        if (!customer) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const validPassword = bcrypt.compareSync(password, customer.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: customer.id, email: customer.email, name: customer.name, type: 'customer' },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: { id: customer.id, name: customer.name, email: customer.email, phone: customer.phone, type: 'customer' }
        });
    } catch (err) {
        console.error('Customer login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Vendor Signup
router.post('/vendor/signup', (req, res) => {
    try {
        const { businessName, email, phone, password, category } = req.body;

        if (!businessName || !email || !password || !category) {
            return res.status(400).json({ error: 'Business name, email, password, and category are required' });
        }

        const existing = db.prepare('SELECT id FROM vendors WHERE email = ?').get(email);
        if (existing) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const result = db.prepare(
            'INSERT INTO vendors (business_name, email, phone, password, category) VALUES (?, ?, ?, ?, ?)'
        ).run(businessName, email, phone || null, hashedPassword, category);

        const token = jwt.sign(
            { id: result.lastInsertRowid, email, businessName, type: 'vendor' },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            token,
            user: { id: result.lastInsertRowid, businessName, email, phone, category, type: 'vendor' }
        });
    } catch (err) {
        console.error('Vendor signup error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Vendor Login
router.post('/vendor/login', (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const vendor = db.prepare('SELECT * FROM vendors WHERE email = ?').get(email);
        if (!vendor) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const validPassword = bcrypt.compareSync(password, vendor.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: vendor.id, email: vendor.email, businessName: vendor.business_name, type: 'vendor' },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: vendor.id,
                businessName: vendor.business_name,
                email: vendor.email,
                phone: vendor.phone,
                category: vendor.category,
                type: 'vendor'
            }
        });
    } catch (err) {
        console.error('Vendor login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
