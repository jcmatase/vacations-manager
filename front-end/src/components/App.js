import React from 'react';
import axios from 'axios';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
import { Tab, Tabs, Table } from 'react-bootstrap';
import YearTabsRouter from './tabs/yearTabsRouter';
import MonthTabs from './tabs/monthTabs';
import styles from '../css/App.css';

export default class App extends React.Component {
constructor() {
  super();
  this.state = {selectedMonth:'All', selectedYear: 2018, data: [], activeTab:2018};
  this.getData = this.getData.bind(this);
}

componentWillReceiveProps(nextProps) {
  if(nextProps.history.location.search){
    var search = nextProps.history.location.search;
    search = search.substring(1);
    var searchObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    this.setState({activeTab: parseInt(searchObj.year)});
    this.setState({selectedYear: searchObj.year});
    this.setState({selectedMonth: searchObj.month});
    this.getData(this, searchObj.year, searchObj.month);
  }
  else{
    this.getData(this, 2018, 'All');
  }
}

componentDidMount() {
  this.getData(this, 2018, 'All');
}

handleSelect(selectedTab) {
  /*
  this.setState({
    activeTab: selectedTab,
    selectedYear: selectedTab
  });
  */
}

getData(ev, year, month) {
  axios.get('http://localhost:8080/vacations/'+year+'/'+month)
    .then(function(response) {
      ev.setState({data: response.data});
      ev.setState({selectedYear: parseInt(year)});
      ev.setState({selectedMonth: month});
    });
}

getVacationStatus(status) {
  if ( status === 0 ) {
    return {"msj": "Pending", style: {'color': 'orange'} };
  }
  if ( status === 1 ) {
    return {"msj": "Approved", style: {'color': 'green'} };
  }
  if ( status === 2 ) {
    return {"msj": "In Review", style: {'color': 'orange'} };
  }
  if ( status === 3 ) {
    return {"msj": "Denied", style: {'color': 'red'} };
  }
  else {
    return {"msj": "", style: {} };
  }  
}

displayReadableDate(pDate) {
  if (pDate) {
    var dateArray = pDate.split('T');
    if (dateArray.length === 2) {
      return dateArray[0];
    }
  }
  else{
    return "";
  }
}

calculateRequestedDays(pStartDate, pEndDate) {
  if (pStartDate && pEndDate) {
    const startDateObj = new Date(pStartDate);
    const endDateObj = new Date(pEndDate);
    // To calculate the time difference of two dates 
    var Difference_In_Time = endDateObj.getTime() - startDateObj.getTime(); 
    // To calculate the no. of days between two dates 
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days + 1;
  }
  else {
    return "-";
  }
}

render() {
    return (
      <div>
        <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
          <Tab eventKey={2018} title={<YearTabsRouter year='2018'/>}><MonthTabs year='2018' monthlyActiveTab={this.state.selectedMonth}/></Tab>
          <Tab eventKey={2019} title={<YearTabsRouter year='2019'/>}><MonthTabs year='2019' monthlyActiveTab={this.state.selectedMonth}/></Tab>
          <Tab eventKey={2020} title={<YearTabsRouter year='2020'/>}><MonthTabs year='2020' monthlyActiveTab={this.state.selectedMonth}/></Tab>
        </Tabs>
        <Add selectedMonth={this.state.selectedMonth} selectedYear={this.state.selectedYear} />
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
            <th className='button-col'></th>
              <th className='button-col'>Status</th>
              <th className='button-col'>Create Date</th>
              <th className='button-col'>Start Date</th>
              <th className='button-col'>End Date</th>
              <th className='button-col'>Requested days</th>
              <th className='desc-col'>Reason</th>
              <th className='button-col'>Update</th>
              <th className='button-col'>Delete</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.data.map((vacation) => {
                return  <tr key={vacation.id}>
                          <td className='counterCell'></td>
                          <td className='button-col' style={this.getVacationStatus(vacation.status).style}>{this.getVacationStatus(vacation.status).msj}</td>
                          <td className='button-col'>{vacation.createDate}</td>
                          <td className='button-col'>{this.displayReadableDate(vacation.startDate)}</td>
                          <td className='button-col'>{this.displayReadableDate(vacation.endDate)}</td>
                          <td className='button-col'>{this.calculateRequestedDays(vacation.startDate, vacation.endDate)}</td>
                          <td className='desc-col'>{vacation.reason}</td>
                          <td className='button-col'><Update vacation={vacation}/></td>
                          <td className='button-col'><Delete vacation={vacation}/></td>
                        </tr>
              })
            }
          </tbody>
        </Table>
      </div>
    );
  }
}
