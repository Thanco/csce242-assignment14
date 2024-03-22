const express = require('express');
// const axios = require('axios');
// const jsonURL = 'https://portiaportia.github.io/json/crafts.json';
const jsonPath = __dirname + '/public/crafts/crafts.json';

const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.status(200).send(__dirname + '/public/index.html');
});

// app.get('/api/crafts', async (req, res) => {
//     try {
//         const response = await axios.get(jsonURL);
//         const jsonData = response.data;
//         res.json(jsonData);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Internal Server Error');
//     }
// });

app.get('/api/crafts', async (req, res) => {
    const crafts = require(jsonPath);
    res.json(crafts);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});