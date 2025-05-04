import React from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  updateNodeLabel,
  setSelectedNodeId,
  removeNode,
} from "../../store/tasksSlice";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Sidebar() {
  const selectedId = useAppSelector((s) => s.tasks.selectedNodeId);
  const node = useAppSelector((s) =>
    s.tasks.nodes.find((n) => n.id === selectedId)
  );
  const dispatch = useAppDispatch();

  if (!node) return null;

  return (
    <Drawer
      anchor="right"
      open={true}
      variant="persistent"
      sx={{ "& .MuiDrawer-paper": { width: 300, p: 2 } }}
    >
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Edit Task</Typography>
          <IconButton onClick={() => dispatch(setSelectedNodeId(null))}>
            <CloseIcon />
          </IconButton>
        </Box>

        <TextField
          label="Name"
          value={node.data.label}
          onChange={(e) =>
            dispatch(updateNodeLabel({ id: node.id, label: e.target.value }))
          }
          fullWidth
          sx={{ mt: 2 }}
        />

        <Button
          variant="outlined"
          color="secondary"
          startIcon={<DeleteIcon />}
          sx={{ mt: 3 }}
          onClick={() => {
            dispatch(removeNode(node.id));
            dispatch(setSelectedNodeId(null));
          }}
        >
          Delete Task
        </Button>
      </Box>
    </Drawer>
  );
}
