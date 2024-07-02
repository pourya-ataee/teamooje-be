export const errObj = (mongooseError: any) => {
	const errObj: { [key: string]: string } = {};
	if (!!mongooseError?.errors) {
		Object.keys(mongooseError.errors).forEach((e) => {
			errObj[e] = mongooseError.errors[e].properties.message;
		});
		return errObj;
	}
	return "خطایی رخ داده است";
};

export const resModel = (props: { data?: any; success: boolean; successMessage?: string; error?: { [key: string]: string } | string }) => {
	return {
		success: props.success,
		...(!!props.data && { data: props.data }),
		...(!!props.successMessage && { successMessage: props.successMessage }),
		...(!!props.error && { error: props.error }),
	};
};
