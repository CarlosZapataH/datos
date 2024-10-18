
//import Link from 'next/link';
import { useState } from 'react';
import Editor from 'react-simple-wysiwyg';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import CustomBreadcrumbs from '@src/components/global/CustomBreadcrumbs';
import AlertError from '@src/components/global/AlertError/AlertError.jsx';
import { createPolicy } from '@src/features/policies/service/policies';
import CustomLoadingButton from '@src/components/global/CustomLoadingButton/CustomLoadingButton';

import {
	Container,
	Box,
	Typography,
	TextField,
	Grid,
	Button,
	FormControlLabel,
	Checkbox,
	CircularProgress,
} from '@mui/material';
import { showToastMessage } from '@/utils/alert/toastMessage';

const breadcrumbs = [
	{ value: '/dashboard', text: 'Inicio' },
	{ value: '/dashboard/policies', text: 'Políticas' },
	{ value: '', text: 'Formulario' },
];

const CreatePolicyPage = () => {
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
				policy_code: data?.policy_code || null,
				policy_version: {
					policy_version_date: data?.policy_version_date || null,
					version_number: data?.version_number || null,
					content: data?.content,
				},
			};
			const response = await createPolicy(dataBody);
			navigate(`/dashboard/policies/${response?.id}`);
			showToastMessage({ icon: 'success', text: '¡Registro exitoso!' });
		} catch (error) {
			setApiErrors(error);
		} finally {
			setLoadingSave(false);
		}
	};

	return (
		<div id="CreatePolicyPage">
			<CustomBreadcrumbs breadcrumbs={breadcrumbs} />
			<Container>
				<Grid container justifyContent={'center'}>
					<Grid item xs={12} md={8} mb={2}>
						<Box
							sx={{
								backgroundColor: 'white.main',
								borderRadius: '10px',
								p: 2,
							}}
						>
							<Box mb={2}>
								<Typography variant="h4">Fomulario de política</Typography>
								<Typography variant="caption" mb={4}>
									Registre la información en el formulario
								</Typography>
							</Box>

							<form onSubmit={handleSubmit(onSubmit)}>
								<Box mb={2}>
									<TextField
										fullWidth
										label="Código"
										autoComplete="off"
										error={!!errors?.policy_code}
										{...register('policy_code', { required: true })}
									/>
								</Box>
								<Box mb={2}>
									<TextField
										fullWidth
										label="Versión"
										autoComplete="off"
										error={!!errors?.version_number}
										{...register('version_number', { required: true })}
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
										{...register('policy_version_date', { required: true })}
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
											borderColor={!!error ? '#d32f2f' : 'transparent'}
										>
											<Editor value={value} onChange={onChange} />
										</Box>
									)}
								/>
								<AlertError errorList={apiErrors} />
								<Grid
									display={'flex'}
									justifyContent={'flex-end'}
									item
									xs={12}
									mt={4}
								>
									<Button
										sx={{ ml: 1 }}
										variant="outlined"
										disabled={loadingSave}
										component={Link}
										href={'/dashboard/policies'}
									>
										Atrás
									</Button>
									<CustomLoadingButton text="Registrar" loading={loadingSave} />
								</Grid>
							</form>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default CreatePolicyPage;
