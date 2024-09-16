import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, getFirestore } from 'firebase/firestore';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AuthProvider from './AuthProvider';
import Login from './Login';
import { app } from './firebase'; // Ensure firebase is properly initialized and exported
import firebase from 'firebase/compat/app';
import Header from './Header';
let App = ()=> {
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     const db = getFirestore(app); // Pass the app instance to getFirestore
//     const insertDataIntoCollection = async () => {
//       try {
//         const docRef = await addDoc(collection(db, "myCollection"), {
//           x: 33, 
//           y: 44
//         });
//         console.log("Document written with ID: ", docRef.id);
//       } catch (error) {
//         console.error("Error inserting document: ", error);
//       }
//     };


//     const singledocdatafetch = async () =>{
//       let docRef = firebase.firestore().collection("myCollection").doc("wV1zUQzDjUD4cfIILuHz");
//         let document = await docRef.get();
//         console.log("int singledatafetch"+document.data);
//     }
//     const fetchDataFromFirestore = async () => {
//       try {
//         console.log("In fetch Data From Firestore");
//         const documentSnapshot = await getDocs(collection(db, "myCollection"));
//         const tempArray = [];
//         documentSnapshot.forEach((doc) => {
//           console.log(doc.data());
//           tempArray.push(doc.data());
//         });
//         setData(tempArray); // Set the fetched data to state
//       } catch (error) {
//         console.error("Error fetching documents: ", error);
//       }
//     };

//     const performOperations = async () => {
// //await insertDataIntoCollection();
//       //await fetchDataFromFirestore();
//       await singledocdatafetch();
//     };

//     performOperations();
//   }, []); 

  return (
    <>
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
    </>
  );
}

export default App;