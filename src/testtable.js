import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import TRow from "./tablerow"
import TT from './TableGet'
import TTTable from './TableGet';
import Modal from './modalexample';

/**
 * A simple table demonstrating the hierarchy of the `Table` component and its sub-components.
 */
class MatTable extends React.Component{
 handleclick = () => {
    console.log("howdy");
}
 onRowSelection = event => {
    alert(event.target.value);

  };
   myfunction = () => {
    console.log("FML");
  }
      
  render() {
    return (
    <TTTable handleRemove={this.myfunction}>
        {/* <TableHeader>
               <TableRow>
                 <TableHeaderColumn>ID</TableHeaderColumn>
                 <TableHeaderColumn>Name</TableHeaderColumn>
                 <TableHeaderColumn>Status</TableHeaderColumn>
               </TableRow>
             </TableHeader>
             <TableBody>
        <TRow/>
        </TableBody> */}
    </TTTable>
    //   <Table>
    //         <TableHeader>
    //           <TableRow>
    //             <TableHeaderColumn>ID</TableHeaderColumn>
    //             <TableHeaderColumn>Name</TableHeaderColumn>
    //             <TableHeaderColumn>Status</TableHeaderColumn>
    //           </TableRow>
    //         </TableHeader>
    //         <TableBody>
    //           <TableRow  onClick={()=> {alert('Click event on row')}}> 
    //             <TableRowColumn >1</TableRowColumn>
    //             <TableRowColumn>John Smith</TableRowColumn>
    //             <TableRowColumn>Employed</TableRowColumn>
    //           </TableRow>
    //           <TableRow >
    //             <TableRowColumn>2</TableRowColumn>
    //             <TableRowColumn>Randal White</TableRowColumn>
    //             <TableRowColumn>Unemployed</TableRowColumn>
    //           </TableRow>
    //           <TableRow>
    //             <TableRowColumn>3</TableRowColumn>
    //             <TableRowColumn>Stephanie Sanders</TableRowColumn>
    //             <TableRowColumn >Employed</TableRowColumn>
    //           </TableRow>
    //           <TableRow>
    //             <TableRowColumn>4</TableRowColumn>
    //             <TableRowColumn>Steve Brown</TableRowColumn>
    //             <TableRowColumn>Employed</TableRowColumn>
    //           </TableRow>
    //         </TableBody>
    //       </Table>
);
}}

export default MatTable;