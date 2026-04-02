const express = require('express');
const cors = require('cors');
const path = require('path');

// Initialize database (creates tables if not exist)
require('./db.cjs');

const authRoutes = require('./routes/auth.cjs');
const eventRoutes = require('./routes/events.cjs');
const bookingRoutes = require('./routes/bookings.cjs');
const reviewRoutes = require('./routes/reviews.cjs');
const vendorRoutes = require('./routes/vendors.cjs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/vendors', vendorRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`✅ Celebrate API server running on http://localhost:${PORT}`);
});
