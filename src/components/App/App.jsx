import React, { useEffect } from "react";
import { HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import UserPage from "../UserPage/UserPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import RaceList from "../RaceList/RaceList";
import ClassList from "../ClassList/ClassList";
import AbilityScores from "../AbilityScores/AbilityScores";
import AlignmentsList from "../Alignment/AlignmentsList";
import Name from "../Name/Name";
import CharConfirmation from "../CharConfirmation/CharConfirmation";
import CharSheet from "../CharSheet/CharSheet";
import "./App.css";

import Stack from "@mui/material/Stack";


function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <Stack
      direction="column"
      spacing={11}
      >
        <Nav />
        <div>
        <Switch>
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:5173/about will show the about page. */}

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
          Even though it seems like they are different pages, the user is always on localhost:5173/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>

          <ProtectedRoute
          exact
          path="/races"
          >
            <RaceList />
          </ProtectedRoute>

          <ProtectedRoute
          exact
          path="/class"
          >
            <ClassList />
          </ProtectedRoute>

          <ProtectedRoute
          exact
          path="/abilityScores"
          >
            <AbilityScores />
          </ProtectedRoute>

          <ProtectedRoute
          exact
          path="/alignment"
          >
            <AlignmentsList />
          </ProtectedRoute>

          <ProtectedRoute
          exact
          path="/name"
          >
            <Name />
          </ProtectedRoute>

          <ProtectedRoute
          exact
          path="/charConfirmation"
          >
            <CharConfirmation />
          </ProtectedRoute>

          <ProtectedRoute
          exact
          path="/charSheet">
            <CharSheet />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        </div>
        <Footer />
        </Stack>
    </Router>
  );
}

export default App;
