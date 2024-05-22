import express from 'express';
import userRoute from "./userRoute";
import authRoute from "./authRoute";
import budgetRoute from "./budgetRoute";

const router = express.Router();


const routes = [
    {
        path: "/user",
        route: userRoute,
    },
    {
        path: "/auth",
        route: authRoute,
    },
    {
        path: "/budget",
        route: budgetRoute,
    },
];



routes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
