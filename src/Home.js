import React, { useState, useEffect } from "react";
import { auth, storage, firestore } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import Videocard from "./Videocard";
import logo from './instagram.png';
import "./home.css";
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

const Home = () => {
  const user = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();
  let firstName = '';
  if (user) {
    firstName = user.displayName ? user.displayName.split(' ')[0].trim() : ' ';
  }

  useEffect(() => {
    console.log("Setting up Firestore listener");

    const videosCollection = collection(firestore, 'videos');
    
    const unsubscribe = onSnapshot(videosCollection, (snapshot) => {
      console.log("Snapshot received");
      const videoList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVideos(videoList);
    }, (error) => {
      console.error('Error fetching videos: ', error);
    });

    return () => {
      console.log('Cleaning up Firestore listener');
      unsubscribe();
    };
  }, []);

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
  
      if (fileType !== "video") {
        alert("Please select a video file.");
        e.target.value = "";
        return;
      }
  
      if (size > 10000000) { // 10MB
        alert("File size exceeds 10MB.");
        e.target.value = "";
        return;
      }
  
      console.log("File is valid:", file);
  
      const storageRef = ref(storage, `posts/${user.uid}/${Date.now()}/${file.name}`);
  
      try {
        const snapshot = await uploadBytes(storageRef, file);
        console.log('Uploaded a file!', snapshot);
  
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('File available at', downloadURL);
        alert('File uploaded successfully!');
  
        const videoData = {
          name: user.displayName,
          id: user.uid,
          downloadURL: downloadURL,
          likes: [],
          comments: []
        };

        const videosCollection = collection(firestore, 'videos');
        await addDoc(videosCollection, videoData);
        console.log('Document successfully written!');         
      } catch (error) {
        console.error('Error uploading file or adding document:', error);
        alert('Unable to upload file or save data!');
      } finally {
        e.target.value = "";
      }
    }
    console.log('After uploading file');
  };

  if (!user) {
    return null;
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
     
          {videos.map(video => (
            <Videocard key={video.id} video={video} />
          ))}
           <input className="upload" type="file" onChange={handleFileChange} /> 
      </div>
      
    </div>
  );
};

export default Home;
