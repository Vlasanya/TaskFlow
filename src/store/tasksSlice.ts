import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskNode, TaskEdge } from "../types/flow";

export interface TaskState {
  nodes: TaskNode[];
  edges: TaskEdge[];
  selectedNodeId: string | null;
}

const initialState: TaskState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addNode(state, action: PayloadAction<TaskNode>) {
      state.nodes.push(action.payload);
    },
    updateNodeLabel(
      state,
      action: PayloadAction<{ id: string; label: string }>
    ) {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) node.data = { ...node.data, label: action.payload.label };
    },
    setNodes(state, action: PayloadAction<TaskNode[]>) {
      state.nodes = action.payload;
    },
    setEdges(state, action: PayloadAction<TaskEdge[]>) {
      state.edges = action.payload;
    },
    setSelectedNodeId(state, action: PayloadAction<string | null>) {
      state.selectedNodeId = action.payload;
    },
    removeNode(state, action: PayloadAction<string>) {
      state.nodes = state.nodes.filter((n) => n.id !== action.payload);
      state.edges = state.edges.filter(
        (e) => e.source !== action.payload && e.target !== action.payload
      );
      if (state.selectedNodeId === action.payload) {
        state.selectedNodeId = null;
      }
    },
    removeEdge(state, action: PayloadAction<string>) {
      state.edges = state.edges.filter((e) => e.id !== action.payload);
    },
  },
});

export const {
  addNode,
  updateNodeLabel,
  setNodes,
  setEdges,
  setSelectedNodeId,
  removeNode,
  removeEdge,
} = tasksSlice.actions;

export default tasksSlice.reducer;
