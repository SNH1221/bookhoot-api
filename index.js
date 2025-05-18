const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const FIREBASE_URL = 'https://bookhootbackend-default-rtdb.firebaseio.com/books.json';

app.post('/getbook', async (req, res) => {
  const { book_id } = req.body;

  try {
    const response = await axios.get(FIREBASE_URL);
    const books = response.data;

    for (let key in books) {
      if (books[key].book_id == book_id) {
        return res.json({ success: true, book: books[key] });
      }
    }

    res.json({ success: false, message: "Book not found" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('BookHoot API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});