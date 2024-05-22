import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useSearchParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store";
import { loginUser } from "../../slices/actions/userActions";
import Loading from "../../components/loading";
import { useNavigate } from "react-router-dom";
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
  }, [dispatch, user?._id, user, navigate]);

  if (loading) return <Loading />;

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh", padding: "5rem", width: "70%" }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={10}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
              style={{
                alignSelf: "flex-start",
                marginTop: "0.5rem",
              }}
              component="h3"
              variant="h6"
            >
              Dont have an account?{" "}
            </Link>
            <Box
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
    </ThemeProvider>
  );
}
