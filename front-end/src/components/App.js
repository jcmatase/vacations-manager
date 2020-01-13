import React from 'react';
import axios from 'axios';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
import { Tab, Tabs, Table } from 'react-bootstrap';
import YearTabsRouter from './tabs/yearTabsRouter';
import MonthTabs from './tabs/monthTabs';
import styles from '../css/App.css';

const GOOGLE_CLIENT_ID = "580137607617-00qj4evfoh62jiokg6lcu32gpfco93r6.apps.googleusercontent.com";

export default class App extends React.Component {
constructor() {
  super();
  this.state = {
    selectedMonth:'All',
    selectedYear: this.getCurrentYear(),
    data: [],
    activeTab: this.getCurrentYear(),
    isSignedIn: false,
    userProfile: {}
  };
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
    this.getData(this, this.getCurrentYear(), 'All');
  }
}

getCurrentYear() {
  var currentDate = new Date();
  return currentDate.getYear() + 1900;
}

onSuccess() {
  this.setState({
    isSignedIn: true,
    err: null
  })
}

onLoginFailed(err) {
  this.setState({
    isSignedIn: false,
    error: err,
  })
}

getContent() {
  if (this.state.isSignedIn) {
    return (
      <div>
        <div id="User Info">
          <h2>Welcome {this.state.userProfile.ig}</h2>
          <h5>Available days: </h5>
        </div>
        <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
          <Tab eventKey={2019} title={<YearTabsRouter year='2019'/>}><MonthTabs year='2019' monthlyActiveTab={this.state.selectedMonth}/></Tab>
          <Tab eventKey={2020} title={<YearTabsRouter year='2020'/>}><MonthTabs year='2020' monthlyActiveTab={this.state.selectedMonth}/></Tab>
        </Tabs>
        <Add selectedMonth={this.state.selectedMonth} selectedYear={this.state.selectedYear} />
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
            <th className='button-col'></th>
              <th className='button-col'>Status</th>
              <th className='button-col'>Created on</th>
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
  } else {
    return (
      <div>
        <p className="loginText">You are not signed in. Click here to sign in.</p>
        <button className="loginButton" id="loginButton">Login with Google</button>
      </div>
    )
  } 
}

componentDidMount() {
  const successCallback = this.onSuccess.bind(this);
    
  window.gapi.load('auth2', () => {
    this.auth2 = window.gapi.auth2.init({
      client_id: GOOGLE_CLIENT_ID
    })

    this.auth2.then((response) => {
      this.setState({
        isSignedIn: this.auth2.isSignedIn.get(),
        userProfile: response.currentUser.Ab.w3
      });
    });
  });    

  window.gapi.load('signin2', function() {
    // Method 3: render a sign in button
    // using this method will show Signed In if the user is already signed in
    var opts = {
      width: 200,
      height: 50,
      client_id: GOOGLE_CLIENT_ID,
      onsuccess: successCallback
    }
    window.gapi.signin2.render('loginButton', opts)
  })

  this.getData(this, this.getCurrentYear(), 'All');
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
    return Math.round(Difference_In_Days + 1);
  }
  else {
    return "-";
  }
}

render() {
  return (      
    <div className="App">
      {this.getContent()}
    </div>
  );
}

}
