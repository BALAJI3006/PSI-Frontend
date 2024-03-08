import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../Style/Sidepanel.css'

const SidePanel = () => {
  const [userData, setUserData] = useState({
    name: '',
    profilePic: '',
    description: '',
  });

  const [editing, setEditing] = useState(false);

  const sideTextRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Replace 'YOUR_API_ENDPOINT' with the actual endpoint to fetch user data
    axios.get('YOUR_API_ENDPOINT/user')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []); // Empty dependency array ensures that the effect runs only once on mount

  const handleEditButtonClick = () => {
    setEditing(!editing);

    if (editing) {
      // Save the changes to the server here
    }
  };


  
  useEffect(() => {
    setUserData({
      name: "Anand Sarma",
      description: "I am a Coding enthusiast and also a self-taught 3D artist working on various types of Conceptual artworks. I love connecting with like-minded people and using my passion and skills to make a difference.",
      profilePic: "URL_to_Image"
    });
  }, []);
  







  const handleFocus = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);

    // Save the changes to the server here
  };

  return (
    <div className="side-panel">
      <div className='sideCircle'>
        <img src={userData.profilePic} alt="Profile" />
      </div>
      <div className='sideText' ref={sideTextRef}>
        <div>
          <h3 contentEditable={editing ? 'true' : 'false'} onFocus={handleFocus} onBlur={handleBlur}>{userData.name}</h3>
          <p contentEditable={editing ? 'true' : 'false'} onFocus={handleFocus} onBlur={handleBlur}>{userData.description}</p>
        </div>
      </div>
      
      <button className="edit-profile-button" onClick={handleEditButtonClick}>
        {editing ? 'Save' : 'Edit Profile'}
      </button>

      <div className="settings-logout-container">
        <button className="settings-button">Settings</button>
        <button className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default SidePanel;