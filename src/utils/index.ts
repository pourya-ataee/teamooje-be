export const errObj = (mongooseError: any) => {
	const errObj: { [key: string]: string } = {};
	Object.keys(mongooseError.errors).forEach((e) => {
		errObj[e] = mongooseError.errors[e].properties.message;
	});
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
