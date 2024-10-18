"use client";
//import Link from "next/link";
import { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Link } from "react-router-dom";
import Layout from '../components/layout';
//import styles from './page.module.scss';

const styleSectionDashboard = {
 
};

const DashboardPage = () => {
  return (
    <Layout>
    <div style={styleSectionDashboard}>
      <Grid justifyContent="center" container>
        <Grid xs="auto" item>
          <Button
            size="big"
            color="primary"
            variant="outlined"
            startIcon={<VerifiedUserIcon />}
            component={Link}
            to={"/dashboard/policies"}
            sx={{
              m: 1,
              height: 100,
              px: 4,
            }}
          >
            <Box display="block">Políticas</Box>
          </Button>
        </Grid>
      </Grid>
    </div>
    </Layout>
  );
};

export default DashboardPage;
