import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Stack,
  AppBar,
  Box,
  Toolbar,
  Card,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";
import BigCLoading from "../components/Loading";

const Navbar = ({ userName, pictureUrl }) => {
  const [userData, setUserData] = useState(null);
  const [rewardData, setRewardData] = useState(null);
  const [error, setError] = useState(null);
  const [bigpointId, setBigpointId] = useState("");
  // const [lineId, setUserLineId] = useState(userLineId);
  const userLineId = sessionStorage.getItem("userId");

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/checkuser/${userLineId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
      if (data.status === "success") {
          setUserData(data.data);
          if (data.data.bigpoint_id != null) {
            setBigpointId(data.data.bigpoint_id);
            sessionStorage.setItem("bigpointId", data.data.bigpoint_id);
          }
          sessionStorage.setItem("welcome", data.data.welcome_reward);
        } else {
          setError(data.message);
        }
      } else {
        setError("Failed to fetch data from the API");
      }
    } catch (error) {
      //setError(error);
      setError("An error occurred while fetching data");
    }
  };

  useEffect(() => {
    //console.log(`Navbar useEffect :${userLineId}`);
    if (userLineId !== "" && userLineId !== null) {
      fetchUserData();
    }
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <AppBar position="static" sx={{ background: "#93d701", minWidth: "320px" }}>
        {/* <PopupAward error={error} rewardData={rewardData} /> */}
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          sx={{ display: "flex" }}
        >

          <Toolbar sx={{ m: 0, p: 0 }}>
            <div style={{ width: "100%" }}>
              <Card
                sx={{
                  maxWidth: 300,
                  background: "#93d701",
                  border: "none",
                  boxShadow: "none", 
                }}
              >
                <Box sx={{ pt: 1, pb: 1 }}>
                  <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <>
                      <Avatar
                        alt="User Profile"
                        src={pictureUrl}
                        width="85px"
                      />
                      <Typography
                        fontSize="15px"
                        fontWeight="600"
                        color="#000"
                        sx={{ p: 0.2, ml: 0.5, fontFamily: "Prompt" }}
                      >
                        {userName}
                        <br />
                        สมาชิก : {bigpointId != "" ? bigpointId : "Guest"}
                        {/* {userLineId} */}
                      </Typography>
                    </>
                  </Stack>
                </Box>
              </Card>
            </div>
          </Toolbar>
        </Grid>
      </AppBar>
    </>
  );
};

export default Navbar;
