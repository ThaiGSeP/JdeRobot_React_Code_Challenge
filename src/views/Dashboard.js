import { PostContext } from '../contexts/PostContext'
import { useCallback, useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col'
import SinglePost from '../components/posts/SinglePost'
import AddPostModal from '../components/posts/AddPostModal'
import UpdatePostModal from '../components/posts/UpdatePostModal'
import addIcon from '../assets/plus-circle-fill.svg'
import { AuthContext } from '../contexts/AuthContext'
import { Card } from 'react-bootstrap'

const Dashboard = () => {
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		postState: { post, posts, sortBy },
		loadPost,
		setShowAddPostModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(PostContext)

	// Classify posts based on their completion status
	const [toDoPosts, setToDoPosts] = useState([]);
	const [inProgressPosts, setInProgressPosts] = useState([]);
	const [donePosts, setDonePosts] = useState([]);
	const [deadlineNotiOpen, setDeadlineNotiOpen] = useState(true);
	const [earliestDeadline, setEarliestDeadline] = useState({
		title : '',
		deadline: '',
	});

	useEffect(() => {
		setToDoPosts([]);
		setInProgressPosts([]);
		setDonePosts([]);
		posts.forEach(post => {
		if (post.status === 'TO DO') {
			setToDoPosts(prev => [...prev, post]);
		} else if (post.status === 'IN PROGRESS') {
			setInProgressPosts(prev => [...prev, post]);
		} else if (post.status === 'DONE') {
			setDonePosts(prev => [...prev, post]);
		}
		});
	}, [posts, sortBy]);

	useEffect(() => {
		loadPost();
	}, [loadPost])

	const closeDeadlineNotify = () => {
		setDeadlineNotiOpen(false);
	}

	const getEarliestDeadline = useCallback(() => {	
		if (posts.length === 0) {
			return;
		}
		let earliestDeadlineTask = posts[0];
		let earliestDeadline = new Date(posts[0].deadline);
		for (let i = 1; i < posts.length; i++) {
			const deadline = new Date(posts[i].deadline);
			if (deadline < earliestDeadline) {
				earliestDeadline = deadline;
				earliestDeadlineTask = posts[i];
			}
		}
		setEarliestDeadline(earliestDeadlineTask);
	}, [posts])

	useEffect(()=> {
		getEarliestDeadline();
	}, [getEarliestDeadline])

	// Start: Get all posts

	let body_1 = null
	let body_2 = null

	if (posts.length > 0) {
		body_1 = (
			<>
				<Card className={`text-center mx-5 my-5 ${deadlineNotiOpen ? '' : 'd-none'}`}>
					<Card.Header as='h1'>Hi {username}</Card.Header>
					<Card.Body>
						<Card.Title>Deadline Notification</Card.Title>
						<Card.Text>
							The deadline for task {earliestDeadline.title} is {earliestDeadline.deadline}, which is the earliest deadline.
						</Card.Text>
						<Button
							variant='primary'
							onClick={closeDeadlineNotify}
						>
							Close!
						</Button>
					</Card.Body>
				</Card>
			</>
			)
	}
	body_2 = (
		<>
			<Row className='row-cols-1 row-cols-md-3 g-4 mx-auto mt-3'>
				<Col xs={12} md={4} className="border-right">
					<h3 className="text-center">TO DO</h3>
					{toDoPosts.map(post => (
						<SinglePost key={post.id} post={post}/>
					))}
				</Col>
				<Col xs={12} md={4} className="border-right">
					<h3 className="text-center">IN PROGRESS</h3>
					{inProgressPosts.map(post => (
						<SinglePost key={post.id} post={post}/>
					))}
				</Col>
				<Col xs={12} md={4}>
					<h3 className="text-center">DONE</h3>
					{donePosts.map(post => (
						<SinglePost key={post.id} post={post}/>
					))}
				</Col>
			</Row>

			{/* Open Add Post Modal */}
			<OverlayTrigger
				placement='left'
				overlay={<Tooltip>Add a new thing to learn</Tooltip>}
			>
				<Button
					className='btn-floating'
					onClick={setShowAddPostModal.bind(this, true)}
				>
					<img src={addIcon} alt='add-post' width='60' height='60' />
				</Button>
			</OverlayTrigger>
		</>
	)

	return (
		<>
			{body_1}
			{body_2}
			<AddPostModal />
			{post !== null && <UpdatePostModal />}
			{/* After post is added, show toast */}
			<Toast
				show={show}
				style={{ position: 'fixed', top: '20%', right: '10px' }}
				className={`bg-${type} text-white`}
				onClose={setShowToast.bind(this, {
					show: false,
					message: '',
					type: null
				})}
				delay={3000}
				autohide
			>
				<Toast.Body>
					<strong>{message}</strong>
				</Toast.Body>
			</Toast>
		</>
	)
}

export default Dashboard
