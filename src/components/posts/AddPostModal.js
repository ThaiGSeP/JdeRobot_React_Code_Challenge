import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'
import { v4 as uuidv4 } from 'uuid'

const AddPostModal = () => {
	// Contexts
	const {
		showAddPostModal,
		setShowAddPostModal,
		addPost,
		setShowToast
	} = useContext(PostContext)

	// State
	const [newPost, setNewPost] = useState({
		id: uuidv4(),
		title: '',
		description: '',
		url: '',
		status: 'TO DO',
		deadline: '',
	})

	const { title, description, url, deadline } = newPost

	const onChangeNewPostForm = event =>
		setNewPost({ ...newPost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddPostData()
	}

	const onSubmit = event => {
		event.preventDefault()
		addPost(newPost)
		resetAddPostData()
		setShowToast({ show: true, message: 'Create new post succesfully!', type: 'success'})
	}

	const resetAddPostData = () => {
		setNewPost({id: uuidv4(), title: '', description: '', url: '', status: 'TO DO' })
		setShowAddPostModal(false)
	}

	return (
		<Modal show={showAddPostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Create new task!</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Title'
							name='title'
							required
							aria-describedby='title-help'
							value={title}
							onChange={onChangeNewPostForm}
						/>
						<Form.Text id='title-help' muted>
							Required
						</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='Description'
							name='description'
							value={description}
							onChange={onChangeNewPostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type='text'
							placeholder='Material URL'
							name='url'
							value={url}
							onChange={onChangeNewPostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type='date'
							placeholder='Deadline Day'
							name='deadline'
							value={deadline}
							onChange={onChangeNewPostForm}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Cancel
					</Button>
					<Button variant='primary' type='submit'>
						Submit
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default AddPostModal
