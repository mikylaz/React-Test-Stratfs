import React from 'react'
import {connect} from 'react-redux'
import {Form, ListGroup, OverlayTrigger, Tooltip, Button} from 'react-bootstrap'
import {postData} from './store/data.js'

class AddData extends React.Component {
  constructor() {
    super()
    this.state = {
      creditorName: '',
      firstName: '',
      lastName: '',
      minPaymentPercentage: '',
      balance: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
      this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    let items = [...this.props.data]
    let lastId = Math.max.apply(null, items.map(item => item.id))
    let newId = lastId + 1;
    this.props.addData(
      {
        id: newId,
        creditorName: this.state.creditorName,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        minPaymentPercentage: Number(this.state.minPaymentPercentage),
        balance: Number(this.state.balance)
      }
    )
    this.props.close()
  }
  render() {
    return (
      <Form onSubmit={this.handleSubmit} style={{margin: '10px'}}>
        <Form.Group controlId="creditorName">
          <Form.Label>Creditor Name</Form.Label>
          <Form.Control
            name="creditorName"
            size="sm"
            type="text"
            value={this.state.creditorName}
            onChange={this.handleChange}
            placeholder="Creditor Name (Bank)"
            style={{width: '400px'}}
          />
        </Form.Group>
        <Form.Group controlId="firstName">
          <Form.Label>
            First Name
          </Form.Label>
          <Form.Control
            name="firstName"
            type="text"
            value={this.state.firstName}
            onChange={this.handleChange}
            placeholder="First Name"
            style={{width: '400px'}}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            name="lastName"
            type="text"
            value={this.state.lastName}
            onChange={this.handleChange}
            placeholder="Last Name"
            style={{width: '400px'}}
          />
        </Form.Group>
        <Form.Group controlId="minPaymentPercentage">
          <Form.Label>Min Payment%</Form.Label>
          <Form.Control
            name="minPaymentPercentage"
            value={this.state.minPaymentPercentage}
            onChange={this.handleChange}
            style={{width: '400px'}}
            placeholder='min payment in %'
          />
        </Form.Group>
        <Form.Group controlId="balance">
          <Form.Label>Balance</Form.Label>
          <Form.Control
            name="balance"
            // type="name"
            value={this.state.balance}
            onChange={this.handleChange}
            style={{width: '400px'}}
            placeholder='balance'
          />
        </Form.Group>

          <Button
            variant="primary"
            active
            type="submit"
          >
            Create
          </Button>
      </Form>
    )
  }
}
const mapState = state => ({
  data: state.data
})
const mapDispatch = dispatch => ({
  addData: (newData) => dispatch(postData(newData))
})

export default connect(mapState, mapDispatch)(AddData)

