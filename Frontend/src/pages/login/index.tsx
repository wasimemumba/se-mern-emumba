import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { loginUser } from "../../slices/actions/userActions";
import Loading from "../../components/loading";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./login.scss";
const defaultTheme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { error, loading, user } = useSelector(
    (state: RootState) => state.userState
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    dispatch(
      loginUser({
        email: data.get("email") as string,
        password: data.get("password") as string,
      })
    );
  };

  React.useEffect(() => {
    if (user?._id) {
      navigate("/");
    }

    if (error) {
      toast.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, user?._id, user, navigate]);

  if (loading) return <Loading />;

  return (
    <ThemeProvider theme={defaultTheme}>
      <div
        className="flex"
        style={{
          width: "100%",
        }}
      >
        <Grid
          container
          component={Paper}
          sx={{
            height: "80vh",
            padding: "1rem",
            width: "60%",
            marginTop: "5rem",
          }}
        >
          <CssBaseline />
          <Grid item xs={false} sm={10} md={4}>
            <div className="left-container">
              <h1>Start Your journy with us</h1>
              <img src="../../../public/school.png" />
            </div>
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  alignSelf: "flex-start",
                }}
              >
                Sign up
              </Typography>
              <Link
                to={"/signup"}
                style={{
                  alignSelf: "flex-start",
                  marginTop: "0.5rem",
                }}
              >
                Dont have an account?{" "}
              </Link>
              <Box
                width="100%"
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <div className="btn-container">
                  <button type="submit" className="btn">
                    Sign In
                  </button>
                </div>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}
