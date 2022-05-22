import React, { useEffect, useState } from 'react'
import logoApp from '../src/assets/logo.png'
import home from '../src/assets/home.png'
import group from '../src/assets/group.png'
import attandance from '../src/assets/attandance.png'
import search from '../src/assets/search.png'
import add from '../src/assets/add.png'
import dots from '../src/assets/dots.png'
import './App.css'
import Axios from 'axios'

const apiUrl = "https://randomuser.me/api/?results=28"

function App() {
  const [employeeData, setEmployeeData] = useState<any[] | null>(null)
  const [page, setPage] = useState<number>(0)

  useEffect(() => {
    Axios.get(apiUrl).then((response) => {
      const results = response.data.results
      const firstData = [...results].slice(0, 4)
      const secondData = [...results].slice(5, 9)
        setEmployeeData([
          firstData,
          secondData
        ])
    });
  }, [])

  return (
    <div className="App">
      <div className='container'>
        <img src={logoApp} alt="logo" className='imageAppLogo'/>
        <div className='userLoginContainer'>
          <p className='helloText'>Hallo,</p>
          <p className='userLoginText'>Gadjian User</p>
          <span className='dot'>
            <p className='photoText'>Photo</p>
          </span>
        </div>
      </div>
      <div className='menuBodyContainer'>
        <div className='menu'>
          <button className='menuContainer'>
            <img src={home} alt='home' className='homeIcon'/>
            <p className='homeText'>Beranda</p>
          </button>
          <button className='menuContainer'>
            <img src={group} alt='home' className='homeIcon'/>
            <p className='homeText'>Personnel List</p>
          </button>
          <button className='menuContainer'>
            <img src={attandance} alt='home' className='homeIcon'/>
            <p className='homeText'>Daily Attandance</p>
          </button>
        </div>
        <div className='main'>
          <div className='headerBodyContainer'>
            <div className='personnelContainer'>
              <div className='personnelText'>PERSONNEL LIST</div>
              <div className='personnelListText'>List of all personnels</div>
            </div>
            <div className='searchContainer'>
                <div className='searchPersonnel'>
                  <button className='searchButton' type='submit'>
                      <img src={search} alt='search' className='searchIcon'/>
                    </button>
                  <input type="text" placeholder="Find Personnels" name="search" className='searchInput'/>
                </div>
                <div className="addPersonnel">
                  <input type="text" placeholder="ADD PERSONNEL" name="add" className='addInput'/>
                  <button type="submit" className='addButton'>
                      <img src={add} alt='add' className='addIcon'/>
                    </button>
                </div>
            </div>
          </div>
          <div className='containerList'>

          {employeeData && employeeData[page].map((item: any) => {
            const id = item.id.value
            const date = new Date(item.dob.date)
            return (
              <div className='employeeListContainer'>
              <div className='headerEmployeeList'>
                  <p className='employeeID'>Personnel ID: {id}</p>
                  <button className='dotsButton'>
                    <img src={dots} className='dots' alt='menu'/>
                  </button>
              </div>
              <div className='bodyEmployeeList'>
                <span className='photoEmployee'>
                  <p className='photoTextEmployee'>Photo</p>
                </span>
                <div className='employeeDataContainer'>
                  <div className='dataTitleText'>Name</div>
                  <div className='dataText'>{item.name.first}</div>
                  <div className='dataTitleText'>Telephone</div>
                  <div className='dataText'>{item.phone}</div>
                  <div className='dataTitleText'>Birthday</div>
                  <div className='dataText'>{`${date.getDate()}-${date.getMonth()}`}</div>
                  <div className='dataTitleText'>Email</div>
                  <div className='dataText'>{item.email}</div>
                </div>
              </div>
            </div>
            )
          })}
          </div>
          <div className='buttonContainer'>
            <button onClick={() => setPage(0)} disabled={page === 0}>Previous page</button>
            <button onClick={() => setPage(1)} disabled={page === 1}>Next page</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
