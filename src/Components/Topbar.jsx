import { Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ handleSave, name }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-gray-200 text-black px-4 py-2 flex justify-between items-center">
      <h2 className="text-xl">Flow Builder | {name}</h2>
      <div className='flex gap-2'>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Save size={16} />
          Save
        </button>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <X size={16} />
          Close
        </button>
      </div>
    </div>
  )
}

export default Topbar
