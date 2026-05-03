"use client"
import { useState,useEffect } from "react";
const loginWithGoogle = () => {
  window.location.href = "http://localhost:9000/auth/google";
};

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async() => {
      try {
        const res = await fetch("http://localhost:9000/me", {
          credentials: "include"
        })
        const data = await res.json();
        setUser(data.user)
      } catch (err) {
        setUser(null)
      }
    }
    checkUser()
    },[])
  return (
    <>
      {
        user ? (
          <h2>Welcome {user.displayName}</h2>
        ) : (
          <button onClick={loginWithGoogle}>
            Login with Google
          </button>
        )
      }

      {
        user?.role === "admin" && (
          <h3>You are admin</h3>
        )
      }
    </>
  );
}