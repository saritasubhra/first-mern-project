import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Service from "./pages/Service";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import PageNotFound from "./pages/PageNotFound";
import AdminLayout from "./components/AdminLayout";
import AdminUsers from "./pages/AdminUsers";
import AdminContacts from "./pages/AdminContacts";
import UserUpdate from "./pages/UserUpdate";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/:id" element={<UserUpdate />} />
          <Route path="contacts" element={<AdminContacts />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
