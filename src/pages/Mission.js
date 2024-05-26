import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
import BigCLoading from "../components/Loading";
import Layout from "./Layout";

const Mission = () => {
  const userId = sessionStorage.getItem("userId");

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, [userId]);

  const fetchData = async () => {
    try {
      console.log("Before Send userId:", userId); // แสดง userId ที่กำลังจะส่งไป
      const checkinResponse = await axios.post(
        `https://bigc-line-user-hub-stg-aedsyeswba-as.a.run.app/user/firstLogin/`,
        {
          userId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("After userId:", userId);
      console.log("Post check in response: ", checkinResponse.data);
      // Redirect ไปยัง URL
      window.location.href = "https://linebc.bigc.co.th/";
    } catch (error) {
      console.error("Error fetching data:", error);
      // setError(error.message);
    }
  }; 

  if (isLoading) {
    return <BigCLoading />;
  }

  return (
    <Layout>
      <Grid item xs={12} sx={{ mb: 2, mt: 2 }}>
        {/* <Typography fontSize={18}>
          User ID: {userId} <br />
        </Typography> */}
      </Grid>
    </Layout>
  );
};

export default Mission;