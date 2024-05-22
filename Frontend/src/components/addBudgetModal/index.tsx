import * as React from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./addBudgetModal.scss";
import { Box, Button, TextField } from "@mui/material";
import ax from "../../api/ax";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { addBudget } from "../../slices/budgetSlice";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddBudgetModal: React.FC<Props> = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);

  const dispatch: AppDispatch = useDispatch();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //get data from form
    const data = new FormData(event.currentTarget);
    const budget = {
      name: data.get("name"),
      price: data.get("price"),
      date: data.get("date"),
    };

    //close the modal
    setOpen(false);
    //send data to the server
    try {
      const response = await ax.post("/budget", budget);
      if (response.status === 201) {
        console.log(response);
        dispatch(addBudget(response.data));
      }
      //eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // Explicitly type 'err' as 'Error'
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      // setLoading(false)
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal-container">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Budget
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{
              mt: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              type="number"
              id="price"
              autoComplete="current-price"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="date"
              type="date"
              id="price"
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "50%", backgroundColor: "#1d201d" }}
            >
              Submit
            </Button>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default AddBudgetModal;
