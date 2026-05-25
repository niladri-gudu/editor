"use client";

import { memo, useState } from "react";

interface EditableNodeData {
  label: string;

  onLabelChange?: (nodeId: string, label: string) => void;
}

function EditableNode({ id, data }: { id: string; data: EditableNodeData }) {
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
    <div
      onDoubleClick={() => setEditing(true)}
      className="font-(--font-canvas)"
      style={{
        minWidth: "140px",
        border: "2px solid black",
        borderRadius: "12px",
        padding: "12px 16px",
        background: "white",
        textAlign: "center",
        fontWeight: 600,
      }}
    >
      {value}
    </div>
  );
}

export default memo(EditableNode);
