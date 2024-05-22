import { LineChart } from "@mui/x-charts"; // Importing LineChart component from MUI X Charts library
import "./chart.scss"; // Importing styles for the chart component
import { useEffect, useState } from "react"; // Importing useEffect and useState hooks from React
import ax from "../../api/ax"; // Importing axios instance
import Budget from "../../types/Budget"; // Importing Budget type
import { CircularProgress } from "@mui/material"; // Importing CircularProgress component from MUI

// Functional component for a simple line chart
const SimpleLineChart: React.FC = () => {
  // State variables for loading status, selected time period, chart data, and x-axis labels
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<"last" | "last6" | "last12">("last");
  const [uData, setUData] = useState<number[]>([]);
  const [xLabels, setXLabels] = useState<string[]>([]);

  // Fetch data based on selected time period using useEffect hook
  useEffect(() => {
    const fetchData = async () => {
      let url = "/budget/date";
      if (selected === "last6") {
        url = "/budget/date?months=6";
      } else if (selected === "last12") {
        url = "/budget/date?months=12";
      }

      try {
        setLoading(true);
        const response = await ax.get(url); // Fetch data from the API
        console.log(response.data);
        // Extract budget prices and dates from the response
        const data = response.data.map((budget: Budget) => budget.price);
        const labels = response.data.map(
          (budget: Budget) => budget.date.split("T")[0]
        );

        // Update chart data and x-axis labels
        setUData(data);
        setXLabels(labels);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after data fetching completes
      }
    };

    fetchData(); // Invoke fetchData function when the selected time period changes
  }, [selected]);

  // Render the chart component
  return (
    <div className="container">
      <h1>Budget Analysis</h1>
      {/* Buttons to select time period */}
      <div className="button-container">
        {/* Button for last month */}
        <h3
          className={selected === "last" ? "select" : ""}
          onClick={() => setSelected("last")}
        >
          LAST MONTH
        </h3>{" "}
        {/* Button for last 6 months */}
        <h3
          className={selected === "last6" ? "select" : ""}
          onClick={() => setSelected("last6")}
        >
          LAST 6 MONTH
        </h3>{" "}
        {/* Button for last 12 months */}
        <h3
          className={selected === "last12" ? "select" : ""}
          onClick={() => setSelected("last12")}
        >
          LAST 12 MONTH
        </h3>
      </div>
      {/* Show loading spinner while data is being fetched */}
      {loading ? (
        <CircularProgress />
      ) : (
        // Render line chart with fetched data
        <LineChart
          width={800}
          height={400}
          series={[{ data: uData, label: "Budget" }]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
        />
      )}
    </div>
  );
};

export default SimpleLineChart; // Export the SimpleLineChart component
