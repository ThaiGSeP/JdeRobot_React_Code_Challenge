import { createContext, useReducer, useState } from 'react'
import { postReducer } from '../reducers/postReducer'
import { useCallback } from 'react'
import {
	ADD_POST,
	DELETE_POST,
	UPDATE_POST,
	FIND_POST,
	LOAD_POST,
	SORT_POST,
} from './constants'
import { LOCAL_STORAGE_POST_NAME } from './constants'

export const PostContext = createContext()

const PostContextProvider = ({ children }) => {
	// State
	const [postState, dispatch] = useReducer(postReducer, {
		post: null,
		posts: [],
		sortBy: '',
	})

	const [showAddPostModal, setShowAddPostModal] = useState(false)
	const [showUpdatePostModal, setShowUpdatePostModal] = useState(false)
	const [showToast, setShowToast] = useState({
		show: false,
		message: '',
		type: null
	})

	// load post
	const loadPost = useCallback(() => {
		// retrieve the JSON string from local storage
		const postsJsonString = localStorage.getItem(LOCAL_STORAGE_POST_NAME);
		const postsJson = JSON.parse(postsJsonString);
		console.log("load post:", postsJson);
		if (postsJson) {
			dispatch({type: LOAD_POST, payload: postsJson})
		}
	},[])

	// Add post
	const addPost = newPost => {
		dispatch({ type: ADD_POST, payload: newPost })
	}

	// Delete post
	const deletePost = postId => {
		dispatch({ type: DELETE_POST, payload: postId })
	}

	// Find post when user is updating post
	const findPost = postId => {
		const post = postState.posts.find(post => post.id === postId)
		dispatch({ type: FIND_POST, payload: post })
	}

	// Update post
	const updatePost = updatedPost => {
		dispatch({ type: UPDATE_POST, payload: updatedPost })
	}

	// Sort posts by title
	const sortPostsByTitle = () => {
		console.log("sort by title")
		const sortedPosts = postState.posts.sort((a, b) => {
			if (a.title < b.title) {
			  return -1;
			}
			if (a.title > b.title) {
			  return 1;
			}
			return 0;
		});
		console.log("posts sorted by title: ", sortedPosts);
		dispatch({ type: SORT_POST, payload: {posts: sortedPosts, sortBy: 'title'} })
	}

	// Sort posts by deadline
	const sortPostsByDeadline = () => {
		const sortedPosts = postState.posts.sort((a, b) => {
			return new Date(a.deadline) - new Date(b.deadline);
		});
		dispatch({ type: SORT_POST, payload: {posts: sortedPosts, sortBy: 'deadline'} })
	}

	// Post context data
	const postContextData = {
		postState,
		showAddPostModal,
		setShowAddPostModal,
		showUpdatePostModal,
		setShowUpdatePostModal,
		sortPostsByDeadline,
		sortPostsByTitle,
		loadPost,
		addPost,
		showToast,
		setShowToast,
		deletePost,
		findPost,
		updatePost
	}

	return (
		<PostContext.Provider value={postContextData}>
			{children}
		</PostContext.Provider>
	)
}

export default PostContextProvider
