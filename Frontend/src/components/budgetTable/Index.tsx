import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import Loading from "../loading";
import formatFrontDate from "../../utils/formatFrontDate";
import "./budgetTable.scss";
import { Button } from "@mui/material";
import ax from "../../api/ax";
import toast from "react-hot-toast";
import { addBudget, removeBudget } from "../../slices/budgetSlice";

const BudgetTable: React.FC = () => {
  // Get the dispatch function from Redux
  const dispatch: AppDispatch = useDispatch();

  // Select budgets, loading state, and error from Redux store
  const { budgets, loading, error } = useSelector(
    (state: RootState) => state.budgetsState
  );

  // Columns configuration for the data grid
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 220 },
    { field: "price", headerName: "Price", width: 220 },
    { field: "date", headerName: "Date", width: 220 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      // Render actions buttons for each row
      renderCell: (rowData) => {
        return (
          <div className="flex">
            <Button
              variant="contained"
              style={{
                border: "none",
                backgroundColor: "red",
              }}
              onClick={() => handleDelete(rowData.row.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  // Function to handle delete action
  const handleDelete = async (id: string) => {
    //asl user for confirmation
    if (!window.confirm("Are you sure you want to delete this budget?")) {
      return;
    }

    const budget = budgets.find((budget) => budget._id === id);
    try {
      // Dispatch action to remove budget from Redux store
      dispatch(removeBudget(id));
      // Make API call to delete budget
      await ax.delete(`/budget/${id}`);
      // Show success toast notification
      toast.success("Budget deleted successfully");
    } catch (error) {
      console.error(error);
      // If deletion fails, add budget back to store and show error toast
      dispatch(addBudget(budget!));
      toast.error("Failed to delete budget");
    }
  };

  // If data is still loading, show loading spinner
  if (loading) return <Loading />;
  // If there's an error, display it
  if (error) return <h1>{error}</h1>;

  // Render the data grid with budgets data
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <DataGrid
        sx={{ backgroundColor: "white", color: "black" }}
        rows={budgets.map((budget) => ({
          id: budget._id,
          name: budget.name,
          price: budget.price,
          date: formatFrontDate(budget?.date || ""),
        }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};

export default BudgetTable;
