import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import './FlexBox.css'
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

class FilteringComp extends Component{
    state = { columnToQuery:'',
    query:'' }
    hiderfilter = () =>{
        this.props.showFilter=false;
        
    }
    render(){
        return(
            <div className="flex-container">
                
            <div>
           
        <TextField style={{marginTop: '12%'  }}
        value={this.props.queryvalue}
        name={"query"+this.props.FilterNumber}
        onChange={e=>{
        //   let currentqueries = {...this.props.queries}
        //   currentqueries[e.target.name] = e.target.value
        //   console.log("Current Queries" + currentqueries)
        //   this.setState({ queries: currentqueries ,query2:e.target.value}
         //this.setState({ queries: [...this.state.queries,e.target.value] ,query1:e.target.value}
         this.props.onchange(e);
       }}
      hintText="Search Value"
    /></div>
    <SelectField style={{width:'256px'}}
          floatingLabelText="Search By"
          value={this.props.columnvalue}
          onChange={(event,index,value) =>
            { 
            //   let currentcolumns = {...this.props.columnsToQuery}
            //   console.log()
            //   currentcolumns[("columnToQuery3")] = value
            //   this.setState({ columnsToQuery: currentcolumns ,columnToQuery3:value})
            console.log("THIIIIIIS PROPPPPPS FILTERNUMBER"+this.props.FilterNumber)
            this.props.changeColumn(event,index,value,this.props.FilterNumber);
            //   this.setState({columnToQuery1 : value,
            // columnsToQuery : [...this.state.columnsToQuery,value]})
          }}
        >
          <MenuItem value={'ambTempValue'} primaryText="Ambient Temperature" />
          <MenuItem value={'latitudeValue'} primaryText="Latitude" />
          <MenuItem value={'lightValue'} primaryText="lightValue" />
          <MenuItem value={'longitudeValue'} primaryText="Longitude" />
          <MenuItem value={'pressureValue'} primaryText="Pressure" />
          <MenuItem value={'tags'} primaryText="Tags" />
        </SelectField>
        <Fab color="secondary" size="small" aria-label="edit" style={{marginTop: '3%'}}>
<DeleteIcon onClick={()=>this.props.hideFilter(this.props.FilterNumber)}/>
</Fab>
    </div> 
        )
    }
}

export default FilteringComp;