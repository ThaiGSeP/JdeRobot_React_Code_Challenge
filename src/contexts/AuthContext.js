import { createContext, useReducer, useEffect } from 'react'
import { authReducer } from '../reducers/authReducer'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(authReducer, {
		user: null
	})

	// Authenticate user
	const loadUser = (username) => {
		dispatch({
			type: 'SET_AUTH',
			payload: { user: {username} }
		});
	}

	useEffect(() => loadUser(), [])

	// Logout
	const logoutUser = () => {
		dispatch({
			type: 'SET_AUTH',
			payload: { user: null }
		})
	}

	// Context data
	const authContextData = { loadUser, logoutUser, authState }

	// Return provider
	return (
		<AuthContext.Provider value={authContextData}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
