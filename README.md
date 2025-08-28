# Flow Builder (React + Vite)

This is a **Flow Builder application** built using **React** and **Vite**.  
It allows you to create and manage interactive flows with draggable nodes, connections, and customizable settings.

---

## 🚀 Features

### 1. Text Node
- Our flow builder currently supports only one type of message (i.e **Text Message**).
- There can be multiple Text Nodes in one flow.
- Nodes are added to the flow by **dragging and dropping a Node from the Nodes Panel**.

### 2. Nodes Panel
- This panel houses all kinds of Nodes that our Flow Builder supports.
- Right now there is only **Message Node**, but we will add more types of nodes in the future.
- This section is designed to be **extensible**.

### 3. Edge
- Connects two Nodes together.

### 4. Source Handle
- Source of a connecting edge.
- **Can only have one edge originating** from a source handle.

### 5. Target Handle
- Target of a connecting edge.
- **Can have more than one edge** connecting to a target handle.

### 6. Settings Panel
- The **Settings Panel replaces the Nodes Panel** when a Node is selected.
- It has a text field to **edit the text** of the selected Text Node.

### 7. Save Button
- A button to **save the flow**.
- Save button press will **show an error** if:
  - There are more than one Nodes  
  - And more than one Node has empty target handles.

---

## 💾 Data Storage
- Flows are stored in **localStorage** in the following structure:

```json
[
  {
    "id": "flow-1",
    "name": "My First Flow",
    "nodes": [...],
    "edges": [...]
  }
]
```

