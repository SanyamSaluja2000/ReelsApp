import { createContext, useEffect, useState } from "react";
import { auth, firestore } from "./firebase";  // Import Firestore and Auth
import { doc, getDoc, setDoc } from "firebase/firestore";  // Firestore methods
import { onAuthStateChanged } from "firebase/auth";
export const authContext = createContext();

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        const userDocRef = doc(firestore, "users", uid);  // Use Firestore
        const documentSnapshot = await getDoc(userDocRef);

        if (!documentSnapshot.exists()) {
          await setDoc(userDocRef, { displayName });
        }

        setUser({ displayName, email, uid, photoURL });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Clean up the subscription on unmount
    return () => {
      unsub();
    };
  }, []);

  return (
    <authContext.Provider value={user}>
      {!loading && props.children}
    </authContext.Provider>
  );
};

export default AuthProvider;
