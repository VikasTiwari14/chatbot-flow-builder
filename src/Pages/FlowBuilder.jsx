import { useCallback, useEffect, useRef, useState } from 'react';
import '@xyflow/react/dist/style.css';
import Toolbar from '../Components/Toolbar';
import Topbar from '../Components/Topbar';
import SettingPanel from '../Components/SettingPanel';
import { addEdge, applyEdgeChanges, applyNodeChanges, Background, Controls, ReactFlow, useReactFlow } from '@xyflow/react';
import CustomEdge from '../Components/CustomEdge';
import { useNavigate } from 'react-router-dom';
 
export default function FlowBuilder() {
  const reactFlowWrapper = useRef(null);
  const edgeTypes = { custom: CustomEdge };
  const { screenToFlowPosition } = useReactFlow();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [nodeIdCounter, setNodeIdCounter] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFlows = JSON.parse(localStorage.getItem("flows")) || [];
    const pathId = window.location.pathname.replace('/', '');
    const currentFlow = storedFlows.find(flow => flow.id === pathId);
    console.log('Current Flow:', currentFlow);
    if (currentFlow) {
      setNodes(currentFlow.nodes);
      setEdges(currentFlow.edges);
      setNodeIdCounter(currentFlow.nodes.length + 1);
    }
  }, []);

  const addNode = () => {
    setNodes((nds) => [
      ...nds,
      {
        id: `n${nds.length + 1}`,
        position: { x: 0, y: 200 },
        data: { label: `Node ${nds.length + 1}` },
      },
    ]);
  };

  const handleSave = () => {
    if (!validateFlow()) return;
    const storedFlows = JSON.parse(localStorage.getItem("flows")) || [];
    const pathId = window.location.pathname.replace('/', '');

    const newFlows = storedFlows.map((flow) =>
      flow.id === pathId ? { ...flow, nodes: nodes, edges: edges } : flow
    );

    localStorage.setItem("flows", JSON.stringify(newFlows));
    navigate('/');
  };

  const validateFlow = () => {
    if (nodes.length <= 1) return null;

    const nodesWithoutIncoming = nodes.filter(node => 
      !edges.some(edge => edge.target === node.id)
    );

    if (nodesWithoutIncoming.length > 1) {
      window.alert(`Error: ${nodesWithoutIncoming.length} nodes have empty target handles. Only one node can have an empty target handle.`);
      return false;
    }

    const nodesWithoutLabels = nodes.filter(node => !node.data.label || node.data.label.trim() === '');
    if (nodesWithoutLabels.length > 0) {
      window.alert(`Error: ${nodesWithoutLabels.length} nodes are missing labels. Please provide labels for all nodes.`);
      return false;
    }

    return true;
  };

  const onUpdate = (data) => {
    const { node: updatedNode, edge: updatedEdge } = data;
    setNodes((nds) =>
      nds.map((node) => (node.id === updatedNode.id ? updatedNode : node))
    );
    setEdges((eds) =>
      eds.map((edge) =>
        edge.target === updatedNode.id ? { ...edge, data: { ...edge.data, ...updatedEdge.data } } : edge
      )
    );
  };

  const generateId = () => {
    const id = `node_${nodeIdCounter}`;
    setNodeIdCounter(prev => prev + 1);
    return id;
  };

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params) => {
      setEdges((edgesSnapshot) => addEdge({ ...params, type: 'custom', data: {} }, edgesSnapshot))
    },
    [],
  );

  const onSelectionChange = (params) => {
    if (params.nodes.length === 1) {
      setSelectedNode(params.nodes[0]);
    } else {
      setSelectedNode(null);
    }
  }

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();

    const position = screenToFlowPosition({
      x: e.clientX,
      y: e.clientY,
    });

    const newNode = {
      id: generateId(),
      position,
      data: { label: '' },
    };

    setNodes((nds) => nds.concat(newNode));
  }, [setNodes, nodeIdCounter]);
 
  return (
    <div>
      <div className='top-bar'>
        <Topbar handleSave={handleSave} />
      </div>
      <div className='main-content flex'>
        <Toolbar onAddNode={addNode} />
        <div style={{ width: '100vw', height: '100vh' }} ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            edgeTypes={edgeTypes}
            onSelectionChange={onSelectionChange}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
        {selectedNode && <SettingPanel selectedNode={selectedNode} onUpdate={onUpdate} />}
      </div>
    </div>
  );
}
