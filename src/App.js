import { useState, useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from "axios";
import './App.css';

function App() {

  const [dogList, setDogList] = useState();
  const [currentDogName, setCurrentDogName] = useState();
  const [currentDogData, setCurrentDogData] = useState();
  const [search, setSearch] = useState('');

  useEffect(() => {
    getData()
  }, []);

  function getData() {
    axios({
      method: "GET",
      url:"/dogs",
    })
    .then((response) => {
      const res = response.data
      setDogList(res.message)
      console.log(response)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
  };

  function fetchDog(name) {
    axios({
      method: "GET",
      url: `/dogs/${name}`,
    })
    .then((response) => {
      const res = response.data
      setCurrentDogData(res.message)
      console.log(response)
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })
  };

  const handleSearch = event => {
    setSearch(event.target.value);
  };

  const dogItem = (name) => {
    const dogName = name;
  
    return (
      <div className='dog-item' data-testid="dog-item" onClick={ () => {
          setCurrentDogName(dogName)
          setCurrentDogData(null)
          fetchDog(dogName)
        }}>

        {dogName}
      </div>
    )
  }



  return (
    <div className="App">
      <div className="side-panel">
        <h2>all the dogs 🐕</h2>
        <div>
          <input  className="side-panel-search" 
                  onChange={handleSearch} 
                  value={search} 
                  placeholder="search dog breeds"/>
        </div>

        {dogList && <div>
          <div>
            { Object.keys(dogList).map((key, index) => {
              if (!search || key.includes(search)) { return dogItem(key) }
            })}
          </div>
        </div>}

      </div>

      <div className='detail-panel'>
          {currentDogName && <h2 className='detail-header'>
              {currentDogName} + " pics 🐶📸"
          </h2>}

        <div className='picture-grid'>
          {currentDogData && currentDogData.map((image) => {
              return <LazyLoadImage effect="opacity"
                                    src={image} 
                                    className='grid-image'/>;
          })}
        </div>
      </div>
    </div>
  );
}

export default App;