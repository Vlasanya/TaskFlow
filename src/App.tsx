import React from "react";
import { Box } from "@mui/material";
import AddTaskButton from "./components/AddTaskButton";
import FlowCanvas from "./components/Canvas/FlowCanvas";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Box sx={{ width: "100vw", height: "100vh", position: "relative" }}>
      <AddTaskButton />
      <FlowCanvas />
      <Sidebar />
    </Box>
  );
}

export default App;
