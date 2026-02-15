import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);
    };

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {user && (
        <div className="bg-white p-10 shadow-xl rounded-xl">
          <h1 className="text-2xl font-bold">
            Welcome {user.name}
          </h1>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
}
