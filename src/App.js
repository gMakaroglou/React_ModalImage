import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ImageUpload from './ImageUpload'
import Table from './mattable'
import HelloMessage from './HelloMessage'
import TestTable from './testtable'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FirebaseConfig from './firebaseconfig'
import Firebase from "firebase"
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import orderBy from 'lodash.orderby'
import './FlexBox.css'
import FilteringComp from './FIlteringomponent'

class App extends Component {
  constructor(props) {
    super(props);
    if (!Firebase.apps.length) {
     const firebaseApp = Firebase.initializeApp(FirebaseConfig);
    }
  this.state = {
    data: [
      {
        firstName:'sdadsad',
        lastName:"dslad",
        username:"ds;ad;ad",
        email:"123",
        User:"dada@hotmail.com",
        id:"-LtuNcdzTiWv3WPOrRFK"
      },
      {
        firstName:'sdadsad',
        lastName:"dslad",
        username:"ds;ad;ad",
        email:"123",
        User:"dada@hotmail.com",
        id:"-Lu1zEOHrZ8oEGuChq0m"
      },
      {
        firstName:'sdadsad',
        lastName:"dslad",
        username:"ds;ad;ad",
        email:"123",
        User:"dada@hotmail.com",
        id:"-Lu2-23iGiB56pToEWES"
      },
      {
        firstName:'sdadsad',
        lastName:"dslad",
        username:"ds;ad;ad",
        email:"123",
        User:"dada@hotmail.com",
        id:"-Lu2-23iGiB56pToEWES"
      },
      {
        firstName:'sdadsad',
        lastName:"dslad",
        username:"ds;ad;ad",
        email:"123",
        User:"dada@hotmail.com",
        id:"-Lu214VrqKkRCRCT1hpg"
      }
      
    ],
    SensorValues:[],
    FirebaseData:[],
    query1:'',
    query2:'',
    queries:[],
    columnToQuery1:'',
    columnToQuery2:'',
    columnToQuery3:'',
    columnsToQuery:[],
    numberoffilters:2,
    showquery3:false,
    showquery4:false,
    showquery5:false,
  };}
  testfunction = event => {
    alert(event.target.value);
  };
  componentDidMount() {
    this.getUserData();
    
  }
  componentDidUpdate(){
    console.log(this.state.showquery3)

    console.log("dsakdskadsk")
  }
  divstyle = () => {
    marginTop  : ' 10px'
  }
  getUserData = () => {
    let ref = Firebase.database().ref("/SensorValues/");
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState({FirebaseData : state});


    });
  };
 ChangeFilterStatus = (e) => {
  let currentqueries = {...this.state.queries}
  let queryname = e.target.name
  currentqueries[e.target.name] = e.target.value
  console.log("Current Queries" + currentqueries)
  console.log("e target name"+e.target.name)
  this.setState({ queries: currentqueries ,[queryname]:e.target.value})
 }
 ChangeFilterColumnStatus = (event,index,value) =>
 { 

    let currentcolumns = {...this.state.columnsToQuery}
    console.log()
    currentcolumns[("columnToQuery3")] = value
    this.setState({ columnsToQuery: currentcolumns ,columnToQuery3:value})
  //   this.setState({columnToQuery1 : value,
  // columnsToQuery : [...this.state.columnsToQuery,value]})
}
hideFilter = (queryToHide) => {
let query = "showquery"+queryToHide;
this.setState((state) => (  // this is the current state
  { 
    numberoffilters: (state.numberoffilters)-1, // this will be the previous randomNumber
    [query]:false
   
 }));
 console.log(this.state.numberoffilters);
}
showFilter = ()=>{
  
  this.setState((state) => (  // this is the current state
    { 
      numberoffilters: (state.numberoffilters)+1, // this will be the previous randomNumber
      showquery3: (this.state.numberoffilters+1)>=3 ? true : false,
      showquery4: (this.state.numberoffilters+1)>=4 ? true : false,
      showquery5: (this.state.numberoffilters+1)>=5 ? true : false
   }));
   console.log(this.state.numberoffilters);
   console.log(this.state.showquery3)
}
  render() {
    // console.log(this.state.data);
    // console.log(this.state.FirebaseData);
    // var testarray=[];
    // Object.keys(this.state.FirebaseData).map((element)=>{
    //   testarray.push(this.state.FirebaseData[element]);
    // })
    // console.log(this.state.data);
    // console.log(testarray);
    var newresult=[];
    var SensorValues = this.state.FirebaseData;
    console.log(this.state);
    Object.keys(SensorValues).map((x)=>{
      // console.log(x),
     // console.log(data),
        let test=SensorValues[x]
Object.keys(test).map((y)=>{
  test[y].imageid=y;
  newresult.push(test[y]);
})
      
      
  })
  console.log(newresult);
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <HelloMessage /> */}
        <MuiThemeProvider>
          <div className="flex-container">
            <div>
        <TextField style={{marginTop: '12%'  }}
        value={this.state.query1}
        name="query1"
        onChange={e=>{
           let currentqueries = {...this.state.queries}
           currentqueries[e.target.name] = e.target.value
           console.log("Current Queries" + currentqueries)
           this.setState({ queries: currentqueries ,query1:e.target.value}
          //this.setState({ queries: [...this.state.queries,e.target.value] ,query1:e.target.value}
        )}}
      hintText="Search Value"
    /></div>
    <div >
        <SelectField 
          floatingLabelText="Search By"
          value={this.state.columnToQuery1}
          id="columnToQuery1"
          onChange={(event,index,value) =>
            { 
              let currentcolumns = {...this.state.columnsToQuery}
              console.log()
              currentcolumns[("columnToQuery1")] = value
              this.setState({ columnsToQuery: currentcolumns ,columnToQuery1:value})
            //   this.setState({columnToQuery1 : value,
            // columnsToQuery : [...this.state.columnsToQuery,value]})
          }}
        >
          <MenuItem value={'ambTempValue'} primaryText="Ambient Temperature" />
          <MenuItem value={'latitudeValue'} primaryText="Latitude" />
          <MenuItem value={'lightValue'} primaryText="lightValue" />
          <MenuItem value={'longitudeValue'} primaryText="Longitude" />
          <MenuItem value={'pressureValue'} primaryText="Pressure" />
        </SelectField>
        </div>
        </div>
        <div className="flex-container">
            <div>
        <TextField style={{marginTop: '12%'  }}
        value={this.state.query2}
        name="query2"
        onChange={e=>{
          let currentqueries = {...this.state.queries}
          currentqueries[e.target.name] = e.target.value
          console.log("Current Queries" + currentqueries)
          this.setState({ queries: currentqueries ,query2:e.target.value}
         //this.setState({ queries: [...this.state.queries,e.target.value] ,query1:e.target.value}
       )}}
      hintText="Search Value"
    /></div>
    <div>
        <SelectField
          floatingLabelText="Search By"
          value={this.state.columnToQuery2}
          onChange={(event,index,value) =>
            { 
              let currentcolumns = {...this.state.columnsToQuery}
              console.log()
              currentcolumns[("columnToQuery2")] = value
              this.setState({ columnsToQuery: currentcolumns ,columnToQuery2:value})
            //   this.setState({columnToQuery1 : value,
            // columnsToQuery : [...this.state.columnsToQuery,value]})
          }}
        >
          <MenuItem value={'ambTempValue'} primaryText="Ambient Temperature" />
          <MenuItem value={'latitudeValue'} primaryText="Latitude" />
          <MenuItem value={'lightValue'} primaryText="lightValue" />
          <MenuItem value={'longitudeValue'} primaryText="Longitude" />
          <MenuItem value={'pressureValue'} primaryText="Pressure" />
        </SelectField>
        </div>

        
        </div>
       {this.state.showquery3 ? <FilteringComp hideFilter={this.hideFilter} changeColumn = {this.ChangeFilterColumnStatus} onchange={this.ChangeFilterStatus} FilterNumber="3" columnvalue ={this.state.columnToQuery3 || ''} queryvalue={this.state.query3 || ''}></FilteringComp> : <span></span>}
        {this.state.showquery4 ? <FilteringComp hideFilter={this.hideFilter} changeColumn = {this.ChangeFilterColumnStatus} onchange={this.ChangeFilterStatus} FilterNumber="4"></FilteringComp> : <span></span>}
        {this.state.showquery5 ?<FilteringComp hideFilter={this.hideFilter} changeColumn = {this.ChangeFilterColumnStatus} onchange={this.ChangeFilterStatus} FilterNumber="5"></FilteringComp> : <span></span>}
        <Fab color="primary" aria-label="add">
  <AddIcon onClick={this.showFilter}/>
