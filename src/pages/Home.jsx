import { useEffect } from "react";
import { useLocation } from "wouter";

const Home = () => {
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLocation("/");
    }
  }, [setLocation]);

  const logout = () => {
    localStorage.removeItem("token");
    setLocation("/");
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-slate-50 gap-8">
      <h1 className="text-4xl font-bold ">
        Welcome to <span className="text-red-600">RAY</span>
      </h1>
      <button
        onClick={logout}
        className="bg-red-600 hover:bg-red-700 p-2 rounded w-28 text-white font-bold uppercase"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
