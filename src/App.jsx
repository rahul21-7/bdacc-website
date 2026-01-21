import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThreeTest from "./components/three";
import Members from "./pages/Members";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home page (3D only here) */}
        <Route path="/" element={<ThreeTest />} />

        {/* Members page (NO 3D) */}
        <Route path="/members" element={<Members />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

