import React, {useContext} from 'react'

import { ApiContext } from '../context';
//https://swapi.py4e.com/api/people/

import Loading from './Loading' ;

function HomeTable() {
    const contextdata = useContext(ApiContext) ;
    console.log(contextdata)
    const {charactersData, getData, page, status, handleChange, searchData, search,
            humanNumber, droidNumber, resultNumber, match, sortData} = contextdata ; 
    
  return (
    <>
      <div className="my-2">
        <button
          className="btn btn-warning mx-1"
          onClick={() => {
            getData(1);
          }}
        >
          1
        </button>
        <button
          className="btn btn-warning mx-1"
          onClick={() => {
            getData(2);
          }}
        >
          2
        </button>
        <button
          className="btn btn-warning mx-1"
          onClick={() => {
            getData(3);
          }}
        >
          3
        </button>
        <button
          className="btn btn-warning mx-1"
          onClick={() => {
            getData(4);
          }}
        >
          4
        </button>
        <button
          className="btn btn-warning mx-1"
          onClick={() => {
            getData(5);
          }}
        >
          5
        </button>
        <button
          className="btn btn-warning mx-1"
          onClick={() => {
            getData(6);
          }}
        >
          6
        </button>
        <button
          className="btn btn-warning mx-1"
          onClick={() => {
            getData(7);
          }}
        >
          7
        </button>
        <button
          className="btn btn-warning mx-1"
          onClick={() => {
            getData(8);
          }}
        >
          8
        </button>
        <button
          className="btn btn-warning mx-1 "
          onClick={() => {
            getData(9);
          }}
        >
          9
        </button>

        <input
          type="text"
          placeholder="Search"
          name="search"
          value={search}
          className="mt-4 mx-3"
          onChange={handleChange}
          onKeyUp={(e)=>{
            const value = e.target.value ;
            console.log(value) ;
            if(value===''){
                getData(1);
            }
            
          }}
        />
        <button
          className="btn btn-secondary"
          onClick={() => {
            searchData(search);
          }}
        >
          search
        </button>
        <button className='btn btn-primary mx-2'
        onClick={sortData}
        >sort by name</button>

      </div>
      <div className="text-secondary text-center">
        <h3>Page {page}</h3>
        <h2>
          {" "}
          {"     "} Humans {humanNumber} {"    ||"}Droids {droidNumber}{" "}
          {"    ||"}Other Species {resultNumber - humanNumber - droidNumber}
        </h2>
      </div>
      <div className="table-responsive-sm">
        <table className="table table-bordered caption-top border-primary table-light table-hover">
          <caption>List of Star Wars Characters</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>SPECIES</th>
              <th>HOMEWORLD</th>
              <th>DOB</th>
              <th>EYE COLOR</th>
              <th>FILMS</th>
              <th>GENDER</th>
              <th>HAIR COLOR</th>
              <th>HEIGHT</th>
              <th>MASS</th>
              <th>VEHICLES</th>
              <th>STARSHIPS</th>
            </tr>
          </thead>

          <tbody>
            {match ? "" : <h2 className='mt-3'>No Match Found!!!</h2>}
            {!status ? (
              <Loading />
            ) : (
              charactersData.map((data) => {
                return (
                  <tr>
                    <td>{data.name}</td>
                    <td>
                      {data.species === "Human" ? (
                        <span>
                          {" "}
                          <i className="fa fa-user"></i> Human
                        </span>
                      ) : (
                        ""
                      )}
                      {data.species === "Droid" ? (
                        <span>
                          <i className="fa fa-android"></i> Droid
                        </span>
                      ) : (
                        ""
                      )}
                    </td>
                    <td>{data.homeworld}</td>
                    <td>{data.birth_year}</td>
                    <td>{data.eye_color}</td>
                    <td>
                      {data.films.map((temp) => {
                        return <li>{temp}</li>;
                      })}
                    </td>
                    <td>{data.gender}</td>
                    <td>{data.hair_color}</td>
                    <td>{data.height}</td>
                    <td>{data.mass}</td>
                    <td>
                      {data.vehicles === "n/a"
                        ? "n/a"
                        : data.vehicles.map((tempdata) => {
                            return <li>{tempdata}</li>;
                          })}{" "}
                    </td>
                    <td>
                      {data.starships === "n/a"
                        ? "n/a"
                        : data.starships.map((tempdata) => {
                            return <li>{tempdata}</li>;
                          })}{" "}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default HomeTable