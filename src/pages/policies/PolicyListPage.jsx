import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "@src/utils/formatting/dateFormat";
import { showToastError } from "@src/utils/alert/toastMessage";
import { getPolicies } from "@src/features/policies/service/policies";
import CustomBreadcrumbs from "@src/components/global/CustomBreadcrumbs";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ResponsiveTable from "@src/components/global/ResponsiveTable/ResponsiveTable";
import {
  Container,
  Paper,
  TableContainer,
  Grid,
  Box,
  Button,
  IconButton,
  Stack,
  Pagination,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import PrivateLayout from "@src/components/layout/PrivateLayout";

const breadcrumbs = [
  { value: "/dashboard", text: "Inicio" },
  { value: "", text: "Políticas" },
];

const PolicyListPage = () => {
  const [warehouses, setPolicies] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  let timeoutId;

  const [filters, setFilters] = useState({
    pagination: true,
    currentPage: 1,
    itemsPerPage: 20,
  });

  const handleNameSearch = (input) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      setFilters({
        ...filters,
        name: input ? input : null,
        currentPage: 1,
      });
    }, 1000);
  };

  const columns = [
    {
      id: "policy_code",
      label: "Código",
      minWidth: 100,
    },
    {
      id: "creator",
      label: "Responsable",
      minWidth: 150,
      format: (value) => value?.fullName,
    },
    {
      id: "created_at",
      label: "Fecha de publicación",
      minWidth: 100,
      align: "center",
      format: (value) => formatDate(value, "LL"),
    },
    {
      id: "is_active",
      label: "Estado",
      minWidth: 100,
      align: "center",
      format: (value) => (value ? "Activo" : "Inactivo"),
    },
    {
      id: "id",
      label: "",
      minWidth: 100,
      align: "right",
      format: (__, item) => {
        return (
          <IconButton
            size="small"
            color="primary"
            component={Link}
            to={`/dashboard/policies/${item?.id}`}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
          // <ValidatePermission
          // module="almacen"
          // page="editarAlmacen"
          // activity="editarAlmacen"
          // >
          // </ValidatePermission>
        );
      },
    },
  ];

  const listPolicies = async () => {
    try {
      setLoading(true);
      const response = await getPolicies(filters);
      if (response) {
        setPolicies(response?.data);
        setPagination(response?.pagination);
      }
    } catch (error) {
      setPolicies([]);
      showToastError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePagination = (__, value) => {
    setFilters({ ...filters, currentPage: value });
  };

  useEffect(() => {
    listPolicies();
  }, [filters]);

  return (
    <PrivateLayout>
      <div id="storePage">
        <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
        <Container>
          <Grid
            justifyContent="space-between"
            alignItems="end"
            mb={2}
            container
          >
            <Grid item>
              <Typography variant="h4" component="h1">
                Políticas
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Agregue o actualice los datos de las Políticas
              </Typography>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="outlined"
                component={Link}
                to={"/dashboard/policies/create"}
              >
                Registrar Política
              </Button>
              {/* <ValidatePermission
							module="almacen"
							page="crearAlmacen"
							activity="crearAlmacen"
						></ValidatePermission> */}
            </Grid>
          </Grid>

          <TableContainer component={Paper}>
            {loading && <LinearProgress />}
            <Grid spacing={2} container p={2}>
              <Grid xs={12} md={4} item>
                <TextField
                  size="small"
                  id="outlined-basic"
                  variant="outlined"
                  autoComplete="off"
                  label="Búsqueda por código"
                  fullWidth
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length >= 2 || value === "") {
                      handleNameSearch(value);
                    }
                  }}
                />
              </Grid>
            </Grid>
            {!loading ? (
              <ResponsiveTable
                columns={columns}
                items={warehouses}
              ></ResponsiveTable>
            ) : null}
          </TableContainer>
          {pagination && (
            <Stack
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
              my={2}
            >
              <Pagination
                count={pagination?.totalPages}
                page={filters?.currentPage}
                variant="outlined"
                shape="rounded"
                onChange={handleChangePagination}
              />
            </Stack>
          )}
        </Container>
        {/* <WareHouseDialog
				open={enableDialog}
				setOpen={setEnableDialog}
				updateData={listWarehouses}
				warehouse={currentWarehouse}
			/> */}
      </div>
    </PrivateLayout>
  );
};

export default PolicyListPage;
