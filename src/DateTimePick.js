import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Example from './Example'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Container, Row, Col } from 'reactstrap';

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = date => {
    setSelectedDate(date);
  };

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
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /></Col>
        <Col><KeyboardTimePicker
        style={{marginLeft:'10px'}}
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
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
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /></Col>
        <Col><KeyboardTimePicker
        style={{marginLeft:'10px'}}
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        /></Col>

      </Row>
      </Container>
    </MuiPickersUtilsProvider>
 
  );
}