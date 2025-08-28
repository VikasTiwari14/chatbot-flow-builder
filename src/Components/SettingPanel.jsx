import { Settings } from 'lucide-react';
import { useEffect, useState } from 'react'

const SettingPanel = ({ selectedNode, onUpdate }) => {
  const [label, setLabel] = useState(selectedNode?.data?.label || '');
  const [inResponseTo, setInResponseTo] = useState(selectedNode?.data?.inResponseTo || '');
  
  useEffect(() => {
    setLabel(selectedNode?.data?.label || '');
  }, [selectedNode]);
  
  const handleLabelChange = (e) => {
    const newLabel = e.target.value;
    setLabel(newLabel);
  };

  const handleInResponseToChange = (e) => {
    const newInResponseTo = e.target.value;
    setInResponseTo(newInResponseTo);
  };
  
  const handleUpdate = () => {
    onUpdate({
      node: { ...selectedNode, data: { ...selectedNode.data, label } },
      edge: { data: { label: inResponseTo } }
    })
    setInResponseTo('');
    setLabel('');
  };

  return (
    <div className="w-100 bg-gray-50 border-r border-gray-200 p-4">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className='flex items-center gap-2'>
            <Settings size={16} className="text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Settings</h3>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            In response to
          </label>
          <input
            type="text"
            value={inResponseTo}
            onChange={handleInResponseToChange}
            placeholder="Leave empty for any response"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            value={label}
            onChange={handleLabelChange}
            placeholder="Enter your message..."
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-24 text-sm"
          />
        </div>
        <button
          onClick={handleUpdate}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default SettingPanel
