import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { showToastError } from "@src/utils/alert/toastMessage";
import { formatUtcDate } from "@src/utils/formatting/dateFormat";
import {
  getLatestPolicy,
  getPolicyByPath,
} from "@src/features/policies/service/policies";
import ConfipetrolLogo from "@src/assets/confipetrol-logo.png";
import ConfipetrolMobileLogo from "@src/assets/confipetrol-logo-mobile.png";
import {
  AppBar,
  Container,
  Box,
  Typography,
  Grid,
  LinearProgress,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useParams } from "react-router-dom";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderBottom: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  boxShadow: "none",
  backgroundImage: "none",
  zIndex: theme.zIndex.drawer + 1,
  flex: "0 0 auto",
}));

const PolicyPublicPage = (props) => {
  const theme = useTheme();
  const { policyPath } = useParams();
  const [policy, setPolicy] = useState({});
  const [isloading, setIsloading] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const loadLastPolocy = async () => {
    try {
      setIsloading(true);
      const response = await getPolicyByPath(policyPath);
      if (response) {
        setPolicy(response);
      }
    } catch (error) {
      showToastError(error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    loadLastPolocy();
  }, [policyPath]);

  return (
    <div id="PolicyPublicPage">
      <Box sx={{ height: "100dvh", display: "flex", flexDirection: "column" }}>
        <StyledAppBar>
          <Toolbar
            variant="dense"
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              p: "8px 12px",
            }}
          >
            <Container>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <img
                    style={{ height: isMobile ? "44px" : "50px" }}
                    className="confi-logo"
                    src={isMobile ? ConfipetrolLogo : ConfipetrolLogo}
                    alt="confipetrol-logo"
                  />
                </Grid>
              </Grid>
            </Container>
          </Toolbar>
        </StyledAppBar>
        {isloading && <LinearProgress />}
        <Container>
          <Box
            sx={{
              backgroundColor: "white.main",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <Box p={2}>
              <Grid container justifyContent="end">
                <Grid>
                  <Typography variant="caption">
                    <div>Código: {policy?.policy_code || ""}</div>
                    <div>
                      Versión: {policy?.current_version?.version_number}
                    </div>
                    <div>
                      Fecha:{" "}
                      {formatUtcDate(
                        policy?.current_version?.policy_version_date,
                        "L"
                      )}
                    </div>
                  </Typography>
                </Grid>
              </Grid>
              <Box
                mt={2}
                dangerouslySetInnerHTML={{
                  __html: policy?.current_version?.content,
                }}
              ></Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default PolicyPublicPage;
