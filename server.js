// Importing required modules
import express from "express"; // Importing Express.js framework
import bodyParser from "body-parser"; // Middleware to parse incoming request bodies
import axios from "axios"; // HTTP client for making requests

// Initializing Express application
const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true })); // Setting up body parser to handle URL encoded data
app.use(express.static("public")); // Serving static files from the 'public' directory

// Function to fetch data from an external API asynchronously
const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:8080/questions"); // Making GET request to external API
    return response.data; // Returning data received from the API
  } catch (error) {
    console.error("Error fetching data:", error); // Handling errors if any occur during fetching data
  }
};

// Route to render the main page
app.get("/", async (req, res) => {
  res.render("index.html"); // Rendering the HTML file for the main page
});

// Route to provide data for the quiz
app.get("/data", async (req, res) => {
  const data = await fetchData(); // Fetching data asynchronously
  res.send(data); // Sending the fetched data as a response
});

// Starting the server
app.listen(3000, () => {
  console.log("Server is connected!!!"); // Logging a message when the server is successfully started
});
