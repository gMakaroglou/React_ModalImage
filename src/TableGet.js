import React from "react";
import ReactDOM from "react-dom";
import TrashIcon from "material-ui/svg-icons/action/delete";
import VisIcon from "material-ui/svg-icons/action/visibility";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
  import TRow from './tablerow'
class TTTable extends React.Component {
  constructor() {
    super();

    this.state = {
      rowstate: {},
    }
  }
    render() {
        return (<Table><TableHeader>
          <TableRow>
            <TableHeaderColumn>ID</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Status</TableHeaderColumn>
          </TableRow>
        </TableHeader><TableBody >
          <TableRow id="inco2">
          <TableRowColumn>text here</TableRowColumn>
          <TableRowColumn>
        <TrashIcon onClick={() => console.log(this.id)} />
        <VisIcon />
      </TableRowColumn>
          <TableRowColumn>texxt here</TableRowColumn></TableRow>
          <TRow handleRemove={this.props.handleRemove()}></TRow></TableBody></Table>)
    }
 }

 export default TTTable;