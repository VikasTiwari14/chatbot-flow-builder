import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FlowList = () => {
  const [flows, setFlows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [flowName, setFlowName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedFlows = JSON.parse(localStorage.getItem("flows")) || [];
    setFlows(storedFlows);
  }, []);

  const handleSave = () => {
    if (!flowName.trim()) return;

    const newFlow = {
      id: Date.now().toString(),
      name: flowName,
      nodes: [],
      edges: []
    };

    const updatedFlows = [...flows, newFlow];
    localStorage.setItem("flows", JSON.stringify(updatedFlows));
    setFlows(updatedFlows);

    setIsModalOpen(false);
    setFlowName("");

    navigate(`/${newFlow.id}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Chatbot Flows</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          + New Flow
        </button>
      </div>

      {flows.length === 0 ? (
        <p className="text-gray-500">No flows available. Create one!</p>
      ) : (
        <ul className="space-y-2">
          {flows.map((flow) => (
            <li
              key={flow.id}
              onClick={() => navigate(`/${flow.id}`)}
              className="p-4 bg-white rounded-lg shadow cursor-pointer hover:bg-gray-50"
            >
              {flow.name}
            </li>
          ))}
        </ul>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h2 className="text-lg font-semibold mb-4">Create New Flow</h2>
            <input
              type="text"
              value={flowName}
              onChange={(e) => setFlowName(e.target.value)}
              placeholder="Enter flow name"
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded border text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlowList;
