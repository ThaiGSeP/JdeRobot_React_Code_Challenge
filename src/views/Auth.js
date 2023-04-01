import LoginForm from '../components/auth/LoginForm'
import { AuthContext } from '../contexts/AuthContext'
import { useContext } from 'react'
import { Redirect } from 'react-router-dom'

const Auth = () => {
	const {authState: {user}} = useContext(AuthContext);
	if (user.username) 
		return <Redirect to='/dashboard' />
	else
		return (
			<div className='landing'>
				<div className='dark-overlay'>
					<div className='landing-inner'>
						<h1>Tasks Tracking</h1>
						<h4>Tracking of what are you doing!</h4>
						<LoginForm />
					</div>
				</div>
			</div>
		)
}

export default Auth
