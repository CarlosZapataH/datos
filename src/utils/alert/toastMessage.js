import Swal from 'sweetalert2';
//import withReactContent from 'sweetalert2-react-content';

//const MySwal = withReactContent(Swal);

const showToastMessage = ({
	icon = 'success',
	title = '',
	text = '',
	timer = 5000,
}) => {
	const Toast = Swal.mixin({
		toast: true,
		position: 'bottom-start',
		showConfirmButton: false,
		timer,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		},
	});
	Toast.fire({ icon, title, text });
};

const showToastError = (error) => {
	const apiErrorMessage = error?.response?.data?.message;
	if (Array.isArray(apiErrorMessage)) {
		apiErrorMessage.forEach((message) => {
			showToastMessage({ icon: 'error', title: 'Atención', text: message });
		});
	} else if (apiErrorMessage) {
		showToastMessage({ icon: 'error', title: '¡Oops!', text: apiErrorMessage });
	} else {
		showToastMessage({
			icon: 'error',
			title: 'Error',
			text: error?.toString(),
		});
	}
};

export { showToastMessage, showToastError };
