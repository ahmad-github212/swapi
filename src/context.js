import React, { Component } from "react";
import axios from "axios";
const ApiContext = React.createContext();

export default class DataProvider extends Component {
  state = {
    results: [],
    charactersData: [],
    sortedData:[],
    page: "",
    search: "",
    humanNumber: 0,
    droidNumber: 0,
    resultNumber: 0,
    match:true,
    status: false,
  };

  getData = async (pg) => {
    let rawdata;
    if (pg === null) {
      rawdata = await axios.get("https://swapi.py4e.com/api/people/");
    } else {
      rawdata = await axios.get(
        "https://swapi.py4e.com/api/people/?page=" + pg
      );
    }
    this.setState({
      page: pg,
      match:true
    });
    this.formatData(rawdata);
  };

  searchData = async (searchData) => {
    const rawdata = await axios.get(
      "https://swapi.py4e.com/api/people/?search=" + searchData
    );
    console.log('rawdata',rawdata);
    
    if(rawdata.data.count===0){
       this.setState({
         results:[],
         charactersData: [],
         humanNumber:0,
         droidNumber:0,
        match:false,
         status: true,
       });
        return
    }

    this.formatData(rawdata);
    this.setState({
        page:0
    })
  };

  sortData = async ()=>{
    const rawdata = await axios.get("https://swapi.py4e.com/api/people/?page=" + this.state.page);
    rawdata.data.results.sort((a,b)=>{
        let fa = a.name.toLowerCase();
        let fb = b.name.toLowerCase();
        if(fa<fb){
            return -1;
        }
        if(fa>fb){
            return 1 ;
        }
        return 0;
    });
    console.log(rawdata)
    this.formatData(rawdata) ;
  }

  formatData = async (rawdata) => {
    let TempCharacterData = [];
    let tempObject = {};
    const results = rawdata.data.results;
    let humanNumber = 0;
    let droidNumber = 0;

    for (let character of results) {
      tempObject["name"] = character.name;
      tempObject["birth_year"] = character.birth_year;
      tempObject["eye_color"] = character.eye_color;
      tempObject["gender"] = character.gender;
      tempObject["hair_color"] = character.hair_color;
      tempObject["height"] = character.height;
      tempObject["mass"] = character.mass;
      tempObject["skin_color"] = character.skin_color;

      const tempHome = await axios.get(character.homeworld);
      tempObject["homeworld"] = tempHome.data.name;

      if (character.species.length > 0) {
        const characterSpecies = character.species[0];
        const characterSpeciesData = await axios.get(characterSpecies);
        tempObject["species"] = characterSpeciesData.data.name;
        if (tempObject["species"] === "Human") {
          humanNumber++;
        }
        if (tempObject["species"] === "Droid") {
          droidNumber++;
        }
      } else {
        tempObject["species"] = "n/a";
      }

      if (character.films.length > 0) {
        const charfilms = character.films;
        const tempFilms = [];
        for (let charfilm of charfilms) {
          const tempData = await axios.get(charfilm);
          tempFilms.push(tempData.data.title);
        }
        tempObject["films"] = tempFilms;
      } else {
        tempObject["films"] = "n/a";
      }

      if (character.starships.length > 0) {
        const charShips = character.starships;
        const tempShips = [];
        for (let charShip of charShips) {
          const tempData = await axios.get(charShip);
          tempShips.push(tempData.data.name);
        }
        tempObject["starships"] = tempShips;
      } else {
        tempObject["starships"] = "n/a";
      }

      if (character.vehicles.length > 0) {
        const charVehicles = character.vehicles;
        const tempVehicles = [];
        for (let charVehicle of charVehicles) {
          const tempData = await axios.get(charVehicle);
          tempVehicles.push(tempData.data.name);
        }
        tempObject["vehicles"] = tempVehicles;
      } else {
        tempObject["vehicles"] = "n/a";
      }

      TempCharacterData.push(tempObject);
      tempObject = {};
    }
    this.setState({
      results,
      charactersData: TempCharacterData,
      sortedData:TempCharacterData,
      humanNumber,
      droidNumber,

      status: true,
    });
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = event.target.name;

    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    this.getData(1);
    axios.get("https://swapi.py4e.com/api/people/").then((res) => {
      const resultsLen = res.data.count;

      this.setState({
        resultNumber: resultsLen,
      });
    });
  }
   
  render() {
    return (
      <ApiContext.Provider
        value={{
          ...this.state,
          getData: this.getData,
          handleChange: this.handleChange,
          searchData: this.searchData,
          sortData:this.sortData
        }}
      >
        {this.props.children}
      </ApiContext.Provider>
    );
  }
}

export { ApiContext, DataProvider };
