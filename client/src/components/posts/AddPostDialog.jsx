import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import { forwardRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { addPost } from "../../redux/actions/post";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddPostDialog({ open, setOpen }) {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //   handle add post
  const handleSubmit = (e) => {
    dispatch(addPost(text));
    setText("");
    handleClose();
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar
        enableColorOnDark
        color="transparent"
        sx={{ position: "relative" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Add Post
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="dialog_body">
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-multiline-flexible"
            placeholder="Write your thoughts..."
            multiline
            rows={4}
            fullWidth={true}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Box>
        <button className="btn btn-dark" onClick={handleSubmit}>
          Add
        </button>
      </div>
    </Dialog>
  );
}

export default AddPostDialog;
