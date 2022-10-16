import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";




function App() {
  // Fetch data from GitHub api.
  const fetchData = async () => {
    let dataArray = [];
    let page = 1;
    let response = null;
    do {
      response = await axios(`https://api.github.com/repos/PHP-FFMpeg/PHP-FFMpeg/issues?per_page=100&page=${page}`)
      dataArray = dataArray.concat(response.data);
      page = page + 1;
      console.log(response)
    } while (response.data.length == 100);
    // console.log(dataArray);
    setData(dataArray);
    // console.log(data);
  }
  useEffect(() => {
    fetchData();
  }, []);

  // State to store data
  const [data, setData] = useState([]);

  //State to store search term to filter
  const [searchTerm, setSearchTerm] = useState("");


  return (
    <div>
      <div className='inputDiv'>
        <input onChange={(e) => {
          setSearchTerm(e.target.value)
        }} placeholder="Search..." />
      </div>
      <div className='table'>
        <table>
          {/* table head */}
          <thead>
            <tr>
              <th>
                ISSUES
              </th>
            </tr>
          </thead>
          <tbody>
            {/* first map then filter  */}
            {data.filter((val) => {
              if (searchTerm == "") {
                return val;
              }
              else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) return val;
            }).map((val, key) => {
              return (
                <tr key={key}>
                  <td>
                    {val.title}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App;
