import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Grid } from "@mui/material";
import LoginLineLiff from "./auth/LineLiff";
import "./index.css";
import Mission from "./pages/Mission";

export default function App() {
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Router>
          <LoginLineLiff />
          <Switch>
            <Route exact path="/" component={Mission} />
            <Route path="*" render={() => <Redirect to="/" />} />
          </Switch>
        </Router>
      </Grid>
    </>
  );
}
