import React, { useState, useEffect } from "react";
import { auth, storage, firestore } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import VideoCard from "./Videocard.jsx";
import logo from './instagram.png';
import "./home.css";
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

const Home = () => {
  const user = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [videos, setVideos] = useState([]); // State to store video data
  const navigate = useNavigate();
  let firstName = '';
  if (user) {
    firstName = user.displayName ? user.displayName.split(' ')[0].trim() : ' ';
  }

  useEffect(() => {
    console.log("Setting up Firestore listener");

    // Reference to the 'videos' collection
    const videosCollection = collection(firestore, 'videos');
    
    // Set up real-time listener
    const unsubscribe = onSnapshot(videosCollection, (snapshot) => {
      console.log("Snapshot received");
      const videoList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVideos(videoList); // Update state with video data
    }, (error) => {
      console.error('Error fetching videos: ', error);
    });

    // Cleanup function to unsubscribe from the real-time listener
    return () => {
      console.log('Cleaning up Firestore listener');
      unsubscribe();
    };
  }, []); // Empty dependency array to run only once initially

  const handleSignout = () => {
    setIsLoggingOut(true);
    auth.signOut()
      .then(() => {
        console.log("Signing out");
        navigate("/login");
      })
      .catch((error) => {
        console.log("Failed in Signing out", error);
      })
      .finally(() => {
        setIsLoggingOut(false);
      });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const { size, type } = file;
      const fileType = type.split("/")[0];
  
      // Validate file type and size
      if (fileType !== "video") {
        alert("Please select a video file.");
        e.target.value = ""; // Clear the file input
        return;
      }
  
      if (size > 10000000) { // 10MB in bytes
        alert("File size exceeds 10MB.");
        e.target.value = ""; // Clear the file input
        return;
      }
  
      // File is valid
      console.log("File is valid:", file);
  
      // Create a storage reference
      const storageRef = ref(storage, `posts/${user.uid}/${Date.now()}/${file.name}`);
  
      try {
        // Upload the file to Firebase Storage
        const snapshot = await uploadBytes(storageRef, file);
        console.log('Uploaded a file!', snapshot);
  
        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('File available at', downloadURL);
        alert('File uploaded successfully!');
  
        // Define your document fields
        const videoData = {
          name: user.displayName, // Replace with the actual display name
          id: user.uid,      // Replace with the actual user ID
          downloadURL: downloadURL,
          likes: [],
          comments: []
        };
  
        // Specify the collection name ('videos' in this case)
        const videosCollection = collection(firestore, 'videos');
        
        // Add a new document with the video URL
        await addDoc(videosCollection, videoData);
        console.log('Document successfully written!');
  
      } catch (error) {
        console.error('Error uploading file or adding document:', error);
        alert('Unable to upload file or save data!');
      } finally {
        e.target.value = ""; // Clear the file input after processing
      }
    }
    console.log('After uploading file');
  };

  if (!user) {
    return null; // If the user is not logged in, render nothing
  }

  return (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <img src={logo} alt="Icon" />
          <div className="brand_name">Instagram</div>
          <div className="profile">Hi, {firstName}</div>
          <button className="home_logout_btn" onClick={handleSignout} disabled={isLoggingOut}>
            {isLoggingOut ? "Logging out" : "Log out"}
          </button>
        </div>
      </div>
      <div className="video_container">
        <VideoCard videos={videos} /> {/* Pass the videos data as a prop */}
        <input className="upload" type="file" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default Home;
