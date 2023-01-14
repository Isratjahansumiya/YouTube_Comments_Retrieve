const express = require('express');
const cors = require("cors");
const app = express();
const axios = require("axios");
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;
require("dotenv").config();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get("/comments/:videoId", async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${process.env.API_KEY}`
    );
    const json = response.data;
    const comments = json.items;
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving comments" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})