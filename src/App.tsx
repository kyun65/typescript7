import "./App.css";
import { Posts } from "./components/Posts";
import { Post } from "./components/Post";
import { Route,Routes } from "react-router-dom";
import { ContactPage } from "./components/Contact";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
  );
}

export default App;
