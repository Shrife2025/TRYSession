"use client";

import { useState, useEffect } from "react";

const loginWithGoogle = () => {
  window.location.href =
    "https://try-session-server.vercel.app/auth/google";
};

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch(
          "https://try-session-server.vercel.app/me",
          {
            credentials: "include",
          }
        );

        const data = await res.json();
        setUser(data.user || null);
      } catch (err) {
        setUser(null);
      }
    };

    // أول تحميل
    checkUser();

    // إعادة التحقق عند الرجوع للصفحة
    window.addEventListener("focus", checkUser);

    return () => {
      window.removeEventListener("focus", checkUser);
    };
  }, []);

  return (
    <>
      {user ? (
        <>
          <h2>Welcome {user.displayName}</h2>
          <p>{user.email}</p>
        </>
      ) : (
        <button onClick={loginWithGoogle}>
          Login with Google
        </button>
      )}

      {user?.role === "admin" && <h3>You are admin</h3>}
    </>
  );
}
