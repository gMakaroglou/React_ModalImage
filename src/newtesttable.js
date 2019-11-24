import React from "react";
import ReactDOM from "react-dom";

import {
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  withStyles
} from "@material-ui/core";

//import "./styles.css";

let id = 0;
function createData(instrument, price, volume, rsi) {
  id += 1;
  return { id, instrument, price, volume, rsi };
}

const rows = [
  createData("TSLA", 283.65, 8.6, 13.2, 22),
  createData("AMZN", 1638.78, 9.0, 23, 46),
  createData("APPL", 172.91, 16.0, 24, 37),
  createData("AMRN", 21.36, 3.7, 67, 73),
  createData("PLUG", 1.71, 16.0, 49, 32)
];
const styles = "";
class BasicTable extends React.Component {
  //
  onRowSelection = event => {
    alert(event.target.value);
  };

  render() {
    return (
      <Paper>
        <Table onClick={event => this.onRowSelection(event)}>
          <TableHead>
            <TableRow>
              <TableCell>Instrument</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Volume</TableCell>
              <TableCell align="right">RSI</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow selected={true} hover key={row.id}>
                <TableCell component="th" scope="row">
                  {row.instrument}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.volume}</TableCell>
                <TableCell align="right">{row.rsi}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

// BasicTable.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
export default withStyles(styles)(BasicTable);

const rootElement = document.getElementById("root");
ReactDOM.render(<BasicTable />, rootElement);
