import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import VisIcon from "material-ui/svg-icons/action/visibility";
import Himodal from "./ImageModal"

class TestTable extends React.Component {
    render() {
        const row = (x, i, header) =>
  <TableRow key={`tr-${i}`} selected={this.props.selectedRows.includes(i) ? true:false} >
  <TableRowColumn key={""} style={{
                      whiteSpace: "normal",
                      wordWrap: "break-word"
                    }}>
     <Himodal user={x["user"]} image={x["imageId"]}/>
     {console.log("Image "+x["imageId"])}
      </TableRowColumn>
    {header.map((y, k) =>
    
      <TableRowColumn key={`trc-${k}`} style={{wordWrap: 'break-word', whiteSpace: 'normal'}} >
        {x[y.prop]}
      </TableRowColumn>
    )}
    
  </TableRow>;

  return(
    <Table
    multiSelectable={true}
    onRowSelection={selectionRows=>{
        console.log("onRowSelection" + selectionRows,this.props.updateRows(selectionRows))
    }} >
    <TableHeader >
      <TableRow>
      <TableHeaderColumn key={""}>View</TableHeaderColumn>
        {this.props.header.map((x, i) =>
          <TableHeaderColumn key={`thc-${i}`}>
            {x.name}
          </TableHeaderColumn>
        )}
      </TableRow>
    </TableHeader>
    <TableBody deselectOnClickaway={false}>
      
      {this.props.data.map((x, i) => row(x, i, this.props.header))}
    </TableBody>
  </Table>
  )
    }
}
export default TestTable