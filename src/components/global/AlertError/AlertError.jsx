import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Alert, Box } from '@mui/material';

const AlertError = (props) => {
	const { errorList } = props;

	const computedErrors = useMemo(() => {
		let result = [];
		const msmApi = errorList?.response?.data?.message;
		if (Array.isArray(msmApi)) {
			result = msmApi;
		} else if (msmApi) {
			result.push(msmApi);
		} else if (errorList?.message) {
			result.push((errorList?.message || '').toString());
		}

		return result;
	}, [errorList]);

	return (
		<Box id="AlertError">
			{computedErrors.map((item, index) => (
				<Alert severity="error" key={index + '-alertError'}>
					{item}
				</Alert>
			))}
		</Box>
	);
};

AlertError.propTypes = {
	errorList: PropTypes.any,
};
export default AlertError;
