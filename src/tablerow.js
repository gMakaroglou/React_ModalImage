import React from "react";
import ReactDOM from "react-dom";
import VisIcon from "material-ui/svg-icons/action/visibility";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';

class Row extends React.Component {
    render() {
        return (<TableRow onClick={()=> {alert('Click event on row')}} >
            <TableRowColumn><VisIcon onClick={() => this.props.handleRemove()}></VisIcon></TableRowColumn>
        <TableRowColumn>text here</TableRowColumn>
        <TableRowColumn>text here</TableRowColumn>
        <TableRowColumn>text here</TableRowColumn></TableRow>)
        // return (<TableRow onClick={()=> {alert('Click event on row')}}>
        //     <TableRowColumn>4</TableRowColumn>
        //     <TableRowColumn>Steve Brown</TableRowColumn>
        //     <TableRowColumn>Employed</TableRowColumn>
        //   </TableRow>)
        // return (
        //     <Table>
        //     <TableHeader>
        //       <TableRow>
        //         <TableHeaderColumn>ID</TableHeaderColumn>
        //         <TableHeaderColumn>Name</TableHeaderColumn>
        //         <TableHeaderColumn>Status</TableHeaderColumn>
        //       </TableRow>
        //     </TableHeader>
        //     <TableBody>
        //       <TableRow  onClick={()=> {alert('Click event on row')}}> 
        //         <TableRowColumn >1</TableRowColumn>
        //         <TableRowColumn>John Smith</TableRowColumn>
        //         <TableRowColumn>Employed</TableRowColumn>
        //       </TableRow>
        //       <TableRow >
        //         <TableRowColumn>2</TableRowColumn>
        //         <TableRowColumn>Randal White</TableRowColumn>
        //         <TableRowColumn>Unemployed</TableRowColumn>
        //       </TableRow>
        //       <TableRow>
        //         <TableRowColumn>3</TableRowColumn>
        //         <TableRowColumn>Stephanie Sanders</TableRowColumn>
        //         <TableRowColumn >Employed</TableRowColumn>
        //       </TableRow>
        //       <TableRow>
        //         <TableRowColumn>4</TableRowColumn>
        //         <TableRowColumn>Steve Brown</TableRowColumn>
        //         <TableRowColumn>Employed</TableRowColumn>
        //       </TableRow>
        //     </TableBody>
        //   </Table>
        // )
    }
}
export default Row;