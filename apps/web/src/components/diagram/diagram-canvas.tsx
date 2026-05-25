"use client";

import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { DiagramEdge, DiagramNode } from "@repo/types";
import { toFlowEdges, toFlowNodes } from "@/lib/react-flow/transformers";
import type { Node } from "@xyflow/react";
import type { MouseEvent } from "react";
import { NodeApi } from "@/lib/api/node";
import { useCallback } from "react";
import { useEditorStore } from "@/lib/editor/editor-store";
import { useEffect, useState, useMemo } from "react";
import { nodeTypes } from "@/components/diagram/node-types";

export interface DiagramCanvasProps {
  boardId: string;

  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

export function DiagramCanvas({
  boardId,
  nodes,
  edges,
}: DiagramCanvasProps & { boardId: string }) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const handleLabelChange = async (nodeId: string, label: string) => {
    setRfNodes((nodes) =>
      nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,

              data: {
                ...node.data,
                label,
              },
            }
          : node,
      ),
    );

    try {
      await NodeApi.updateNodeLabel(nodeId, label);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResize = (nodeId: string, width: number, height: number) => {
    setRfNodes((nodes) =>
      nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              width,
              height,
              data: {
                ...node.data,
                width,
                height,
              },
            }
          : node,
      ),
    );
  };

  const handleResizeEnd = async (
    nodeId: string,
    width: number,
    height: number,
  ) => {
    try {
      await NodeApi.updateNodeSize(nodeId, width, height);
    } catch (error) {
      console.error(error);
    }
  };

  const initialNodes = useMemo(
    () => toFlowNodes(nodes, handleLabelChange, handleResize, handleResizeEnd),
    [nodes],
  );

  const initialEdges = useMemo(() => toFlowEdges(edges), [edges]);

  const activeTool = useEditorStore((state) => state.activeTool);

  const { screenToFlowPosition } = useReactFlow();

  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(initialNodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleSelectionChange = ({ nodes }: { nodes: Node[] }) => {
    if (nodes.length === 0) {
      setSelectedNodeId(null);
      return;
    }

    setSelectedNodeId(nodes[0].id);
  };

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

  const handlePaneClick = useCallback(
    async (event: MouseEvent) => {
      if (activeTool === "select") {
        return;
      }

      const rect = (
        event.currentTarget as HTMLDivElement
      ).getBoundingClientRect();

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const type = activeTool;
      let label = "Node";

      switch (activeTool) {
        case "rectangle":
          label = "Service";
          break;

        case "database":
          label = "Database";
          break;

        case "text":
          label = "Text";
          break;
      }

      const tempId = crypto.randomUUID();

      const optimisticNode = {
        id: tempId,
        position: {
          x: position.x,
          y: position.y,
        },

        width: 100,
        height: 60,

        data: {
          label,
          width: 100,
          height: 60,
          onLabelChange: handleLabelChange,
          onResize: handleResize,
          onResizeEnd: handleResizeEnd,
        },

        type: "editable",
      };

      setRfNodes((currentNodes) => [...currentNodes, optimisticNode]);

      try {
        const createdNode = await NodeApi.createNode(boardId, {
          type: activeTool,
          label,
          x: position.x,
          y: position.y,
        });

        setRfNodes((currentNodes) =>
          currentNodes.map((node) =>
            node.id === tempId
              ? {
                  ...node,
                  id: createdNode.id,
                }
              : node,
          ),
        );
      } catch (error) {
        setRfNodes((currentNodes) =>
          currentNodes.filter((node) => node.id !== tempId),
        );

        console.error(error);
      }
    },
    [activeTool, boardId, setRfNodes, screenToFlowPosition],
  );

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.key !== "Delete") {
        return;
      }

      if (!selectedNodeId) {
        return;
      }

      const deletedNode = rfNodes.find((node) => node.id === selectedNodeId);

      if (!deletedNode) {
        return;
      }

      setRfNodes((nodes) => nodes.filter((node) => node.id !== selectedNodeId));

      setSelectedNodeId(null);

      try {
        await NodeApi.deleteNode(selectedNodeId);
      } catch (error) {
        setRfNodes((nodes) => [...nodes, deletedNode]);

        console.error(error);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedNodeId, setRfNodes]);

  return (
    <div
      style={{
        width: "100%",
        height: "800px",
        border: "2px solid red",
      }}
    >
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={rfNodes}
        edges={rfEdges}
        onPaneClick={handlePaneClick}
        onSelectionChange={handleSelectionChange}
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
