const express = require("express"); // Used to set up a server
const cors = require("cors"); // Used to prevent errors when working locally

const app = express(); // Initialize express as an app variable
app.set("port", process.env.PORT || 8080); // Set the port
app.use(express.json()); // Enable the server to handle JSON requests
app.use(cors()); // Dont let local development give errors

// app.get("/", (req, res) => {
//   res.json({ msg: "Welcome" });
// });
const jwt = require("jsonwebtoken");
// const bcrypt = require("")
app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: false }));

// app.get("/", function (req, res) {
//   res.sendFile(__dirnamev + "/" + "index.html");
// });

const userRoutes = require("./Routes/userRoute");
app.use("/users", userRoutes);
// app.use("/users/register", userRoutes);
// app.use("/users/login", userRoutes);

const productsRoutes = require("./Routes/productsRoute");
app.use("/products", productsRoutes);

// const orderRoutes = require("./Routes/orderRoute");
// app.use("/orders", orderRoutes);

// const categoriesRoutes = require("./Routes/categoriesRoute");
// app.use("/categories", categoriesRoutes);

app.listen(app.get("port"), () => {
  console.log(`Listening for calls on port ${app.get("port")}`);
  console.log("Press Ctrl+C to exit server");
});