</Fab>
<Fab color="secondary" aria-label="edit">
<DeleteIcon/>
</Fab>
        <Table
            data={//newresult
              orderBy(
                this.state.query1
                  ? newresult.filter(x =>
                    {
                      let i =0;

                      let columnslength = (Object.keys(this.state.columnsToQuery).length)
                      console.log("COlumns "+columnslength)
                      for(i=1;i<=columnslength;i++)
                    {
                      console.log("If Column of " +x+ " "+x[this.state.columnsToQuery[("columnToQuery"+i)]])
                      console.log("has "+this.state.queries[("query"+i)])
                      console.log(x[this.state.columnsToQuery[("columnToQuery"+i)]].includes(this.state.queries[("query"+i)]))
                      if(x[this.state.columnsToQuery[("columnToQuery"+i)]].includes(this.state.queries[("query"+i)]))
                      {
                        return x[this.state.columnsToQuery[("columnToQuery"+i)]].includes(this.state.queries[("query"+i)])
                        
                      }
                    }}
                    )
                  : 
           newresult
             )}
            header={[
              // {
              //   name: "User",
              //   prop: "User"
              // },
              // {
              //   name: "First name",
              //   prop: "firstName"
              // },
              // {
              //   name: "Last name",
              //   prop: "lastName"
              // },
              // {
              //   name: "Username",
              //   prop: "username"
              // },
              // {
              //   name: "Email",
              //   prop: "email"
              // }
              {
                name: "User",
                prop: "user"
              },
              {
                name: "ambTempValue",
                prop: "ambTempValue"
              },
              {
                name: "latitudeValue",
                prop: "latitudeValue"
              },
              {
                name: "lightValue",
                prop: "lightValue"
              },
              {
                name: "longitudeValue",
                prop: "longitudeValue"
              },
              {
                name: "pressureValue",
                prop: "pressureValue"
              }

            ]}
          />
          <TestTable onCellClick={event => this.testfunction(event)}/>
      </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
