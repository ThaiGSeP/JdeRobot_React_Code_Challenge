import {
	ADD_POST,
	DELETE_POST,
	UPDATE_POST,
	FIND_POST,
	LOAD_POST,
	SORT_POST,
} from '../contexts/constants'

export const postReducer = (state, action) => {
	const { type, payload } = action
	switch (type) {
		case SORT_POST:
			return {
				...state,
				posts: payload.posts,
				sortBy: payload.sortBy
			}
		case LOAD_POST:
			return {
				...state,
				posts: payload
			}
		case ADD_POST:
			return {
				...state,
				posts: [...state.posts, payload]
			}

		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter(post => post.id !== payload)
			}

		case FIND_POST:
			return { ...state, post: payload }

		case UPDATE_POST:
			const newPosts = state.posts.map(post =>
				{
					console.log("post id", post.id);
					console.log("payload.ID,", payload.id);
					return post.id === payload.id ? payload : post
				}
			)

			return {
				...state,
				posts: newPosts
			}

		default:
			return state
	}
}
