

import React from "react";

const Home = () => {
  const handleLogin = () => {
    // Redirect to the Instagram login endpoint
    // window.location.href = "http://localhost:5000/auth/instagram";
    window.location.href =
    "https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=3192770500861287&redirect_uri=https://be91-2409-40e4-204a-bdb4-d1fa-727-d169-197b.ngrok-free.app/auth/redirect&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights";
  };

  return (
    <div>
      <h1>Login with Instagram</h1>
      <button onClick={handleLogin}>Login with Instagram</button>
    </div>
  );
};

export default Home;

