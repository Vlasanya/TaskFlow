import type {
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
} from "react-flow-renderer";

export interface TaskNodeData {
  label: string;
  onChange: (id: string, label: string) => void;
}

export type TaskNode = Node<TaskNodeData>;

export type TaskEdge = Edge;

export type TaskNodeChange = NodeChange;

export type TaskEdgeChange = EdgeChange;

export type TaskConnection = Connection;
