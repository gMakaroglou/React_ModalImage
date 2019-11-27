import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ImageUpload from './ImageUpload'
import Table from './mattable'
import ImageModal from './ImageModal'
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
import { Divider, Form, Label } from 'semantic-ui-react'
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
    query3:'',
    query4:'',
    query5:'',
    query6:'',
    queries:[],
    columnToQuery1:'',
    columnToQuery2:'',
    columnToQuery3:'',
    columnToQuery4:'',
    columnToQuery5:'',
    columnToQuery6:'',
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

  }
  divstyle = () => {
    marginTop  : ' 10px'
  }
  getUserData = () => {
    let ref = Firebase.database().ref("/SensorFoo/");
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
 ChangeFilterColumnStatus = (event,index,value,FilterNumber) =>
 { 

    let currentcolumns = {...this.state.columnsToQuery}
    let Columntoquery = "columnToQuery"+FilterNumber;
    currentcolumns["columnToQuery"+FilterNumber] = value
    this.setState({ columnsToQuery: currentcolumns ,[Columntoquery]:value})
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
//     Object.keys(SensorValues).map((x)=>{
//       // console.log(x),
//      // console.log(data),
//         let test=SensorValues[x]
// Object.keys(test).map((y)=>{
//   test[y].imageid=y;
//   newresult.push(test[y]);
// })
// })
Object.keys(SensorValues).map((x)=>{
  let test=SensorValues[x];
  Object.keys(test).map((y)=>{
    let test2=test[y];
   // for(let i =0;i<Object.keys(test2).length;i++)newresult.push(test2[i]);
    Object.keys(test2).map((z)=>{
      newresult.push(test2[z]);
    })
  })
})
if(newresult[0]!=undefined || newresult[0]!=null || newresult[1]!=undefined || newresult[1]!=null){
console.log(newresult);
console.log(newresult[0])
let newresultt = Object.assign(newresult[0],newresult[1]); 
console.log(newresultt); }
      
      

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
          <div>
        <Fab color="primary" aria-label="add"  style={{marginLeft:'-85%'}}>
        <AddIcon onClick={this.showFilter} />
        
      </Fab>
      </div>
      <Label style={{marginLeft:'-85%'}}>Add more Filters</Label>
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
          <MenuItem value={'tags'} primaryText="Tags" />
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
          <MenuItem value={'tags'} primaryText="Tags" />
        </SelectField>
        </div>

        
        </div>
       {this.state.showquery3 ? <FilteringComp hideFilter={this.hideFilter} changeColumn = {this.ChangeFilterColumnStatus} onchange={this.ChangeFilterStatus} FilterNumber="3" columnvalue ={this.state.columnToQuery3 || ''} queryvalue={this.state.query3 || ''}></FilteringComp> : <span></span>}
        {this.state.showquery4 ? <FilteringComp hideFilter={this.hideFilter} changeColumn = {this.ChangeFilterColumnStatus} onchange={this.ChangeFilterStatus} FilterNumber="4" columnvalue ={this.state.columnToQuery4 || ''} queryvalue={this.state.query4 || ''}></FilteringComp> : <span></span>}
        {this.state.showquery5 ?<FilteringComp hideFilter={this.hideFilter} changeColumn = {this.ChangeFilterColumnStatus} onchange={this.ChangeFilterStatus} FilterNumber="5" columnvalue ={this.state.columnToQuery5 || ''} queryvalue={this.state.query5 || ''}></FilteringComp> : <span></span>}
       

        <Table
            data={//newresult
              orderBy(
                (this.state.query1 || this.state.query2 || this.state.query3 || this.state.query4 || this.state.query5)
                  ? newresult.filter(x =>
                    {
                      let m=0;
                      let j=0;
                      let columnslength = (Object.keys(this.state.columnsToQuery).length)
                      console.log("COlumns "+columnslength)
                      //Check if Column and Query are Defined
                 if(this.state.columnToQuery1!=undefined && this.state.columnToQuery1 !="" && this.state.query1!=undefined && this.state.query1 !=""){
                   //Check if include
                   if(this.state.columnsToQuery[("columnToQuery"+1)]=="tags")
                   {
                     let tagarray =(this.state.queries[("query"+1)]).split('#');
                     let Firebasetagarray = x[this.state.columnsToQuery[("columnToQuery"+1)]].split('#');
                     console.log("TAG array "+tagarray)
                     console.log("Firebase Tag array "+Firebasetagarray)
                    
                     for(m=0;m<Firebasetagarray.length;m++){
                      if(Firebasetagarray[m]!=""){
                      for(j=0;j<tagarray.length;j++)
                      {
                        console.log("Checking "+Firebasetagarray[m].trim()+" with "+tagarray[j].trim());
                     if(tagarray[j]!=""){if(Firebasetagarray[m].trim().includes(tagarray[j].trim()))return true;}}
                      }
                  }}
                   if(x[this.state.columnsToQuery[("columnToQuery"+1)]].includes(this.state.queries[("query"+1)]))return x[this.state.columnsToQuery[("columnToQuery"+1)]].includes(this.state.queries[("query"+1)])}
                 if(this.state.columnToQuery2!=undefined && this.state.columnToQuery2 !="" && this.state.query2!=undefined && this.state.query2 !=""){
                  if(this.state.columnsToQuery[("columnToQuery"+2)]=="tags")
                  {
                    let tagarray =(this.state.queries[("query"+2)]).split('#');
                    let Firebasetagarray = x[this.state.columnsToQuery[("columnToQuery"+2)]].split('#');
                    console.log("TAG array "+tagarray)
                    console.log("Firebase Tag array "+Firebasetagarray)
                   
                    for(m=0;m<Firebasetagarray.length;m++){
                     if(Firebasetagarray[m]!=""){
                     for(j=0;j<tagarray.length;j++)
                     {
                       console.log("Checking "+Firebasetagarray[m].trim()+" with "+tagarray[j].trim());
                    if(tagarray[j]!=""){if(Firebasetagarray[m].trim().includes(tagarray[j].trim()))return true;}}
                     }
                 }}
                  if(x[this.state.columnsToQuery[("columnToQuery"+2)]].includes(this.state.queries[("query"+2)]))return x[this.state.columnsToQuery[("columnToQuery"+2)]].includes(this.state.queries[("query"+2)])}
                 if(this.state.columnToQuery3!=undefined && this.state.columnToQuery3 !="" && this.state.query3!=undefined && this.state.query3 !=""){
                  if(this.state.columnsToQuery[("columnToQuery"+3)]=="tags")
                  {
                    let tagarray =(this.state.queries[("query"+3)]).split('#');
                    let Firebasetagarray = x[this.state.columnsToQuery[("columnToQuery"+3)]].split('#');
                    console.log("TAG array "+tagarray)
                    console.log("Firebase Tag array "+Firebasetagarray)
                   
                    for(m=0;m<Firebasetagarray.length;m++){
                     if(Firebasetagarray[m]!=""){
                     for(j=0;j<tagarray.length;j++)
                     {
                       console.log("Checking "+Firebasetagarray[m].trim()+" with "+tagarray[j].trim());
                    if(tagarray[j]!=""){if(Firebasetagarray[m].trim().includes(tagarray[j].trim()))return true;}}
                     }
                 }}
                  if(x[this.state.columnsToQuery[("columnToQuery"+3)]].includes(this.state.queries[("query"+3)]))return x[this.state.columnsToQuery[("columnToQuery"+3)]].includes(this.state.queries[("query"+3)])}
                 if(this.state.columnToQuery4!=undefined && this.state.columnToQuery4 !="" && this.state.query4!=undefined && this.state.query4 !=""){
                  if(this.state.columnsToQuery[("columnToQuery"+4)]=="tags")
                  {
                    let tagarray =(this.state.queries[("query"+4)]).split('#');
                    let Firebasetagarray = x[this.state.columnsToQuery[("columnToQuery"+4)]].split('#');
                    console.log("TAG array "+tagarray)
                    console.log("Firebase Tag array "+Firebasetagarray)
                   
                    for(m=0;m<Firebasetagarray.length;m++){
                     if(Firebasetagarray[m]!=""){
                     for(j=0;j<tagarray.length;j++)
                     {
                       console.log("Checking "+Firebasetagarray[m].trim()+" with "+tagarray[j].trim());
                    if(tagarray[j]!=""){if(Firebasetagarray[m].trim().includes(tagarray[j].trim()))return true;}}
                     }
                 }}
                  if(x[this.state.columnsToQuery[("columnToQuery"+4)]].includes(this.state.queries[("query"+4)]))return x[this.state.columnsToQuery[("columnToQuery"+4)]].includes(this.state.queries[("query"+4)])}
                 if(this.state.columnToQuery5!=undefined && this.state.columnToQuery5 !="" && this.state.query5!=undefined && this.state.query5 !=""){
                  if(this.state.columnsToQuery[("columnToQuery"+5)]=="tags")
                  {
                    let tagarray =(this.state.queries[("query"+5)]).split('#');
                    let Firebasetagarray = x[this.state.columnsToQuery[("columnToQuery"+5)]].split('#');
                    console.log("TAG array "+tagarray)
                    console.log("Firebase Tag array "+Firebasetagarray)
                    let i =0;
                    for(m=0;m<Firebasetagarray.length;m++){
                     if(Firebasetagarray[m]!=""){
                     for(j=0;j<tagarray.length;j++)
                     {
                       console.log("Checking "+Firebasetagarray[m].trim()+" with "+tagarray[j].trim());
                    if(tagarray[j]!=""){if(Firebasetagarray[m].trim().includes(tagarray[j].trim()))return true;}}
                     }
                 }}
                  if(x[this.state.columnsToQuery[("columnToQuery"+5)]].includes(this.state.queries[("query"+5)]))return x[this.state.columnsToQuery[("columnToQuery"+5)]].includes(this.state.queries[("query"+5)])}                     
                      //   {
                      //     return x[this.state.columnsToQuery[("columnToQuery"+i)]].includes(this.state.queries[("query"+i)])
                          
                      //   }
                    //   for(i=1;i<=columnslength;i++)
                    // {
                    //   console.log("If Column of " +x+ " "+x[this.state.columnsToQuery[("columnToQuery"+i)]])
                    //   console.log("has "+this.state.queries[("query"+i)])
                    //   console.log(x[this.state.columnsToQuery[("columnToQuery"+i)]].includes(this.state.queries[("query"+i)]))
                    //   if(x[this.state.columnsToQuery[("columnToQuery"+i)]].includes(this.state.queries[("query"+i)]))
                    //   {
                    //     return x[this.state.columnsToQuery[("columnToQuery"+i)]].includes(this.state.queries[("query"+i)])
                        
                    //   }
                    // }
                  }
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
              },
              {
                name: "Tags",
                prop: "tags"
              }

            ]}
          />
      </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
