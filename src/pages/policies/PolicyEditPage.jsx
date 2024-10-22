import { useEffect, useState } from "react";
import Editor from "react-simple-wysiwyg";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import PrivateLayout from "@src/components/layout/PrivateLayout";
import { formatUtcDate } from "@src/utils/formatting/dateFormat";
import AlertError from "@src/components/global/AlertError/AlertError";
import CustomBreadcrumbs from "@src/components/global/CustomBreadcrumbs";
import CustomLoadingButton from "@src/components/global/CustomLoadingButton/CustomLoadingButton";
import {
  showToastError,
  showToastMessage,
} from "@src/utils/alert/toastMessage";

import {
  getPolicy,
  updatePolicy,
} from "@src/features/policies/service/policies";

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
  { value: "", text: "Editar Política" },
];

const PolicyEditPage = (props) => {
  const { policyId } = useParams();
  const navigate = useNavigate();
  const [apiErrors, setApiErrors] = useState([]);
  const [loadingSave, setLoadingSave] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const [policy, setPolicy] = useState(false);
  const {
    setValue,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoadingSave(true);
      setApiErrors([]);
      let dataBody = {
        path: data?.path || null,
        description: null,
        policy_code: data?.policy_code || null,
        policy_version: {
          version_number: data?.version_number,
          policy_version_date: data?.policy_version_date || null,
          content: data?.content || null,
        },
      };
      await updatePolicy({ params: dataBody, policyId });
      navigate(`/dashboard/policies/${policyId}`, { scroll: false });
      showToastMessage({ icon: "success", text: "¡Registro exitoso!" });
    } catch (error) {
      setApiErrors(error);
    } finally {
      setLoadingSave(false);
    }
  };

  const loadPolicy = async () => {
    try {
      setIsloading(true);
      const response = await getPolicy(policyId);
      const { current_version } = response;
      if (response) {
        setValue("policy_code", response?.policy_code || "");
        setValue("path", response?.path || "");
        setValue("version_number", current_version?.version_number);
        setValue(
          "policy_version_date",
          formatUtcDate(current_version?.policy_version_date, "YYYY-MM-DD") ||
            null
        );
        setValue("content", current_version?.content || "");
      }
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
      <div id="PolicyEditPage">
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
                  <Typography variant="h4">Editar Política</Typography>
                  <Typography variant="caption" mb={4}>
                    Ingrese la información de la política.
                  </Typography>
                </Box>
                {!isloading && (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Box mb={2}>
                      <TextField
                        fullWidth
                        label="Código"
                        autoComplete="off"
                        error={!!errors?.policy_code}
                        {...register("policy_code", { required: true })}
                      />
                    </Box>
                    <Box mb={2}>
                      <TextField
                        fullWidth
                        label="Nombre URL"
                        autoComplete="off"
                        error={!!errors?.path}
                        {...register("path", { required: true })}
                      />
                    </Box>
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
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </div>
    </PrivateLayout>
  );
};

export default PolicyEditPage;
