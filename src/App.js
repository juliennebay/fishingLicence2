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

  console.log(addresses[0]);
  //console.log(Object.values(addresses));

  return (
    <div className="App">
      <div className="top-bar">
        <h1>Ontario hunting and fishing licence issuers: 2020</h1>
        <h3>
          Find a nearby location that sells hunting and fishing licences, tags
          and related products and services.
        </h3>
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
            <th className="postal-code">Postal Code</th>
            <th>Issuer Type</th>
          </tr>
        </thead>
        <tbody>
          {addresses
            .filter(
              address =>
                searchKeyword.length === 0 ||
                Object.values(address)
                  .map(obj => obj.content)
                  .some(content =>
                    content.toLowerCase().includes(searchKeyword.toLowerCase())
                  )
            )
            .map((address, i) => {
              return (
                <tr key={i}>
                  <td>{address._city.content}</td>
                  <td>{address.business_name.content}</td>
                  <td>{address.street_address.content}</td>
                  <td className="postal-code">{address.postal_code.content}</td>
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
