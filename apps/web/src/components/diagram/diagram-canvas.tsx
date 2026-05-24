"use client";

import { Background, Controls, MiniMap, ReactFlow } from "@xyflow/react";
import type { DiagramEdge, DiagramNode } from "@repo/types";
import "@xyflow/react/dist/style.css";
import { toFlowEdges, toFlowNodes } from "@/lib/react-flow/transformers";
import { useNodesState, useEdgesState } from "@xyflow/react";
import type { Node } from "@xyflow/react";
import type { MouseEvent } from "react";
import { NodeApi } from "@/lib/api/node";

interface DiagramCanvasProps {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

export function DiagramCanvas({ nodes, edges }: DiagramCanvasProps) {
  const initialNodes = toFlowNodes(nodes);
  const initialEdges = toFlowEdges(edges);

  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(initialNodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeDragStop = async (_: MouseEvent, node: Node) => {
    try {
      await NodeApi.updateNodePosition(
        node.id,
        node.position.x,
        node.position.y,
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "800px",
        border: "2px solid red",
      }}
    >
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={onNodeDragStop}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
