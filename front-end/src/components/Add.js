import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

class Add extends React.Component {

  constructor() {
    super();
    this.state = {
      createDate: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      reason: '',
      requestedDay: '',
      month: '',
      year: '',
      status: '',
      messageFromServer: '',
      modalIsOpen: false
    }
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.insertNewVacation = this.insertNewVacation.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      reason: '',
      requestedDay: '',
      month: '',
      year: '',
      status: '',
      messageFromServer: ''
    });
  }

  handleStartDateChange = date => {
    this.setState({
      startDate: date
    });
    this.setState({
      requestedDay: this.getDay(date)
    });
    this.setState({
      month: this.getMonth(date)
    });
    this.setState({
      year: this.getYear(date)
    });
  };

  handleEndDateChange = date => {
    this.setState({
      endDate: date
    });
  };

  componentDidMount() {
    if(this.props.selectedMonth === 'All'){
      this.setState({
        month: 'Jan'
      });
    }
    else{
      this.setState({
        month: this.props.selectedMonth
      });
    }
    this.setState({
      year: this.props.selectedYear
    });
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.selectedMonth === 'All'){
      this.setState({
        month: 'Jan'
      });
    }
    else {
      this.setState({
        month: this.props.selectedMonth
      });
    }
    this.setState({
      year:nextProps.selectedYear
    })
  }

  handleSelectChange(e) {
    if (e.target.name === 'month') {
      this.setState({
        month: e.target.value
      });
    }
    if (e.target.name === 'year') {
      this.setState({
        year: e.target.value
      });
    }
    if (e.target.name === 'status') {
      this.setState({
        status: e.target.value
      });
    }    
  }

  onClick(e) {
    this.insertNewVacation(this);
  }

  getDay(pDateObj) {
    var ISODate = pDateObj.toISOString();
    var date = ISODate.split('T');
    date = date[0];
    var splitDate = date.split('-');
    return splitDate[2];
  }

  getMonth(pDateObj) {
    const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return MONTH_NAMES[pDateObj.getMonth()];
  }

  getYear(pDateObj) {
    var ISODate = pDateObj.toISOString();
    var date = ISODate.split('T');
    date = date[0];
    var splitDate = date.split('-');
    return splitDate[0];
  }

  insertNewVacation(e) {
    var vacation = {
      reason: e.state.reason,
      createDate: new Date(),
      startDate: e.state.startDate,
      endDate: e.state.endDate,
      requestedDay: this.getDay(e.state.startDate),
      month: this.getMonth(e.state.startDate),
      year: this.getYear(e.state.startDate),
      status: 0
    }
    axios.post('http://localhost:8080/vacations', vacation).then(function(response) {
      e.setState({
        messageFromServer: response.data
      });
    });
  }

  handleTextChange(e) {
    if (e.target.name === "reason") {
      this.setState({
        reason: e.target.value
      });
    }
    if (e.target.name === "requestedDay") {
      this.setState({
        requestedDay: e.target.value
      });
    }
  }

  render() {
    if(this.state.messageFromServer === '') {
      return (
        <div>
          <Button bsStyle="success" size="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
          <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} contentLabel="Add Vacation" className="Modal">
            <Link to={{pathname: '/', search: '?month='+this.state.month+'&year='+this.state.year }} style={{ textDecoration: 'none' }}>
              <Button bsStyle="danger" size="mini" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
            </Link>
            <br/>
            <fieldset>
              <label for="startDate">Start Date:</label>
              <DatePicker selected={this.state.startDate} onChange={this.handleStartDateChange}/>
              <label for="endDate">End Date:</label>
              <DatePicker selected={this.state.endDate} onChange={this.handleEndDateChange}/>
              <label for="reason">Reason:</label><input type="text" id="reason" name="reason" value={this.state.reason} onChange={this.handleTextChange}></input>
            </fieldset>
            <div className='button-center'>
              <br/>
              <Button bsStyle="success" size="small" onClick={this.onClick}>Submit</Button>
            </div>
          </Modal>
        </div>
      )
    }
    else{
      return (
        <div>
          <Button bsStyle="success" size="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
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
export default Add;