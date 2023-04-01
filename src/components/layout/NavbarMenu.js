import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { PostContext } from '../../contexts/PostContext'
import { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import saveIcon from '../../assets/save.jpg'
import { LOCAL_STORAGE_POST_NAME } from '../../contexts/constants'

const NavbarMenu = () => {

	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		postState: {
			posts
		},
		sortPostsByTitle,
		sortPostsByDeadline,
		setShowToast
	} = useContext(PostContext)

	const save = () => {
		// convert the object to a JSON string
		const postJsonString = JSON.stringify(posts);

		// store the JSON string in local storage
		localStorage.setItem(LOCAL_STORAGE_POST_NAME, postJsonString);
		setShowToast({ show: true, message: "The posts have succesfully save!", type: 'success' })
	}

	const sort = (option) => {
		console.log('run this!');
		console.log('option:', option);
		if (option === 'title') {
			sortPostsByTitle();
		} else if (option === 'deadline') {
			sortPostsByDeadline();
		}
	}

	return (
		<Navbar expand='lg' bg='primary' variant='dark' className='shadow'>

			<Navbar.Collapse id='basic-navbar-nav'>
				<Nav className='mr-auto'>
					<Nav.Link
						className='font-weight-bolder text-white'
						to='/dashboard'
						as={Link}
					>
						Dashboard
					</Nav.Link>

					<Nav.Link className='font-weight-bolder text-white' disabled>
						Welcome {username}
					</Nav.Link>
				</Nav>
				<Nav>
					<DropdownButton id="dropdown-basic-button" title="Sort By">
						<Dropdown.Item onClick={() => {sort('title')}}>Title</Dropdown.Item>
						<Dropdown.Item onClick={() => {sort('deadline')}}>Deadline</Dropdown.Item>
					</DropdownButton>
					<Button
						variant='primary'
						className='font-weight-bolder text-white'
						onClick={save}
					>
						<img
							src={saveIcon}
							alt='saveIcon'
							width='24'
							height='24'
							className='mr-2'
						/>
						Save
					</Button>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	)
}

export default NavbarMenu
