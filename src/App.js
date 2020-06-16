import React, { useState } from "react";
import "./App.css";

function App() {
  const [addresses, setAddresses] = useState([]);

  function fetchData() {
    fetch("https://api.ontario.ca/api/data/64029?count=0&download=1").then(
      response => {
        response.json().then(addressArray => {
          setAddresses(addressArray);
        });
      }
    );
  }

  if (addresses.length === 0) {
    fetchData();
  }

  //search places by any keyword
  const [searchKeyword, setSearchKeyword] = useState("");

  const updateSearchKeyword = event => {
    setSearchKeyword(event.target.value);
  };

  return (
    <div className="App">
      <div className="top-bar">
        <h2>Ontario hunting and fishing licence issuers: 2020</h2>
        <h5>
          Find a nearby location that sells hunting and fishing licences, tags
          and related products and services.
        </h5>
        <div className="search-box">
          <input
            id="name-input"
            type="text"
            value={searchKeyword}
            onChange={updateSearchKeyword}
            placeholder="search by any keyword"
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>City</th>
            <th>Business Name</th>
            <th>Address (click to map)</th>
            <th>Postal Code</th>
            <th>Issuer Type</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((address, i) => {
            return (
              <tr key={i}>
                <td>{address._city.content}</td>
                <td>{address.business_name.content}</td>
                <td>{address.street_address.content}</td>
                <td>{address.postal_code.content}</td>
                <td>{address.issuer_type.content}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
