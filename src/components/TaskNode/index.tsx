import React, { useCallback } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { TextField, Paper } from "@mui/material";
import type { TaskNodeData } from "../../types/flow";

export default function TaskNode({ data, id }: NodeProps<TaskNodeData>) {
  const onChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      data.onChange(id, evt.target.value);
    },
    [id, data]
  );

  return (
    <Paper
      elevation={3}
      sx={{ p: 1, width: 150, textAlign: "center", position: "relative" }}
    >
      <Handle type="target" position={Position.Top} />
      <TextField
        value={data.label}
        onChange={onChange}
        variant="standard"
        fullWidth
        sx={{
          "& .MuiInputBase-input": { textAlign: "center" },
        }}
      />
      <Handle type="source" position={Position.Bottom} />
    </Paper>
  );
}
