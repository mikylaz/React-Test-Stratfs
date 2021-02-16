import React from 'react'
import {connect, shallowEqual} from 'react-redux'
import {fetchData, deleteData} from './store/data.js'
import AddDebt from './addDebt'
import {Modal, Button} from 'react-bootstrap'
import './public/App.scss'
import { AllCheckerCheckbox, Checkbox, CheckboxGroup } from '@createnl/grouped-checkboxes';
import { Collapse } from 'bootstrap'


class App extends React.Component {
  constructor(){
    super()
    this.state = {
      show: false,
      total_balance: 0,
      count: 0,
      selected_id: [],
      selected_balance: [],
      allchekced: false,
    }
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAllChecked = this.handleAllChecked.bind(this)
    }

  //get all debt data from redux
  componentDidMount() {
    this.props.getData()
  }

  // close the modal
  handleClose() {
    this.setState({show: false})
  }

  // invoke below function whenver select all box is clicked, when the checkbox is checked, check all individual boxes, otherwise uncheck all the other boxes
handleAllChecked(event){
  if (event.target.checked){
    let newBalance = 0
    let new_selected_id = []
    let new_selected_balance = []
    for(let i = 0; i< this.props.data.length; i++){
      newBalance += this.props.data[i].balance
      new_selected_id.push(this.props.data[i].id)
      new_selected_balance.push({id: this.props.data[i].id, balance: this.props.data[i].balance})
    }
    this.setState({allchekced: true, total_balance: newBalance, selected_id: new_selected_id, selected_balance: new_selected_balance, count:this.props.data.length })

  }
  else{
    this.setState({allchecked: false, total_balance: 0, selected_id: [], selected_balance: [], count:0})
  }
}

  //check and uncheck individual checkbox and calculate checked row count and total balance
 handleChange(balance, id) {
    return event=> {
        console.log('check state: ',event.target.checked)
        if(event.target.checked){
          this.setState({total_balance: this.state.total_balance+balance,
          count: this.state.count+1})
          if(!(this.state.selected_id.includes(id))){
            this.setState({selected_id:[...this.state.selected_id, id]})
            this.setState({selected_balance: [...this.state.selected_balance, {id:id, balance:balance}]})
          }
        }
        else{
          this.setState({total_balance: this.state.total_balance-balance,
          count: this.state.count-1, allchecked:false})
          if(this.state.selected_id.includes(id)){
            this.setState({selected_id:this.state.selected_id.filter(elm => elm!==id)})
            this.setState({selected_balance:this.state.selected_balance.filter(elm => Number(elm.id)!==Number(id))})
          }
        }
    };
}

  //delete selected rows
  handleDelete(selected_id, selected_balance) {
    let newBalance = 0
    let newCount = 0
    for(let i =0; i< selected_balance.length; i++){
      newBalance -= selected_balance[i].balance
      newCount -= 1
    }
    this.setState({total_balance: this.state.total_balance+newBalance, count:this.state.count+newCount, selected_id: [], selected_balance: []})
    this.props.removeData(selected_id)
  }

  render() {
    const data = this.props.data
    console.log('selected_id: ', this.state.selected_id)
    return (
      <div>
        <table >
          <tbody>
          <tr>
            <th className={'table_checkbox'}><input type ="checkbox" onChange = {this.handleAllChecked}/></th>
            <th className={'tbStyle'}>Creditor</th>
            <th className={'tbStyle'}>First Name</th>
            <th className={'tbStyle'}>Last Name</th>
            <th className={'tbStyle'} >Min Pay%</th>
            <th className={'tbStyle'}>Balance</th>
          </tr>
          </tbody>
          </table>
          <table>
          <tbody>
          {data &&
            data.map(element => {
              return (
                <tr key = {element.id} className={!(this.state.selected_id.includes(element.id))? 'selected': ''}>
                 <td className={'table_checkbox'}><input type="checkbox" onChange = {this.handleChange(element.balance, element.id)} checked={this.state.selected_id.includes(element.id)}/>{' '}</td>
                 <td><div className={'cell'}>{element.creditorName}</div></td>
                 <td><div className={'cell'}>{element.firstName}</div></td>
                 <td><div className={'cell'}>{element.lastName}</div></td>
                 <td><div className={'cell'}>{element.minPaymentPercentage.toFixed(2)}%</div></td>
                 <td><div className={'cell'}>{element.balance.toFixed(2)}</div></td>
               </tr>
              )
            })}
          </tbody>
        </table>
        <button style={{backgroundColor: '#0099ff', margin: '5px', color:'white', border: 'none'}} onClick={() => this.setState({show: true})}>Add Debt</button>
        <button style={{backgroundColor: '#0099ff', margin: '5px', color:'white', border: 'none'}} onClick={()=> this.handleDelete(this.state.selected_id, this.state.selected_balance)}>Delete Debt</button>

        <div className = {'totalBoxes'}>
          <div className={'total'}>Total: </div>
          <div className={'total'}>{this.state.total_balance}</div>
        </div>
        <div className={'sumBoxes'}>
          <div className={'summary'}>Total Row Count: {data.length}</div>
          <div className={'summary'}>Check Row Count: {this.state.count}</div>
        </div>
        {/*when 'add debt' button is clicked, show modal for adding a row, reders the <AddDebt> component */}
        <div>
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add a Debt</Modal.Title>
              </Modal.Header>
              <AddDebt close={this.handleClose} />
            </Modal>
          </div>
      </div>
    )
  }
}

const mapState = state => ({
  data: state.data
})

const mapDispatch = dispatch => ({
  getData: () => dispatch(fetchData()),
  addData: (newData) => dispatch(postData(newData)),
  removeData: (id) => dispatch(deleteData(id))
})

export default connect(mapState, mapDispatch)(App)
