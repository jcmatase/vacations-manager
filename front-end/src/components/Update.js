import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {getDay, getMonth, getYear} from '../utils/utils';

class Update extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      createDate: new Date(),
      startDate2: new Date(),
      endDate: new Date(),
      endDate2: new Date(),
      reason: '',
      requestedDay: '',
      month: '',
      year: '',
      status: '',
      messageFromServer: '',
      modalIsOpen: false
    }
    this.update = this.update.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.vacation.id,
      createDate: this.props.vacation.createDate,
      startDate: this.props.vacation.startDate,
      startDate2: this.setDateObject(this.props.vacation.startDate),
      endDate: this.props.vacation.endDate,
      endDate2: this.setDateObject(this.props.vacation.endDate),
      reason: this.props.vacation.reason,
      requestedDay: this.props.vacation.requestedDay,
      month: this.props.vacation.month,
      year: this.props.vacation.year,
      status: this.props.vacation.status
    });
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      id: nextProps.vacation.id,
      createDate: nextProps.vacation.createDate,
      startDate: nextProps.vacation.startDate,
      endDate: nextProps.vacation.endDate,
      reason: nextProps.vacation.reason,
      requestedDay: nextProps.vacation.requestedDay,
      month:nextProps.vacation.month,
      year:nextProps.vacation.year,
      status:nextProps.vacation.status
    })
  }

  setDateObject(pDateObj) {
    var newDateObj = new Date(pDateObj);
    return newDateObj;
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      messageFromServer: ''
    });
  }

  handleStartDateChange = date => {
    this.setDateObject(this.state.createDate);
    this.setState({
      startDate2: date
    });
    this.setState({
      requestedDay: getDay(date)
    });
    this.setState({
      month: getMonth(date)
    });
    this.setState({
      year: getYear(date)
    });
  };

  handleEndDateChange = date => {
    this.setState({
      endDate2: date
    });
  };  

  handleSelectChange(e) {
    if (e.target.name === "month") {
      this.setState({
        month: e.target.value
      });
    }
    if (e.target.name === "year") {
      this.setState({
        year: e.target.value
      });
    }
    if (e.target.name === "status") {
      this.setState({
        status: e.target.value
      });
    }    
  }

  handleTextChange(e) {
    if (e.target.name === "reason") {
      this.setState({
        reason: e.target.value
      });
    }
  }

  onClick(e) {
    this.update(this);
  }

  update(e) {
    var vacation = {
      id: e.state.id,
      createDate: e.state.createDate,
      startDate: this.state.startDate2,
      endDate: this.state.endDate2,
      reason: e.state.reason,
      requestedDay: e.state.requestedDay,
      month: e.state.month,
      year: e.state.year,
      status: e.state.status
    }
    axios.post('http://localhost:8080/vacations',vacation).then(function(response) {
      e.setState({
        messageFromServer: response.data
      });
    });
  }

  render() {
    if(this.state.messageFromServer === '') {
      return (
        <div>
          <Button bsStyle="warning" size="small" onClick={this.openModal}><span className="glyphicon glyphicon-edit"></span></Button>
          <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} contentLabel="Add Vacation" className="Modal">
            <Link to={{pathname: '/', search: '?month='+this.state.month+'&year='+this.state.year }} style={{ textDecoration: 'none' }}>
              <Button bsStyle="danger" size="mini" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
            </Link>
            <br/>
            <fieldset>
              <label for="status">Status:</label>
              <select id="status" name="status" value={this.state.status} onChange={this.handleSelectChange}>
                <option value="0" id="0">Pending</option>
                <option value="1" id="1">Approved</option>
                <option value="2" id="2">In Review</option>
                <option value="3" id="3">Denied</option>
              </select>
              <label for="startDate">Start Date:</label>
              <DatePicker selected={this.state.startDate2} onChange={this.handleStartDateChange}/>
              <label for="endDate">End Date:</label>
              <DatePicker selected={this.state.endDate2} onChange={this.handleEndDateChange}/>
              <label for="reason">Reason:</label>
              <input type="text" id="reason" name="reason" value={this.state.reason} onChange={this.handleTextChange}></input>
            </fieldset>
            <div className='button-center'>
              <br/>
              <Button bsStyle="warning" size="small" onClick={this.onClick}>Update</Button>
            </div>
          </Modal>
        </div>
      )
    }
    else {
      return (
        <div>
          <Button bsStyle="warning" size="small" onClick={this.openModal}><span className="glyphicon glyphicon-edit"></span></Button>
          <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} contentLabel="Add Vacation" className="Modal">
            <div className='button-center'>
              <h3>{this.state.messageFromServer}</h3>
              <Link to={{pathname: '/', search: '?month='+this.state.month+'&year='+this.state.year}} style={{ textDecoration: 'none' }}>
                <Button bsStyle="success" size="mini" onClick={this.closeModal}>Close the Dialog</Button>
              </Link>
            </div>
          </Modal>
        </div>
      )
    }
  }
}
export default Update;
