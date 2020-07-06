import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import FirebaseConfig from "./firebaseconfig";
import Firebase from "firebase";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import orderBy from "lodash.orderby";
import { Divider, Form, Label } from "semantic-ui-react";
import "./FlexBox.css";
import FilteringComp from "./FIlteringomponent";
import { concat } from "bytebuffer";
import DTP from "./DateTimePick";
import Mattable from "./newmattable";
import Gmaps from "./Gmaps";
import styles from "./styles.module.css";
import papeilogo from "./images/papei-logo.jpg";

class App extends Component {
  constructor(props) {
    super(props);
    if (!Firebase.apps.length) {
      const firebaseApp = Firebase.initializeApp(FirebaseConfig);
    }
    this.state = {
      SensorValues: [],

      //State Variable for Firebase Data
      FirebaseData: [],

      //User Input for Filtering
      query1: "",
      query2: "",
      query3: "",
      query4: "",
      query5: "",
      query6: "",
      queries: [],

      //Number Of Columns for Filtering
      columnToQuery1: "",
      columnToQuery2: "",
      columnToQuery3: "",
      columnToQuery4: "",
      columnToQuery5: "",
      columnToQuery6: "",
      columnsToQuery: [],
      numberoffilters: 2,
      showquery3: false,
      showquery4: false,
      showquery5: false,

      //Initialized Timestamps
      dateFrom: "2019-09-18T21:11:57",
      dateTo: "2020-02-18T21:11:57",
      timeFrom: "2019-08-18T21:11:54",
      timeTo: "2019-08-18T21:11:53",
      selrows: [],
      MapLocs: [],
      Mapsarray: [],
      NewMapLocs: [],
      posremove: [],
      loaded: false,
    };
  }

  componentDidMount() {
    this.getUserData();
  }
  componentDidUpdate() {}

  //Get Data From Firebase
  getUserData = () => {
    let ref = Firebase.database().ref("/SensorFoo/");
    ref.on("value", (snapshot) => {
      const state = snapshot.val();
      this.setState({ FirebaseData: state });
    });
  };

  //User Input Change
  ChangeFilterStatus = (e) => {
    let currentqueries = { ...this.state.queries };
    let queryname = e.target.name;
    currentqueries[e.target.name] = e.target.value;
    console.log("Current Queries" + currentqueries);
    console.log("e target name" + e.target.name);
    this.setState({ queries: currentqueries, [queryname]: e.target.value });
  };

  //Filter Type Change
  ChangeFilterColumnStatus = (event, index, value, FilterNumber) => {
    let currentcolumns = { ...this.state.columnsToQuery };
    let Columntoquery = "columnToQuery" + FilterNumber;
    currentcolumns["columnToQuery" + FilterNumber] = value;
    this.setState({ columnsToQuery: currentcolumns, [Columntoquery]: value });
    //   this.setState({columnToQuery1 : value,
    // columnsToQuery : [...this.state.columnsToQuery,value]})
  };

  //Hide Extra Filters
  hideFilter = (queryToHide) => {
    let query = "showquery" + queryToHide;
    this.setState((
      state // this is the current state
    ) => ({
      numberoffilters: state.numberoffilters - 1, // this will be the previous randomNumber
      [query]: false,
    }));
    console.log(this.state.numberoffilters);
  };

  //Display 3rd,4th or 5th filtering
  showFilter = () => {
    this.setState((
      state // this is the current state
    ) => ({
      numberoffilters: state.numberoffilters + 1, // this will be the previous randomNumber
      showquery3: this.state.numberoffilters + 1 >= 3 ? true : false,
      showquery4: this.state.numberoffilters + 1 >= 4 ? true : false,
      showquery5: this.state.numberoffilters + 1 >= 5 ? true : false,
    }));
  };

  //Change Date Value From
  changeDateValue = (date) => {
    this.setState((state) => ({
      dateFrom: date,
    }));
    console.log(this.state.dateFrom);
  };
  //Change Date Value To
  changeDateValueTo = (date) => {
    this.setState((state) => ({
      dateTo: date,
    }));
  };

