import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

import ListingPage from "./pages/ListingPage";
import ListingItem from "./pages/ListingItem";
import Header from "./components/Header";
import "./App.css";
import "@mantine/core/styles.css";

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/listing" element={<ListingPage />}></Route>
          <Route path="/listing/:id" element={<ListingItem />}></Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
