import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");

    if (urlToken) {
      localStorage.setItem("jwt_token", urlToken);
      setToken(urlToken);
    } else {
      const storedToken = localStorage.getItem("jwt_token");
      if (storedToken) setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;

    axios
      .get("https://instamediaviewer-backend.onrender.com/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProfile(res.data);
        console.log("Profile response:", res.data);
      })
      .catch((e) => console.log("JWT Error:", e.message));
  }, [token]);

  if (!profile) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Welcome, {profile.username}</h2>
      <img src={profile.profile_picture_url} width={50}/>
      <h3>What is the type of Account: {profile.account_type}</h3>
    </div>
  );
};

export default Profile;
