import React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "../store/hooks";
import { addNode, updateNodeLabel } from "../store/tasksSlice";
import { v4 as uuid } from "uuid";

export default function AddTaskButton() {
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    const newNode = {
      id: uuid(),
      type: "task",
      position: { x: 100, y: 100 },
      data: {
        label: "New Task",
        onChange: (id: string, label: string) =>
          dispatch(updateNodeLabel({ id, label })),
      },
    };
    dispatch(addNode(newNode));
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={handleAdd}
      sx={{ position: "absolute", top: 16, left: 16, zIndex: 10 }}
    >
      Add Task
    </Button>
  );
}
