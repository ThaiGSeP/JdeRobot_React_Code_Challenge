import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import ActionButtons from './ActionButtons'

const SinglePost = ({ post: { id, status, title, description, url, deadline } }) => (
	<Card
		className='shadow mb-2'
		border={
			status === 'DONE'
				? 'success'
				: status === 'IN PROGESS'
				? 'warning'
				: 'danger'
		}
	>
		<Card.Body>
			<Card.Title>
				<Row>
					<Col>
						<p className='post-title'>{title}</p>
						<Badge
							pill
							variant={
								status === 'DONE'
									? 'success'
									: status === 'IN PROGESS'
									? 'warning'
									: 'danger'
							}
						>
							{status}
						</Badge>
					</Col>
					<Col className='text-right'>
						<ActionButtons url={url} id={id} />
						<p className='post-deadline'>{deadline}</p>
					</Col>
				</Row>
			</Card.Title>
			<Card.Text>{description}</Card.Text>
		</Card.Body>
	</Card>
)

export default SinglePost
