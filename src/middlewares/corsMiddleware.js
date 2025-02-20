const cors = require("cors");

const corsMiddleware = cors({
  origin: "*", // Change this to your frontend URL for security
  methods: ["GET", "POST", "PUT", "DELETE"],
  //allowedHeaders: ["Content-Type", "Authorization"],
});

module.exports = corsMiddleware;
