const app = require('./app');
const connectDB = require('./db');

// Set the port
const port = process.env.PORT || 3000;

// Connect to the database
connectDB();

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});