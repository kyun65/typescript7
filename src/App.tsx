import "./App.css";
import { Posts } from "./components/Posts";
import { Post } from "./components/Post";
import { Route,Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>

    </div>
  );
}

export default App;
