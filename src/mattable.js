// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableHeader,
//   TableHeaderColumn,
//   TableRow,
//   TableRowColumn
// } from "material-ui/Table";
// // import VisIcon from "material-ui/svg-icons/action/visibility";
// import Himodal from "./ImageModal"
// const row = (x, i, header) =>
//   <TableRow key={`tr-${i}`} >
//   <TableRowColumn key={""} >
//      <Himodal user={x["user"]} image={x["imageId"]}/>
//      {console.log("Image "+x["imageId"])}
//       </TableRowColumn>
//     {header.map((y, k) =>
    
//       <TableRowColumn key={`trc-${k}`} >
//         {x[y.prop]}
//       </TableRowColumn>
//     )}
    
//   </TableRow>;

// export default ({ data, header }) => {
// return(
//   <Table >
//     <TableHeader>
//       <TableRow>
//       <TableHeaderColumn key={""}>View</TableHeaderColumn>
//         {header.map((x, i) =>
//           <TableHeaderColumn key={`thc-${i}`}>
//             {x.name}
//           </TableHeaderColumn>
//         )}
//       </TableRow>
//     </TableHeader>
//     <TableBody>
      
//       {data.map((x, i) => row(x, i, header))}
//     </TableBody>
//   </Table>)}