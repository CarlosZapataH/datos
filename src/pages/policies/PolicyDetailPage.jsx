import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { showToastError } from "@src/utils/alert/toastMessage";
import { formatUtcDate } from "@src/utils/formatting/dateFormat";
import PrivateLayout from "@src/components/layout/PrivateLayout";
import { getPolicy } from "@src/features/policies/service/policies";
import CustomBreadcrumbs from "@src/components/global/CustomBreadcrumbs";
import {
  Box,
  Grid,
  Button,
  Container,
  Typography,
  LinearProgress,
} from "@mui/material";

const breadcrumbs = [
  { value: "/dashboard", text: "Inicio" },
  { value: "/dashboard/policies", text: "Políticas" },
  { value: "", text: "Detalle" },
];

const PolicyDetailPage = (props) => {
  const { policyId } = useParams();
  const [policy, setPolicy] = useState({});
  const [isloading, setIsloading] = useState(false);

  const loadPolicy = async () => {
    try {
      setIsloading(true);
      const response = await getPolicy(policyId);
      if (response) setPolicy(response);
    } catch (error) {
      showToastError(error);
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    loadPolicy();
  }, [policyId]);

  return (
    <PrivateLayout>
      <div id="PolicyDetailPage">
        <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
        <Container>
          <Grid container justifyContent={"center"}>
            <Grid item xs={12} md={10} mb={2}>
              <Box
                sx={{
                  backgroundColor: "white.main",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}
              >
                {isloading && <LinearProgress />}
                {!!policy?.policy_code && (
                  <Box p={4}>
                    <Box mb={2}>
                      <Grid justifyContent="space-between" container>
                        <Grid item>
                          <Typography variant="h4">
                            {policy?.policy_code}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Button
                            sx={{ ma: 1 }}
                            variant="outlined"
                            component={Link}
                            to={`/dashboard/policies/${policyId}/edit`}
                          >
                            Editar Política
                          </Button>
                        </Grid>
                      </Grid>
                      <Typography variant="caption">
                        Versión: {policy?.current_version?.version_number}
                      </Typography>
                      <br />
                      <Typography variant="caption">
                        URL: {policy?.path}
                      </Typography>
                      <br />
                      <Typography variant="caption">
                        Fecha:{" "}
                        {formatUtcDate(
                          policy?.current_version?.policy_version_date,
                          "LL"
                        )}
                      </Typography>
                      <br />
                      <Typography variant="caption">
                        Registrado por:{" "}
                        {policy?.current_version?.creator?.fullName}
                      </Typography>
                      <Box
                        mt={4}
                        dangerouslySetInnerHTML={{
                          __html: policy?.current_version?.content,
                        }}
                      ></Box>
                    </Box>
                    <Grid
                      display={"flex"}
                      justifyContent={"flex-end"}
                      item
                      xs={12}
                      mt={4}
                    >
                      <Button
                        sx={{ ml: 1 }}
                        variant="outlined"
                        component={Link}
                        to={"/dashboard/policies"}
                      >
                        Atrás
                      </Button>
                    </Grid>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </PrivateLayout>
  );
};

export default PolicyDetailPage;
