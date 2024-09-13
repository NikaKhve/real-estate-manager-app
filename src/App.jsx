import { BrowserRouter, Routes, Route } from "react-router-dom";

import ListingPage from "./pages/ListingPage";
import Header from "./components/Header";
import "./App.css";

function App() {
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
