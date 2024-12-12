const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId; // Attach userId to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

const protect = (req, res, next) => {
  let token;

  // Check if the token is in the authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get the token from the header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, "your_jwt_secret");

      // Attach the user to the request object
      req.user = decoded;

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  // If no token provided
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const authMiddleware = (req, res, next) => {
  // Get token from header
  const token = req.header("Authorization")?.split(" ")[1]; // Extract the token (format: "Bearer <token>")

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = decoded.user; // Add user info from token payload to the request
    next(); // Proceed to the next middleware or controller
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = protect;
module.exports = verifyToken;
module.exports = authMiddleware;
