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
      setUser(data.user);
    } catch (err) {
      setUser(null);
    }
  };

  checkUser();

  // 🔥 مهم جدًا
  window.addEventListener("focus", checkUser);

  return () => window.removeEventListener("focus", checkUser);
}, []);
