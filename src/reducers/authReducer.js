import { SET_AUTH } from "../contexts/constants";
export const authReducer = (state, action) => {
	const {
		type,
		payload: { user }
	} = action

	console.log("user in auth reducer: ", user);
	console.log("type:", type);

	switch (type) {
		case SET_AUTH:
			return {
				...state,
				user
			}

		default:
			return state
	}
}
