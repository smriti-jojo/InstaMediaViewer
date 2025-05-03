require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const JWT_SECRET = "super-secret-jwt-key"; // Move this to environment variable in production

// Instagram Credentials
const APP_ID = process.env.APP_ID;
const APP_SECRET = process.env.APP_SECRET;
const REDIRECT_URI = "https://instamediaviewer-backend.onrender.com/auth/redirect";

// Step 1: Instagram Login
app.get("/auth/instagram", (req, res) => {
  const authURL = `https://api.instagram.com/oauth/authorize?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
  res.redirect(authURL);
});

// Step 2: Handle Redirect & Exchange Code for Access Token
app.get("/auth/redirect", async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post(
      "https://api.instagram.com/oauth/access_token",
      new URLSearchParams({
        client_id: APP_ID,
        client_secret: APP_SECRET,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
        code: code,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, user_id } = response.data;

    // Create JWT
    const token = jwt.sign({ access_token, user_id }, JWT_SECRET, { expiresIn: "1h" });

    // Send JWT to frontend (could be via redirect + query param or response body)
    res.redirect(`http://localhost:3000/profile?token=${token}`);
  } catch (error) {
    console.error("Error exchanging code for access token:", error.message);
    res.status(500).send("Error fetching access token");
  }
});

// Middleware to verify JWT
function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized: Token missing");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Contains access_token and user_id
    next();
  } catch (err) {
    return res.status(403).send("Forbidden: Invalid token");
  }
}

// Step 3: Fetch Profile Data
app.get("/profile", authenticateJWT, async (req, res) => {
  const token = req.user.access_token;

  try {
    const profile = await axios.get(`https://graph.instagram.com/me`, {
      params: {
        fields: "id,username,account_type,media_count,profile_picture_url",
        access_token: token,
      },
    });

    res.json(profile.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Step 4: Fetch User Media
app.get("/media", authenticateJWT, async (req, res) => {
  const token = req.user.access_token;

  try {
    const response = await axios.get(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,timestamp&access_token=${token}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching media data:", error.message);
    res.status(500).send("Error fetching media data");
  }
});

// Webhook Endpoint (Unauthenticated)
app.post("/webhook/instagram", (req, res) => {
  const event = req.body;
  console.log("Webhook event received:", event);
  res.status(200).send("EVENT_RECEIVED");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


