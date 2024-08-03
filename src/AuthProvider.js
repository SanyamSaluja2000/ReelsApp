import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase";

export const authContext = createContext();

let AuthProvider = (props) => {
  let [user, setUser] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        let { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL });
        console.log("Hi");
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Correct placement of the return statement
    return () => {
      unsub();
    };
  }, []); // Dependency array should be outside of the callback

  return (
    <authContext.Provider value={user}>
      {!loading && props.children}
    </authContext.Provider>
  );
};

export default AuthProvider;
