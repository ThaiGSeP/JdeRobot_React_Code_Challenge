import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

const LoginForm = () => {
	// Context
	const { loadUser } = useContext(AuthContext)

	// Local state
	const [loginForm, setLoginForm] = useState({
		username: ''
	})

	const { username } = loginForm

	const onChangeLoginForm = event =>
		setLoginForm({ ...loginForm, [event.target.name]: event.target.value })

	const login = async event => {
		event.preventDefault()
		console.log("username", username);
		loadUser(username)
	}

	return (
		<>
			<Form className='my-4' onSubmit={login}>
				<Form.Group>
					<Form.Control
						type='text'
						placeholder='Username'
						name='username'
						required
						value={username}
						onChange={onChangeLoginForm}
					/>
				</Form.Group>
				<Button variant='success' type='submit'>
					Login
				</Button>
			</Form>
		</>
	)
}

export default LoginForm
