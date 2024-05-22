import React, { useEffect } from "react";
import BudgetTable from "../../components/budgetTable/Index"; // Importing BudgetTable component
import "./home.scss"; // Importing styles for the home page
import { TextField } from "@mui/material"; // Importing TextField component from MUI
import { AppDispatch } from "../../store"; // Importing AppDispatch type from Redux store
import { useDispatch } from "react-redux"; // Importing useDispatch hook from react-redux
import { getBudgets } from "../../slices/actions/budgetActions"; // Importing action creator for fetching budgets
import { useNavigate, useSearchParams } from "react-router-dom"; // Importing hooks for navigation and URL parameters
import AddBudgetModal from "../../components/addBudgetModal"; // Importing AddBudgetModal component
import Chart from "../../components/chart"; // Importing Chart component

// Functional component for the home page
const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); // Redux dispatch function
  const navigate = useNavigate(); // Accessing navigation object using useNavigate hook
  const [open, setOpen] = React.useState(false); // State variable for modal open/close
  const [date, setDate] = React.useState<string>(
    new Date().toISOString().substring(0, 10)
  ); // State variable for selected date

  const [searchParams, setSearchParams] = useSearchParams(); // Accessing search parameters from URL

  // Function to handle filter button click
  const handleClick = () => {
    setSearchParams({ date: date }); // Set search parameter for filtering records
  };

  // Effect hook to fetch budgets data based on selected date
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(searchParams.get("date"));
        await dispatch(getBudgets(searchParams.get("date"))); // Dispatch action to fetch budgets
      } catch (err) {
        console.log("errr: " + err);
      }
    };
    fetchData(); // Invoke fetchData function when searchParams or dispatch function changes
  }, [dispatch, navigate, searchParams]); // Dependency array for useEffect hook

  // Render the home page components
  return (
    <>
      <div
        style={{
          marginTop: "50px",
        }}
        className="card"
      >
        {/* Header section */}
        <div className="card-header">
          {/* Filter input section */}
          <div className="filter-input">
            {/* Date picker */}
            <TextField
              required
              sx={{ padding: "0" }}
              id="outlined-required"
              type="date"
              defaultValue={new Date().toISOString().substring(0, 10)}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {/* Filter button */}
            <button onClick={handleClick}>Filter Records</button>
          </div>
          {/* Add budget button */}
          <button
            onClick={() => {
              setOpen(true);
            }}
          >
            Add Budget
          </button>
        </div>
        {/* Budget table component */}
        <BudgetTable />
      </div>
      {/* Add Budget modal */}
      <AddBudgetModal open={open} setOpen={setOpen} />
      <div
        style={{
          marginTop: "50px",
        }}
      >
        {/* Chart component */}
        <Chart />
      </div>
    </>
  );
};

export default HomePage;

