import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FlowBuilder from './Pages/FlowBuilder';
import FlowList from './Pages/FlowList';

export default function App() {
  
  return (
    <div className="text-black" style={{ width: '100vw', height: '100vh' }}>
      <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<FlowList />} />
          <Route path="/:id" element={<FlowBuilder />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}
