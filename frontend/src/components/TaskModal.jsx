import { Modal, Box, TextField, Select, MenuItem, Button, Typography } from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function TaskModal({ open, handleClose, form, setForm, onSubmit, isEdit }) {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>{isEdit ? "Edit Task" : "Add New Task"}</Typography>
        <TextField
          fullWidth label="Title" name="title"
          value={form.title} onChange={handleChange}
          margin="normal" required
        />
        <TextField
          fullWidth label="Description" name="desc"
          value={form.desc} onChange={handleChange}
          margin="normal" required
        />
        <TextField
          fullWidth label="Assigned To" name="assignedTo"
          value={form.assignedTo} onChange={handleChange}
          margin="normal" required
        />
        <Select
          fullWidth name="taskStatus" value={form.taskStatus}
          onChange={handleChange} margin="normal"
        >
          <MenuItem value="To Do">To Do</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Done">Done</MenuItem>
        </Select>
        <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={onSubmit}>
          {isEdit ? "Update Task" : "Create Task"}
        </Button>
      </Box>
    </Modal>
  );
}
