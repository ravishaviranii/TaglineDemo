import React, { useEffect, useState } from 'react';
import { userData } from './userdata';

function App() {
  const [tableData, setTableData] = useState(userData);
  const [city, setCity] = useState([]);
  const [category, setCategory] = useState([]);
  const [type, setType] = useState([]);
  const [active, setActive] = useState([]);
  const [name, setName] = useState('');


  const [cityFilter, setCityFilter] = useState(["dallas", "san francisco", "denver"]);
  const [categoryFilter, setCategoryFilter] = useState(["one", "two"]);
  const [typeFilter, setTypeFilter] = useState(["A", "B", "C"]);
  const [activeFilter, setActiveFilter] = useState(["TRUE", "FALSE"]);


  const cityHandler = (e, label) => {
    const isChecked = e.target.checked;
    let updatedCities = [...city];

    if (isChecked) {
      updatedCities.push(label);
    } else {
      updatedCities = updatedCities.filter(cityLabel => cityLabel !== label);
    }

    setCity(updatedCities);
  };

  const categoryHandler = (e, label) => {
    const isChecked = e.target.checked;
    let updatedCategory = [...category];

    if (isChecked) {
      updatedCategory.push(label);
    } else {
      updatedCategory = updatedCategory.filter(categoryLabel => categoryLabel !== label);
    }

    setCategory(updatedCategory);
  };


  const typeHandler = (e, label) => {
    const isChecked = e.target.checked;
    let updatedType = [...type];

    if (isChecked) {
      updatedType.push(label);
    } else {
      updatedType = updatedType.filter(typeLabel => typeLabel !== label);
    }

    setType(updatedType);
  }

  const activeHandler = (e, label) => {
    const isChecked = e.target.checked;
    let updatedactive = [...active];

    if (isChecked) {
      updatedactive.push(label);
    } else {
      updatedactive = updatedactive.filter(activeLabel => activeLabel !== label);
    }

    setActive(updatedactive);
  }


  useEffect(() => {
    let filteredData = userData;

    if (city.length > 0) {
      filteredData = filteredData.filter(row => city.includes(row.city) || city.includes(row.address));
    }

    if (category.length > 0) {
      filteredData = filteredData.filter(row => category.includes(row.category));
    }

    if (type.length > 0) {
      filteredData = filteredData.filter(row => type.includes(row.type) || type.includes(row.rating));
    }

    if (active.length > 0) {
      filteredData = filteredData.filter(row => active.includes(row.active));
    }

    if (name != '') {
      filteredData = filteredData.filter(row => row.name.toLowerCase().includes(name.toLocaleLowerCase()));
    }

    setTableData(filteredData);
  }, [city, category, type, active, name]);







  const TableComponent = ({ data }) => {

    const allKeys = data.reduce((keys, item) => {

      Object.keys(item).forEach(key => {
        if (!keys.includes(key)) {
          // console.log(item, "item")
          keys.push(key);
        }
      });
      return keys;
    }, []);

    return (
      <table>
        <thead>
          <tr>
            {allKeys.map((key, index) => (
              <th key={index}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {allKeys.map((key, i) => (
                <td key={i}>{row[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };



  return (
    <>

      <div className='filter_content'>
        <div className='filter_section'>
          <h2>City</h2>
          <div className='filter_block'>
            {cityFilter.map(el => (

              <div key={el}>
                <label className="switch">
                  <input type="checkbox" onChange={(e) => cityHandler(e, el)} />
                  <span className="slider round"></span>
                </label>
                <label>{el}</label>
              </div>


            ))}
          </div>
        </div>

        <div className='filter_section'>
          <h2>Category</h2>
          <div className='filter_block'>
            {categoryFilter.map(el => (

              <div key={el}>
                <label className="switch">
                  <input type="checkbox" onChange={(e) => categoryHandler(e, el)} />
                  <span className="slider round"></span>
                </label>
                <label>{el}</label>
              </div>

            ))}
          </div>
        </div>

        <div className='filter_section'>
          <h2>type</h2>
          <div className='filter_block'>
            {typeFilter.map(el => (

              <div key={el} >
                <label className="switch">
                  <input type="checkbox" onChange={(e) => typeHandler(e, el)} />
                  <span className="slider round"></span>
                </label>
                <label>{el}</label>
              </div>


            ))}
          </div>
        </div>

        <div className='filter_section'>
          <h2>Active</h2>
          <div className='filter_block'>
            {activeFilter.map(el => (

              <div key={el} >
                <label className="switch">
                  <input type="checkbox" onChange={(e) => activeHandler(e, el)} />
                  <span className="slider round"></span>
                </label>
                <label>{el}</label>
              </div>

            ))}
          </div>
        </div>

        <div className='filter_item'>
          <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} />
        </div>

      </div>

      <TableComponent data={tableData} />
    </>
  );
}

export default App;
