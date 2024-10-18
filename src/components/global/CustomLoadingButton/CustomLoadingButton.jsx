import { Button, CircularProgress } from '@mui/material';

const CustomLoadingButton = (props) => {
	const {
		text = '',
		type = 'submit',
		loading = false,
		paramsButton = {},
	} = props;
	return (
		<Button
			sx={{ ml: 1 }}
			variant="contained"
			type={type}
			disabled={loading}
			{...paramsButton}
		>
			{text}
			{loading && <CircularProgress color="white" size={20} sx={{ ml: 1 }} />}
		</Button>
	);
};
export default CustomLoadingButton;
