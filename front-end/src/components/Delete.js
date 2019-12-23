import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Delete extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '', 
      month: '', 
      year: '',
      messageFromServer: '',
      modalIsOpen: false
    };
    this.onClick = this.onClick.bind(this);
    this.delete = this.delete.bind(this);
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
      messageFromServer: ''
    });
  }  
  
  componentDidMount() {
    this.setState({
      id: this.props.vacation.id,
      month: this.props.vacation.month,
      year: this.props.vacation.year
    })
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({
      id: nextProps.vacation.id,
      month:nextProps.vacation.month,
      year:nextProps.vacation.year
    })
  }

  onClick(e){
    this.delete(this);
    this.openModal();
  }

  delete(e){
    axios.delete('http://localhost:8080/vacations',{
      params: { id: e.state.id }
    })
    .then(function(response) {
      console.log("Delete Response");
      console.dir(response);
      e.setState({
        messageFromServer: response.data
      });
    });
  }

  render(){
    if (this.state.modalIsOpen) {
      return (
        <div>
          <Button bsStyle="success" size="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
          <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} contentLabel="Delete Vacation" className="Modal">
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
    else {
      return (
        <Button bsStyle="danger" size="small" onClick={this.onClick}>
          <Link to={{pathname: '/', search: '?month='+this.state.month+'&year='+this.state.year}} style={{ textDecoration: 'none' }}>
            <span className="glyphicon glyphicon-remove"></span>
          </Link>
        </Button>
      )
    }
  }
}
export default Delete;
