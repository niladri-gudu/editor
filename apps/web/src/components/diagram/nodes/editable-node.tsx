"use client";

import { NodeResizer, useUpdateNodeInternals } from "@xyflow/react";
import { memo, useState } from "react";

interface EditableNodeData {
  label: string;

  width: number;
  height: number;

  onResize?: (nodeId: string, width: number, height: number) => void;

  onResizeEnd?: (nodeId: string, width: number, height: number) => void;

  onLabelChange?: (nodeId: string, label: string) => void;
}

function EditableNode({ id, data }: { id: string; data: EditableNodeData }) {
  const updateNodeInternals = useUpdateNodeInternals();

  const [editing, setEditing] = useState(false);

  const [value, setValue] = useState(data.label);

  const save = () => {
    setEditing(false);

    data.onLabelChange?.(id, value);
  };

  if (editing) {
    return (
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={save}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            save();
          }
        }}
        style={{
          minWidth: "140px",
          border: "2px solid black",
          borderRadius: "12px",
          padding: "12px 16px",
          background: "white",
          textAlign: "center",
        }}
      />
    );
  }

  return (
    <>
      <NodeResizer
        minWidth={120}
        minHeight={50}
        onResize={(_, params) => {
          data.onResize?.(id, params.width, params.height);
          updateNodeInternals(id);
        }}
        onResizeEnd={(_, params) => {
          data.onResizeEnd?.(id, params.width, params.height);
        }}
      />
      <div
        onDoubleClick={() => setEditing(true)}
        className="font-(--font-canvas)"
        style={{
          width: `${data.width}px`,
          height: `${data.height}px`,

          boxSizing: "border-box",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          border: "2px solid black",
          borderRadius: "12px",

          background: "white",

          fontWeight: 600,
        }}
      >
        {value}
      </div>
    </>
  );
}

export default memo(EditableNode);
