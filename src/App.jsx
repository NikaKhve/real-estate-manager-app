import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

import ListingPage from "./pages/ListingPage";
import ListingItem from "./pages/ListingItem";
import AddNewListing from "./pages/AddNewListing";
import Header from "./components/Header";
import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dropzone/styles.css";

function App() {
  return (
    <MantineProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/listing" replace />} />
          <Route path="/listing" element={<ListingPage />} />
          <Route path="/listing/:id" element={<ListingItem />} />
          <Route path="/add-new-listing" element={<AddNewListing />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
