import { useState } from "react";
import Editor from "react-simple-wysiwyg";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import PrivateLayout from "@src/components/layout/PrivateLayout";
import { showToastMessage } from "@src/utils/alert/toastMessage";
import AlertError from "@src/components/global/AlertError/AlertError";
import CustomBreadcrumbs from "@src/components/global/CustomBreadcrumbs";
import { createPolicyVersion } from "@src/features/policies/service/policies";
import CustomLoadingButton from "@src/components/global/CustomLoadingButton/CustomLoadingButton";
import {
  Box,
  Grid,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

const breadcrumbs = [
  { value: "/dashboard", text: "Inicio" },
  { value: "/dashboard/policies", text: "Políticas" },
  { value: "", text: "Nueva Versión" },
];

const PolicyVersionCreatePage = (props) => {
  const policyId = props?.params?.policyId;
  const navigate = useNavigate();
  const [apiErrors, setApiErrors] = useState([]);
  const [loadingSave, setLoadingSave] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoadingSave(true);
      let dataBody = {
        policy_id: policyId,
        policy_version_date: data?.policy_version_date || null,
        content: data?.content || null,
        version_number: data?.version_number || null,
      };
      await createPolicyVersion(dataBody);
      navigate(`/dashboard/policies/${policyId}`, { scroll: false });
      showToastMessage({ icon: "success", text: "¡Registro exitoso!" });
    } catch (error) {
      setApiErrors(error);
    } finally {
      setLoadingSave(false);
    }
  };

  return (
    <PrivateLayout>
      <div id="PolicyVersionCreatePage">
        <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
        <Container>
          <Grid container justifyContent={"center"}>
            <Grid item xs={12} md={8} mb={2}>
              <Box
                sx={{
                  backgroundColor: "white.main",
                  borderRadius: "10px",
                  p: 2,
                }}
              >
                <Box mb={2}>
                  <Typography variant="h4">
                    Formulario de Nueva Versión
                  </Typography>
                  <Typography variant="caption" mb={4}>
                    Ingrese la información de la nueva versión.
                  </Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      label="Versión"
                      autoComplete="off"
                      error={!!errors?.version_number}
                      {...register("version_number", { required: true })}
                    />
                  </Box>
                  <Box mb={2}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Fecha"
                      autoComplete="off"
                      error={!!errors?.policy_version_date}
                      InputLabelProps={{ shrink: true }}
                      {...register("policy_version_date", { required: true })}
                    />
                  </Box>
                  <Controller
                    name="content"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <Box
                        mb={2}
                        border={1}
                        borderColor={!!error ? "#d32f2f" : "transparent"}
                      >
                        <Editor value={value} onChange={onChange} />
                      </Box>
                    )}
                  />
                  <AlertError errorList={apiErrors} />
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
                      disabled={loadingSave}
                      component={Link}
                      href={"/dashboard/policies"}
                    >
                      Atrás
                    </Button>
                    <CustomLoadingButton
                      text="Registrar"
                      loading={loadingSave}
                    />
                  </Grid>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </PrivateLayout>
  );
};

export default PolicyVersionCreatePage;
