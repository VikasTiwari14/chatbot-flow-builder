import { MessageSquare } from "lucide-react";

const tools = [
  { id: "message", label: "Add Message", icon: MessageSquare },
];

export default function Toolbar() {
  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="bg-white border-r border-gray-200 text-black py-4 px-2 flex justify-center items-center"
      aria-label="Left side toolbar"
    >
      <div className="flex flex-col items-center gap-2">
        {tools.map((tool) => (
          <button
            draggable
            onDragStart={handleDragStart}
            className="text-white p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={tool.label}
            title={tool.label}
            key={tool.id}
          >
            <tool.icon />
          </button>
        ))}
      </div>
    </div>
  );
};
