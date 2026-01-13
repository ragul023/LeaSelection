import { BrowserRouter, Routes, Route } from "react-router";
import Registration from "./pages/Registration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registration />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
