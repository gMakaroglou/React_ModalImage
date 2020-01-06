import 'date-fns';
import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Example from './Example'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Container, Row, Col } from 'reactstrap';

const Profile = props => {
  // The first commit of Material-UI
  const [date1, setSelectedDate1] = useState(new Date(props));
  const [selectedDate2, setSelectedDate2] = useState(new Date(props));
  const [selectedDate3, setSelectedDate3] = useState(new Date(props));
  const [selectedDate4, setSelectedDate4] = useState(new Date('2014-08-18T21:11:57'));

  const handleDateChange1 = date => {
    setSelectedDate1(date);
  };
  const handleDateChange2 = date => {
    setSelectedDate2(date);
  };
  const handleDateChange3 = date => {
    setSelectedDate3(date);
  };
  const handleDateChange4 = date => {
    setSelectedDate4(date);
  };
  useEffect(() => {
    setSelectedDate1(props);
    setSelectedDate2(props);
    setSelectedDate3(props);
    setSelectedDate4(props);
  }, [props]);

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
          label="Date picker inline"
          value={date1}
          onChange={handleDateChange1}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /></Col>
        <Col><KeyboardTimePicker
        style={{marginLeft:'10px'}}
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate2}
          onChange={handleDateChange2}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        /></Col>

      </Row>
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
          value={selectedDate3}
          onChange={handleDateChange3}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /></Col>
        <Col><KeyboardTimePicker
        style={{marginLeft:'10px'}}
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate4}
          onChange={handleDateChange4}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        /></Col>

      </Row>
      </Container>
    </MuiPickersUtilsProvider>
 
  );
} 
export default Profile