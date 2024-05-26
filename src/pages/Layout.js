import * as React from "react";
import { Grid } from "@mui/material";
import Navbar from "../components/NavBar";
import BigCLoading from "../components/Loading";
import "./Layout.css";

function Layout(props) {
  const userId = sessionStorage.getItem("userId");
  const userName = sessionStorage.getItem("userName");
  const userLineId = sessionStorage.getItem("userLineId");
  const pictureUrl = sessionStorage.getItem("pictureUrl");

    return (
      <>
        {/* <Navbar
          userName={userName}
          userLineId={userLineId}
          pictureUrl={pictureUrl}
        /> */}
        {props.children}
      </>
    );
}
export default Layout;
