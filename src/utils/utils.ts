export const errObj = (sequelizeError: any) => {
	const errObj: { [key: string]: string } = {};
	if (!!sequelizeError.errors) {
		sequelizeError?.errors?.map((e: any) => {
			errObj[e.path] = e.message;
		});
	} else {
		errObj[sequelizeError.path] = sequelizeError.message;
	}
	return errObj;
};

export const resModel = (props: { data?: any; success: boolean; successMessage?: string; error?: { [key: string]: string } | string }) => {
	return {
		success: props.success,
		...(!!props.data && { data: props.data }),
		...(!!props.successMessage && { successMessage: props.successMessage }),
		...(!!props.error && { error: props.error }),
	};
};
