import React, { useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "react-flow-renderer";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  setNodes,
  setEdges,
  setSelectedNodeId,
  removeNode,
  removeEdge,
} from "../../store/tasksSlice";
import TaskNode from "../TaskNode";

import type {
  TaskNode as MyNode,
  TaskEdge as MyEdge,
  TaskNodeChange,
  TaskEdgeChange,
  TaskConnection,
} from "../../types/flow";

const nodeTypes = { task: TaskNode };

export default function FlowCanvas() {
  const nodes = useAppSelector((s) => s.tasks.nodes) as MyNode[];
  const edges = useAppSelector((s) => s.tasks.edges) as MyEdge[];
  const dispatch = useAppDispatch();

  const onNodesChange = useCallback(
    (changes: TaskNodeChange[]) => {
      const updated = applyNodeChanges(changes, nodes) as MyNode[];
      dispatch(setNodes(updated));
    },
    [dispatch, nodes]
  );

  const onEdgesChange = useCallback(
    (changes: TaskEdgeChange[]) => {
      const updated = applyEdgeChanges(changes, edges) as MyEdge[];
      dispatch(setEdges(updated));
    },
    [dispatch, edges]
  );

  const onConnect = useCallback(
    (connection: TaskConnection) => {
      const updated = addEdge(connection, edges) as MyEdge[];
      dispatch(setEdges(updated));
    },
    [dispatch, edges]
  );

  const onNodesDelete = useCallback(
    (deleted: MyNode[]) => {
      deleted.forEach((node: MyNode) => {
        dispatch(removeNode(node.id));
      });
    },
    [dispatch]
  );

  const onEdgesDelete = useCallback(
    (deleted: MyEdge[]) => {
      deleted.forEach((edge: MyEdge) => {
        dispatch(removeEdge(edge.id));
      });
    },
    [dispatch]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodesDelete={onNodesDelete}
      onEdgesDelete={onEdgesDelete}
      onNodeClick={(_, node) => dispatch(setSelectedNodeId(node.id))}
      onPaneClick={() => dispatch(setSelectedNodeId(null))}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}
