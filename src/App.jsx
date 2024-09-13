import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import axiosInstance from "./lib/axiosInstance";
import ListingPage from "./pages/ListingPage";
import Header from "./components/Header";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    try {
      const data = axiosInstance.get("real-estates");
      setCount(data);
    } catch (e) {
      console.log(e, "ERROR");
    }
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/listing" element={<ListingPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
