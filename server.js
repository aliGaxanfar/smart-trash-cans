const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Use CORS middleware
app.use(cors());

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Hashim@1234',
  database: 'Bins',
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Endpoint to handle form submission
app.post('/store', (req, res) => {
  const { status, location } = req.body;
  console.log("Data received:", req.body);

  // Insert data into the Trash_Cans_Tetovo table
  const query = 'INSERT INTO Trash_Cans_Tetovo (status, location) VALUES (?, ?)';
  connection.query(query, [status, location], (error, results, fields) => {
    if (error) {
      console.error('Error storing data:', error);
      res.status(500).json({ error: 'Error storing data' });
      return;
    }
    console.log('Data stored successfully');
    res.status(200).json({ message: 'Data stored successfully' });
  });
});

// Endpoint to fetch all data
app.get('/store', (req, res) => {
  const query = 'SELECT * FROM Trash_Cans_Tetovo';
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }
    // Ensure all data is correctly formatted
    const formattedResults = results.map(row => ({
      id: row.id,
      status: row.Status ? row.Status : 'undefined',
      location: row.Location ? row.Location : 'undefined'
    }));
    res.status(200).json(formattedResults);
  });
});


app.get('/trucks', (req, res) => {
  const query = 'SELECT bins.bin_id,bins.latitude bin_latitude,bins.longitude bin_longitude,trucks.idtrucks,trucks.latitude trucks_latitude,trucks.longitude trucks_longitude,get_distance_km(trucks.latitude,trucks.longitude,bins.latitude,bins.longitude) distance FROM bins INNER JOIN trucks';
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }
    // Ensure all data is correctly formatted
    const trashBinsWithDistance = results.map(bin => ({
      idtrucks: bin.idtrucks,
      bin_id: bin.bin_id,
      bin_latitude: bin.bin_latitude,
      bin_longitude: bin.bin_longitude,
      truck_latitude: bin.trucks_latitude,
      truck_longitude: bin.trucks_longitude,
      distance: bin.distance
    }));
    res.status(200).json(trashBinsWithDistance);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
