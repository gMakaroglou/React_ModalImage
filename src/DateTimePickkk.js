import 'date-fns';
import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Example from './Example'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Container, Row, Col } from 'reactstrap';

class MaterialUIPickers extends Component{
  // The first commit of Material-UI
//   const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

//   const handleDateChange = date => {
//     setSelectedDate(date);
//   };
state = { 
  dateFrom :'',
  timeFrom: '2014-08-18T21:11:54',
  dateTo :'',
  timeTo: '2014-08-18T21:11:56'
 }
//  handleDateChangeFrom = date => {
//   this.setState((state)=>(
//     {
//     timeFrom: date
//   })) 
//  }
 handleDateChangeTo = date => {
  this.setState((state)=>(
    {
    timeTo: date
  })) 
 }
render(){
  return (
    
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        {/* <KeyboardDatePicker
         style={{marginLeft:'1%'}}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /> */}
        {/* <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /> */}
        {/* <KeyboardTimePicker
        style={{marginLeft:'10px'}}
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        /> */}
      
       
      </Grid>
      <Container style={{marginLeft:'1px'}}>
        <Row style={{marginLeft:'2px'}}>From :</Row>
      <Row xs="4" style={{marginLeft:'1px'}}>
        <Col style={{marginLeft:'10px'}}><KeyboardDatePicker
         style={{marginLeft:'1%'}}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date From"
          value={this.props.datevalue}
          onChange={(e,date)=>{

             this.props.onchange(date);
           }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /></Col>
        <Col><KeyboardTimePicker
        style={{marginLeft:'10px'}}
          margin="normal"
          id="time-picker"
          label="Time From"
          value={this.props.timevalue}
          onChange={(e,date)=>{
            console.log(e);
            console.log(date)
            this.props.onTimeChange(e);
          }}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        /></Col>
         </Row>
        
{/* 
     
      <Row style={{marginLeft:'2px'}}>To :</Row>
      <Row xs="4" style={{marginLeft:'1px'}}>
        <Col style={{marginLeft:'10px'}}><KeyboardDatePicker
         style={{marginLeft:'1%'}}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /></Col>
        */}
        <Row style={{marginLeft:'2px'}}>To:</Row>
      <Row xs="4" style={{marginLeft:'1px'}}>
        <Col style={{marginLeft:'10px'}}><KeyboardDatePicker
         style={{marginLeft:'1%'}}
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date To"
          value={this.props.datevalueTo}
          onChange={(e,date)=>{
            console.log(e);
            console.log(date)
             this.props.onchangeTo(date);
           }}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /></Col>
        <Col><KeyboardTimePicker
        style={{marginLeft:'10px'}}
          margin="normal"
          id="time-picker2"
          label="Time To"
          value={this.props.timeTo}
          onChange={(e,date)=>{
            console.log(e);
            console.log(date)
            this.props.onTimeChangeTo(e);
          }}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        /></Col>

      </Row> 
      </Container>
    </MuiPickersUtilsProvider>
 
  );
}}
export default MaterialUIPickers