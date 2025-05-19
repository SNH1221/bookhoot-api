const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const FIREBASE_URL = 'https://bookhootbackend-default-rtdb.firebaseio.com/books.json';

// Route to check API is working
app.get('/', (req, res) => {
    res.send('BookHoot API is running');
});

// ✅ NEW: GET route for book list (for dashboard)
app.get('/getbook', async (req, res) => {
    try {
        const response = await axios.get(FIREBASE_URL);
        const books = response.data;

        res.json({
            success: true,
            data: books
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ✅ Existing: POST route to get book by ID
app.post('/getbook', async (req, res) => {
    const { book_id } = req.body;

    try {
        const response = await axios.get(FIREBASE_URL);
        const books = response.data;

        for (let key in books) {
            if (String(books[key].book_id) === String(book_id)) {
                return res.json({ success: true, book: books[key] });
            }
        }

        res.json({ success: false, message: 'Book not found' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
