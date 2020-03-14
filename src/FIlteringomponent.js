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

         this.props.onchange(e);
       }}
      hintText="Search Value"
    /></div>
    <SelectField style={{width:'256px'}}
          floatingLabelText="Search By"
          value={this.props.columnvalue}
          onChange={(event,index,value) =>
            { 

            console.log("THIIIIIIS PROPPPPPS FILTERNUMBER"+this.props.FilterNumber)
            this.props.changeColumn(event,index,value,this.props.FilterNumber);

          }}
        >
          <MenuItem value={'ambTempValue'} primaryText="Ambient Temperature" />
          <MenuItem value={'latitudeValue'} primaryText="Latitude" />
          <MenuItem value={'lightValue'} primaryText="lightValue" />
          <MenuItem value={'longitudeValue'} primaryText="Longitude" />
          <MenuItem value={'pressureValue'} primaryText="Pressure" />
          <MenuItem value={'tags'} primaryText="Tags" />
          <MenuItem value={'imageLabels'} primaryText="Image Tags" />
          <MenuItem value={'city'} primaryText="City" />
          <MenuItem value={'tempValue'} primaryText="Temperature" />
          <MenuItem value={'activity'} primaryText="Activity" />
        </SelectField>
       {/* { this.props.name.includes("Confidence") ?<div>
           
        <TextField style={{marginTop: '12%'  }}
        value={this.props.confidencevalue}
        name={"query"+this.props.confidenceNumber}
        onChange={e=>{

         this.props.onchange(e);
       }}
      hintText="Search Confidence"
    /></div> : null} */}
        <Fab color="secondary" size="small" aria-label="edit" style={{marginTop: '2%'}}>
<DeleteIcon onClick={()=>this.props.hideFilter(this.props.FilterNumber)}/>
</Fab>
    </div> 
        )
    }
}

export default FilteringComp;