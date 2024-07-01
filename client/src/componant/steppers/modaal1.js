import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Divider as MuiDivider,
  Tooltip,
  tooltipClasses,
  DialogTitle,
  DialogActions,
  DialogContentText,
  Button,
  Paper,
  Box,
} from "@mui/material";
import "../steppers/modal.css"


const Delete = ({ title, description, onConfirm, onCancel }) => {
  const [open, setOpen] = useState(false);
  const [deletePost, setDeletePost] = useState(null);


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div>
        <Box className="box_delete">
            <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{textAlign:"end"}}>
                <IconButton
                autoFocus
                onClick={onCancel}
                className="delete_button"
                sx={{ paddingTop: "0px" }}
              >
                <CloseIcon />
              </IconButton>
                </Grid>
            </Grid>

          <DialogContentText
            id="responsive-dialog-title"
            
            className="delete_dialog_content1"
          >
            {title}
          </DialogContentText>
          <DialogContentText
            // id="responsive-dialog-title"
            className="delete_dialog_content2"
          >
            {description}
          </DialogContentText>
          <DialogActions>
            {/* <Button autoFocus onClick={onCancel} className="delete_button">
              {("Cancel")}
            </Button> */}

            {/* <Button onClick={onConfirm} className="delete_button2" >
              {("Finish")}
            </Button> */}
            <Button onClick={onConfirm} 
                  className="row d-flex align-items-center customBtn ps-4 pe-4"
                  sx={{ border: 1, borderRadius: 0, fontWeight: 'bold', bgcolor: 'black', color: 'white' }}
                >
                  Finish
                </Button>
          </DialogActions>
        </Box>

        {/* </DialogActions> */}
      </div>
    </>
  );
};

export default Delete;