  //Change Time Value From
  changeTimeValue = (time) => {
    this.setState((state) => ({
      timeFrom: time,
    }));
  };
  //Change Time Value To
  changeTimeValueTo = (time) => {
    console.log(time);
    this.setState((state) => ({
      timeTo: time,
    }));
  };
  updateSelectedRows = (rows) => {
    console.log(rows);
    this.setState((state) => ({
      selrows: rows,
    }));
  };
  //View Rows on Google Maps
  viewOnMaps = (e) => {
    this.state.Mapsarray = [];
    let temparr = [];
    let tempMaps = this.state.MapLocs;
    this.state.posremove = [];
    let positionschanged = false;
    console.log(this.state.selrows);
    console.log(this.state.MapLocs[this.state.selrows]);
    console.log(this.state.Mapsarray);

    for (let pos in this.state.MapLocs) {
      if (!this.state.MapLocs[pos].eligible) {
        this.state.posremove.push(pos);
        positionschanged = true;
      }

      //  this.state.Mapsarray.push(e[this.state.selrows[marker]])
    }

    console.log(this.state.posremove);
    let removeValFromIndex = this.state.posremove;

    for (var i = removeValFromIndex.length - 1; i >= 0; i--) {
      this.state.MapLocs.splice(removeValFromIndex[i], 1);
    }
    console.log(this.state.MapLocs);
    for (let marker in this.state.selrows) {
      console.log(this.state.selrows[marker]);
      temparr.push(this.state.MapLocs[this.state.selrows[marker]]);
      //  this.state.Mapsarray.push(e[this.state.selrows[marker]])
    }
    if (!positionschanged) {
      this.setState((state) => ({
        Mapsarray: temparr,
        NewMapLocs: this.state.MapLocs,
      }));
      console.log(this.state.Mapsarray);
    } else {
      this.setState((state) => ({
        Mapsarray: this.state.MapLocs,
        NewMapLocs: this.state.MapLocs,
      }));
      console.log(this.state.Mapsarray);
    }
  };
  render() {
    var SensorValuestmp = [];
    let SensorValuesFinal = [];
    var SensorValues = this.state.FirebaseData;
    console.log(this.state);

    for (let user in SensorValues) {
      for (let record in SensorValues[user]) {
        SensorValuestmp = [];
        Object.keys(SensorValues[user][record]).map((x) => {
          SensorValuestmp.push(SensorValues[user][record][x]);
        });
        SensorValuestmp.push(SensorValues[user][record]["test"]);
        SensorValuesFinal = [
          ...SensorValuesFinal,
          Object.assign(
            SensorValuestmp[0],
            SensorValuestmp[1],
            SensorValuestmp[2]
          ),
        ];
      }
    }

    //Convert Location Data in 2D array
    let DataArrayForMaps = new Array();
    for (let record in SensorValuesFinal) {
      DataArrayForMaps[record] = new Array();
      for (let value in SensorValuesFinal[record]) {
        if (value === "latitudeValue") {
          DataArrayForMaps[record]["latitude"] =
            SensorValuesFinal[record][value];
          DataArrayForMaps[record].eligible = true;
        }
        if (value === "longitudeValue") {
          DataArrayForMaps[record]["longitude"] =
            SensorValuesFinal[record][value];
          DataArrayForMaps[record].eligible = true;
        }
      }
    }
    this.state.MapLocs = DataArrayForMaps;
    return (
      <div className="App">
        <div className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <img src={papeilogo} className={styles.papeilogo} />
          {/* <h2>Welcome to React</h2> */}
        </div>
        <p className="App-intro">
          {/* To get started, edit <code>src/App.js</code> and save to reload. */}
        </p>
        <MuiThemeProvider>
          <div className="mui_div_wrapper">
            <div>
              <Fab
                color="primary"
                aria-label="add"
                style={{ marginLeft: "-85%" }}
              >
                <AddIcon onClick={this.showFilter} />
              </Fab>
            </div>
            <Label style={{ marginLeft: "-85%" }}>Add more Filters</Label>
            <div className="flex-container">
              <div>
                <TextField
                  style={{ marginTop: "12%" }}
                  value={this.state.query1}
                  name="query1"
                  onChange={(e) => {
                    let currentqueries = { ...this.state.queries };
                    currentqueries[e.target.name] = e.target.value;
                    console.log("Current Queries" + currentqueries);
                    this.setState({
                      queries: currentqueries,
                      query1: e.target.value,
                    });
                  }}
                  hintText="Search Value"
                />
              </div>
              <div>
                <SelectField
                  floatingLabelText="Search By"
                  value={this.state.columnToQuery1}
                  id="columnToQuery1"
                  onChange={(event, index, value) => {
                    let currentcolumns = { ...this.state.columnsToQuery };
                    console.log();
                    currentcolumns["columnToQuery1"] = value;
                    this.setState({
                      columnsToQuery: currentcolumns,
                      columnToQuery1: value,
                    });
                  }}
                >
                  <MenuItem
                    value={"ambTempValue"}
                    primaryText="Ambient Temperature"
                  />
                  <MenuItem value={"latitudeValue"} primaryText="Latitude" />
                  <MenuItem value={"lightValue"} primaryText="lightValue" />
                  <MenuItem value={"longitudeValue"} primaryText="Longitude" />
                  <MenuItem value={"pressureValue"} primaryText="Pressure" />
                  <MenuItem value={"tags"} primaryText="Tags" />
                  <MenuItem value={"imageLabels"} primaryText="Image Labels" />
                  <MenuItem value={"city"} primaryText="City" />
                  <MenuItem value={"tempValue"} primaryText="Temperature" />
                  <MenuItem value={"activity"} primaryText="Activity" />
                  <MenuItem
                    value={"imageLabelsConfidence"}
                    primaryText="imageLabelsConfidence"
                  />
                </SelectField>
              </div>
            </div>
            <div className="flex-container">
              <div>
                <TextField
                  style={{ marginTop: "12%" }}
                  value={this.state.query2}
                  name="query2"
                  onChange={(e) => {
                    let currentqueries = { ...this.state.queries };
                    currentqueries[e.target.name] = e.target.value;
                    console.log("Current Queries" + currentqueries);
                    this.setState({
                      queries: currentqueries,
                      query2: e.target.value,
                    });
                  }}
                  hintText="Search Value"
                />
              </div>
              <div>
                <SelectField
                  floatingLabelText="Confidence"
                  value={this.state.columnToQuery2}
                  inputprops={{ min: "0.0", max: "1.0", step: "0.01" }}
                  onChange={(event, index, value) => {
                    let currentcolumns = { ...this.state.columnsToQuery };
                    console.log();
                    currentcolumns["columnToQuery2"] = value;
                    this.setState({
                      columnsToQuery: currentcolumns,
                      columnToQuery2: value,
                    });
                  }}
                >
                  <MenuItem
                    value={"imageLabelsConfidence"}
                    primaryText="imageLabelsConfidence"
                  />
                </SelectField>
              </div>
            </div>
            {this.state.showquery3 ? (
              <FilteringComp
                hideFilter={this.hideFilter}
                changeColumn={this.ChangeFilterColumnStatus}
                onchange={this.ChangeFilterStatus}
                FilterNumber="3"
                columnvalue={this.state.columnToQuery3 || ""}
                queryvalue={this.state.query3 || ""}
              ></FilteringComp>
            ) : (
              <span></span>
            )}
            {this.state.showquery4 ? (
              <FilteringComp
                hideFilter={this.hideFilter}
                changeColumn={this.ChangeFilterColumnStatus}
                onchange={this.ChangeFilterStatus}
                FilterNumber="4"
                columnvalue={this.state.columnToQuery4 || ""}
                queryvalue={this.state.query4 || ""}
              ></FilteringComp>
            ) : (
              <span></span>
            )}
            {this.state.showquery5 ? (
              <FilteringComp
                hideFilter={this.hideFilter}
                changeColumn={this.ChangeFilterColumnStatus}
                onchange={this.ChangeFilterStatus}
                FilterNumber="5"
                columnvalue={this.state.columnToQuery5 || ""}
                queryvalue={this.state.query5 || ""}
              ></FilteringComp>
            ) : (
              <span></span>
            )}
            {/* <DateTimePick dateFrom={this.dateFrom} dateTo={this.dateTo} timeFrom={this.timeFrom} timeTo={this.timeTo}/> */}

            <DTP
              onchange={this.changeDateValue}
              onchangeTo={this.changeDateValueTo}
              datevalue={this.state.dateFrom}
              datevalueTo={this.state.dateTo}
              timeTo={this.state.timeTo}
              timevalue={this.state.timeFrom}
              onTimeChange={this.changeTimeValue}
              onTimeChangeTo={this.changeTimeValueTo}
            />

            {}
            <Mattable
              updateRows={this.updateSelectedRows}
              selectedRows={this.state.selrows}
              data={
                //newresult
                orderBy(
                  this.state.query1 ||
                    this.state.query2 ||
                    this.state.query3 ||
                    this.state.query4 ||
                    this.state.query5
                    ? SensorValuesFinal.filter((x, iter) => {
                        let m = 0;
                        let j = 0;
                        let columnslength = Object.keys(
                          this.state.columnsToQuery
                        ).length;
                        let cond1, cond2, cond3, cond4, cond5;
                        let datefrom = new Date(this.state.dateFrom);
                        let dateto = new Date(this.state.dateTo);
                        let timeFrom = new Date(this.state.timeFrom);
                        let timeTo = new Date(this.state.timeTo);
                        let fulldateto = new Date(
                          dateto.getMonth() +
                            1 +
                            "/" +
                            dateto.getDate() +
                            "/" +
                            dateto.getFullYear() +
                            " " +
                            timeTo.getHours() +
                            ":" +
                            timeTo.getMinutes()
                        );
                        let fulldatefrom = new Date(
                          datefrom.getMonth() +
                            1 +
                            "/" +
                            datefrom.getDate() +
                            "/" +
                            datefrom.getFullYear() +
                            " " +
                            timeFrom.getHours() +
                            ":" +
                            timeFrom.getMinutes()
                        );

                        let datecond = false;
                        let datefromFB = new Date(
                          x["dateOfPhoto"] + " " + x["timeOfPhoto"]
                        );
                        let booldatefrom = datefromFB > fulldatefrom;
                        let booldateto = datefromFB < fulldateto;

                        cond1 = false;
                        cond2 = false;
                        cond3 = false;
                        cond4 = false;
                        cond5 = false;
                        if (
                          this.state.columnToQuery1 !== undefined &&
                          this.state.columnToQuery1 !== "" &&
                          this.state.query1 !== undefined &&
                          this.state.query1 !== "" &&
                          x[this.state.columnsToQuery["columnToQuery" + 1]] !==
                            undefined
                        ) {
                          //Check if include
                          if (
                            this.state.columnsToQuery["columnToQuery" + 1] ===
                            "imageLabels"
                          ) {
                            let tagarray = this.state.queries[
                              "query" + 1
                            ].split(",");
                            let Firebasetagarray = x[
                              this.state.columnsToQuery["columnToQuery" + 1]
                            ].split(",");
                            console.log("TAG array " + tagarray);
                            console.log(
                              "Firebase Tag array " + Firebasetagarray
                            );

                            for (m = 0; m < Firebasetagarray.length; m++) {
                              if (Firebasetagarray[m] !== "") {
                                for (j = 0; j < tagarray.length; j++) {
                                  console.log(
                                    "Checking " +
                                      Firebasetagarray[m].trim() +
                                      " with " +
                                      tagarray[j].trim()
                                  );
                                  if (tagarray[j] !== "") {
                                    if (
                                      Firebasetagarray[m]
                                        .trim()
                                        .toLowerCase()
                                        .includes(
                                          tagarray[j].trim().toLowerCase()
                                        )
                                    ) {
                                      if (
                                        datefromFB > fulldatefrom &&
                                        datefromFB < fulldateto
                                      ) {
                                        console.log("date true");
                                        //return true;
                                        // cond1=true;
                                        if (
                                          this.state.columnsToQuery[
                                            "columnToQuery" + 2
                                          ] === "imageLabelsConfidence"
                                        ) {
                                          console.log(
                                            x[
                                              this.state.columnsToQuery[
                                                "columnToQuery" + 2
                                              ]
                                            ]
                                          );
                                          let confidencevalue = parseFloat(
                                            this.state.queries["query" + 2]
                                          );
                                          if (
                                            x[
                                              this.state.columnsToQuery[
                                                "columnToQuery" + 2
                                              ]
                                            ] !== undefined
                                          ) {
                                            let Firebaseconfarray = x[
                                              this.state.columnsToQuery[
                                                "columnToQuery" + 2
                                              ]
                                            ].split(",");
                                            console.log(
                                              "checking " +
                                                Firebaseconfarray[m] +
                                                " with " +
                                                confidencevalue
                                            );
                                            if (
                                              Firebaseconfarray[m] >
                                              confidencevalue
                                            ) {
                                              cond1 = true;
                                              cond2 = true;
                                              console.log("passed conftest");
                                            }
                                          } else {
                                            cond1 = true;
                                            console.log("passed conftest");
                                          }
                                        }
                                      } else {
                                        console.log("date false");
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          } else if (
                            x[this.state.columnsToQuery["columnToQuery" + 1]]
                              .toLowerCase()
                              .includes(
                                this.state.queries["query" + 1].toLowerCase()
                              )
                          ) {
                            if (
                              datefromFB > fulldatefrom &&
                              datefromFB < fulldateto
                            ) {
                              console.log("date true");
                              // return x[this.state.columnsToQuery[("columnToQuery"+1)]].includes(this.state.queries[("query"+1)])
                              cond1 = true;
                            } else {
                              console.log("date false");
                            }
                          }
                        }
                        //For FilterBox 2
                        if (
                          this.state.columnToQuery2 !== undefined &&
                          this.state.columnToQuery2 !== "" &&
                          this.state.query2 !== undefined &&
                          this.state.query2 !== "" &&
                          x[this.state.columnsToQuery["columnToQuery" + 2]] !==
                            undefined
                        ) {
                          if (
                            this.state.columnsToQuery["columnToQuery" + 2] ===
                            "imageLabels"
                          ) {
                            let tagarray = this.state.queries[
                              "query" + 2
                            ].split(",");
                            let Firebasetagarray = x[
                              this.state.columnsToQuery["columnToQuery" + 2]
                            ].split(",");
                            console.log("TAG array " + tagarray);
                            console.log(
                              "Firebase Tag array " + Firebasetagarray
                            );

                            for (m = 0; m < Firebasetagarray.length; m++) {
                              if (Firebasetagarray[m] !== "") {
                                for (j = 0; j < tagarray.length; j++) {
                                  console.log(
                                    "Checking " +
                                      Firebasetagarray[m].trim() +
                                      " with " +
                                      tagarray[j].trim()
                                  );
                                  if (tagarray[j] !== "") {
                                    if (
                                      Firebasetagarray[m]
                                        .trim()
                                        .toLowerCase()
                                        .includes(
                                          tagarray[j].trim().toLowerCase()
                                        )
                                    ) {
                                      if (
                                        datefromFB > fulldatefrom &&
                                        datefromFB < fulldateto
                                      ) {
                                        console.log("date true");
                                        //return true;
                                        cond2 = true;
                                        console.log("passed conftest2");
                                      } else {
                                        console.log("date false");
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }

                          if (
                            x[
                              this.state.columnsToQuery["columnToQuery" + 2]
                            ].includes(this.state.queries["query" + 2])
                          ) {
                            if (
                              datefromFB > fulldatefrom &&
                              datefromFB < fulldateto
                            ) {
                              console.log("date true");
                              //return x[this.state.columnsToQuery[("columnToQuery"+2)]].includes(this.state.queries[("query"+2)])
                              cond2 = true;
                              console.log("passed conftest2");
                            } else {
                              console.log("date false");
                            }
                          }
                        } else {
                          cond2 = true;
                        }
                        //For FilterBox 3
                        if (
                          this.state.columnToQuery3 !== undefined &&
                          this.state.columnToQuery3 !== "" &&
                          this.state.query3 !== undefined &&
                          this.state.query3 !== "" &&
                          x[this.state.columnsToQuery["columnToQuery" + 3]] !==
                            undefined
                        ) {
                          if (
                            this.state.columnsToQuery["columnToQuery" + 3] ===
                            "imageLabels"
                          ) {
                            let tagarray = this.state.queries[
                              "query" + 3
                            ].split(",");
                            let Firebasetagarray = x[
                              this.state.columnsToQuery["columnToQuery" + 3]
                            ].split(",");
                            console.log("TAG array " + tagarray);
                            console.log(
                              "Firebase Tag array " + Firebasetagarray
                            );

                            for (m = 0; m < Firebasetagarray.length; m++) {
                              if (Firebasetagarray[m] !== "") {
                                for (j = 0; j < tagarray.length; j++) {
                                  console.log(
                                    "Checking " +
                                      Firebasetagarray[m].trim() +
                                      " with " +
                                      tagarray[j].trim()
                                  );
                                  if (tagarray[j] !== "") {
                                    if (
                                      Firebasetagarray[m]
                                        .trim()
                                        .toLowerCase()
                                        .includes(
                                          tagarray[j].trim().toLowerCase()
                                        )
                                    ) {
                                      if (
                                        datefromFB > fulldatefrom &&
                                        datefromFB < fulldateto
                                      ) {
                                        console.log("date true");
                                        //  return true;
                                        // cond3=true;
                                        if (
                                          this.state.columnsToQuery[
                                            "columnToQuery" + 2
                                          ] === "imageLabelsConfidence"
                                        ) {
                                          console.log(
                                            x[
                                              this.state.columnsToQuery[
                                                "columnToQuery" + 2
                                              ]
                                            ]
                                          );
                                          let confidencevalue = parseFloat(
                                            this.state.queries["query" + 2]
                                          );
                                          if (
                                            x[
                                              this.state.columnsToQuery[
                                                "columnToQuery" + 2
                                              ]
                                            ] !== undefined
                                          ) {
                                            let Firebaseconfarray = x[
                                              this.state.columnsToQuery[
                                                "columnToQuery" + 2
                                              ]
                                            ].split(",");
                                            console.log(
                                              "checking " +
                                                Firebaseconfarray[m] +
                                                " with " +
                                                confidencevalue
                                            );
                                            if (
                                              Firebaseconfarray[m] >
                                              confidencevalue
                                            ) {
                                              cond3 = true;
                                              console.log("passed conftest3");
                                              console.log("passed conftest");
                                            }
                                          } else {
                                            cond3 = true;
                                            console.log("passed conftest3");
                                          }
                                        }
                                      } else {
                                        console.log("date false");
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                          if (
                            x[this.state.columnsToQuery["columnToQuery" + 3]]
                              .toLowerCase()
                              .includes(
                                this.state.queries["query" + 3].toLowerCase()
                              )
                          ) {
                            if (
                              datefromFB > fulldatefrom &&
                              datefromFB < fulldateto
                            ) {
                              console.log("date true");
                              // return x[this.state.columnsToQuery[("columnToQuery"+3)]].includes(this.state.queries[("query"+3)])
                              cond3 = true;
                            } else {
                              console.log("date false");
                            }
                          }
                        } else {
                          cond3 = true;
                        }
                        //For FilterBox 4
                        if (
                          this.state.columnToQuery4 !== undefined &&
                          this.state.columnToQuery4 !== "" &&
                          this.state.query4 !== undefined &&
                          this.state.query4 !== "" &&
                          x[this.state.columnsToQuery["columnToQuery" + 4]] !==
                            undefined
                        ) {
                          if (
                            this.state.columnsToQuery["columnToQuery" + 4] ===
                            "imageLabels"
                          ) {
                            let tagarray = this.state.queries[
                              "query" + 4
                            ].split(",");
                            let Firebasetagarray = x[
                              this.state.columnsToQuery["columnToQuery" + 4]
                            ].split(",");
                            console.log("TAG array " + tagarray);
                            console.log(
                              "Firebase Tag array " + Firebasetagarray
                            );

                            for (m = 0; m < Firebasetagarray.length; m++) {
                              if (Firebasetagarray[m] !== "") {
                                for (j = 0; j < tagarray.length; j++) {
                                  console.log(
                                    "Checking " +
                                      Firebasetagarray[m].trim() +
                                      " with " +
                                      tagarray[j].trim()
                                  );
                                  if (tagarray[j] !== "") {
                                    if (
                                      Firebasetagarray[m]
                                        .trim()
                                        .toLowerCase()
                                        .includes(
                                          tagarray[j].trim().toLowerCase()
                                        )
                                    ) {
                                      if (
                                        datefromFB > fulldatefrom &&
                                        datefromFB < fulldateto
                                      ) {
                                        console.log("date true");
                                        //  return true;
                                        // cond3=true;
                                        if (
                                          this.state.columnsToQuery[
                                            "columnToQuery" + 2
                                          ] === "imageLabelsConfidence"
                                        ) {
                                          console.log(
                                            x[
                                              this.state.columnsToQuery[
                                                "columnToQuery" + 2
                                              ]
                                            ]
                                          );
                                          let confidencevalue = parseFloat(
                                            this.state.queries["query" + 2]
                                          );
                                          if (
                                            x[
                                              this.state.columnsToQuery[
                                                "columnToQuery" + 2
                                              ]
                                            ] !== undefined
                                          ) {
                                            let Firebaseconfarray = x[
                                              this.state.columnsToQuery[
                                                "columnToQuery" + 2
                                              ]
                                            ].split(",");
                                            console.log(
                                              "checking " +
                                                Firebaseconfarray[m] +
                                                " with " +
                                                confidencevalue
                                            );
                                            if (
                                              Firebaseconfarray[m] >
                                              confidencevalue
                                            ) {
                                              cond4 = true;
                                              console.log("passed conftest4");
                                              console.log("passed conftest");
                                            }
                                          } else {
                                            cond3 = true;
                                            console.log("passed conftest4");
                                          }
                                        }
                                      } else {
                                        console.log("date false");
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                          if (
                            x[this.state.columnsToQuery["columnToQuery" + 4]]
                              .toLowerCase()
                              .includes(
                                this.state.queries["query" + 4].toLowerCase()
                              )
                          ) {
                            if (
                              datefromFB > fulldatefrom &&
                              datefromFB < fulldateto
                            ) {
                              console.log("date true");
                              // return x[this.state.columnsToQuery[("columnToQuery"+4)]].includes(this.state.queries[("query"+4)])
                              cond3 = true;
                            } else {
                              console.log("date false");
                            }
                          }
                        } else {
                          cond4 = true;
                        }
                        //For FilterBox 5
                        if (
                          this.state.columnToQuery5 !== undefined &&
                          this.state.columnToQuery5 !== "" &&
                          this.state.query5 !== undefined &&
                          this.state.query5 !== "" &&
                          x[this.state.columnsToQuery["columnToQuery" + 5]] !==
                            undefined
                        ) {
                          if (
                            this.state.columnsToQuery["columnToQuery" + 5] ===
                            "imageLabels"
                          ) {
                            let tagarray = this.state.queries[
                              "query" + 5
                            ].split(",");
                            let Firebasetagarray = x[
                              this.state.columnsToQuery["columnToQuery" + 5]
                            ].split(",");
                            console.log("TAG array " + tagarray);
                            console.log(
                              "Firebase Tag array " + Firebasetagarray
                            );
                            let i = 0;
                            for (m = 0; m < Firebasetagarray.length; m++) {
                              if (Firebasetagarray[m] !== "") {
                                for (j = 0; j < tagarray.length; j++) {
                                  console.log(
                                    "Checking " +
                                      Firebasetagarray[m].trim() +
                                      " with " +
                                      tagarray[j].trim()
                                  );
                                  if (tagarray[j] !== "") {
                                    if (
                                      Firebasetagarray[m]
                                        .trim()
                                        .toLowerCase()
                                        .includes(
                                          tagarray[j].trim().toLowerCase()
                                        )
                                    ) {
                                      if (
                                        datefromFB > fulldatefrom &&
                                        datefromFB < fulldateto
                                      ) {
                                        console.log("date true");
                                        // return true;
                                        //cond5=true;
                                        if (
                                          this.state.columnsToQuery[
                                            "columnToQuery" + 2
                                          ] === "imageLabelsConfidence"
                                        ) {
                                          console.log(
                                            x[
                                              this.state.columnsToQuery[
                                                "columnToQuery" + 2
                                              ]
                                            ]
                                          );
                                          let confidencevalue = parseFloat(
                                            this.state.queries["query" + 2]
                                          );
                                          if (
                                            x[
                                              this.state.columnsToQuery[
                                                "columnToQuery" + 2
                                              ]
                                            ] !== undefined
                                          ) {
                                            let Firebaseconfarray = x[
                                              this.state.columnsToQuery[
                                                "columnToQuery" + 2
                                              ]
                                            ].split(",");
                                            console.log(
                                              "checking " +
                                                Firebaseconfarray[m] +
                                                " with " +
                                                confidencevalue
                                            );
                                            if (
                                              Firebaseconfarray[m] >
                                              confidencevalue
                                            ) {
                                              cond5 = true;
                                              console.log("passed conftest");
                                            }
                                          } else {
                                            cond5 = true;
                                            console.log("passed conftest5");
                                          }
                                        }
                                      } else {
                                        console.log("date false");
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                          if (
                            x[this.state.columnsToQuery["columnToQuery" + 5]]
                              .toLowerCase()
                              .includes(
                                this.state.queries["query" + 5].toLowerCase()
                              )
                          ) {
                            if (
                              datefromFB > fulldatefrom &&
                              datefromFB < fulldateto
                            ) {
                              console.log("date true");
                              // return x[this.state.columnsToQuery[("columnToQuery"+5)]].includes(this.state.queries[("query"+5)])
                              cond5 = true;
                              console.log("passed conftest5");
                            } else {
                              console.log("date false");
                            }
                          }
                        } else {
                          cond5 = true;
                        }
                        console.log("Cond 1 is " + cond1);
                        console.log("Cond 2 is " + cond2);
                        console.log("Cond 3 is " + cond3);
                        console.log("Cond 4 is " + cond4);
                        console.log("Cond 5 is " + cond5);
                        if (cond1 && cond2 && cond3 && cond4 & cond5) {
                          this.state.MapLocs[iter].eligible = true;
                          // console.log(this.state.MapLocs)

                          // console.log(this.state.posremove)
                          return true;
                        } else {
                          this.state.MapLocs[iter].eligible = false;
                          // this.state.posremove.push(iter);
                        }
                      })
                    : SensorValuesFinal
                )
              }
              header={[
                {
                  name: "User",
                  prop: "user",
                },
                {
                  name: "ambTempValue",
                  prop: "ambTempValue",
                },
                {
                  name: "latitudeValue",
                  prop: "latitudeValue",
                },
                {
                  name: "lightValue",
                  prop: "lightValue",
                },
                {
                  name: "longitudeValue",
                  prop: "longitudeValue",
                },
                {
                  name: "pressureValue",
                  prop: "pressureValue",
                },
                {
                  name: "Tags",
                  prop: "tags",
                },
                {
                  name: "ImageLabels",
                  prop: "imageLabels",
                },
                {
                  name: "Day Of Photo",
                  prop: "dateOfPhoto",
                },
                {
                  name: "City",
                  prop: "city",
                },
                {
                  name: "Temperature",
                  prop: "tempValue",
                },
                {
                  name: "Activity",
                  prop: "activity",
                },
                {
                  name: "LabelsConfidence",
                  prop: "imageLabelsConfidence",
                },
              ]}
            />
          </div>
        </MuiThemeProvider>
        <Gmaps
          style={{ margintop: "100px" }}
          markers={this.state.Mapsarray}
          showonmap={() => this.viewOnMaps(this.state.NewMapLocs)}
        />
      </div>
    );
  }
}

export default App;
