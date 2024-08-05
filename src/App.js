import './App.css';
import { React, useState, useEffect } from 'react';
import Buttons from 'react-bootstrap/Button'

import Employeedata from './Data/EmployeeData';
import Button from 'react-bootstrap/Button';
function App() {

  const [data, setData] = useState([])
  const [Id, setId] = useState(0)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [code, setCode] = useState('')
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    setData(Employeedata)
  }, [])

  let handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure to delete this data")) {
        const dt = data.filter(item => item.id !== id)
        setData(dt)
      }
    }
  }


  let handleEdit = (id) => {
    setIsUpdate(true)
    const dt = data.filter(item => item.id === id)
    if (dt != undefined) {
      setId(dt[0].id)
      setName(dt[0].name)
      setAddress(dt[0].address)
      setCode(dt[0].code)
    }
  }


  let handleSave = (e) => {
    let error = ''
    if (name.length === 0) { error += "Name is required\n" }
    if (address.length === 0) { error += "Address is required\n" }
    if (code.length === 0) { error += "Code is required\n" }
    if (error === "") {


      e.preventDefault()
      const dt = [...data]
      const newObject = {
        id: Employeedata.length + 1,
        name: name,
        address: address,
        code: code

      }
      dt.push(newObject)
      setData(dt)
      handleClear();
    }
    else {
      alert(error)
    }
  }



  let handleClear = () => {
    setIsUpdate(false)
    setId(Employeedata.length+1)
    setName('')
    setAddress('')
    setCode('')

  }

  let handleUpdate = () => {
    const index = data.map((item) => {
      return item.id
    }).indexOf(Id)

    const dt = [...data]
    dt[index].Id = Id
    dt[index].name = name
    dt[index].address = address
    dt[index].code = code
    setData(dt)
    handleClear();
  }

  return (


    <div className='App'>
      <div className='App-form'>
        <div >
          <label>Id :</label>
          <input type="text" placeholder='you id here' value={Id} onChange={(e) => setId(e.target.value)} required />
        </div>
        <div>
          <label>Name :</label>
          <input type="text" placeholder='you name here' value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Address :</label>
          <input type="text" placeholder='you address here' value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>
        <div>
          <label>Code :</label>
          <input type="text" placeholder='you code here' value={code} onChange={(e) => setCode(e.target.value)} required />
        </div>


        <div>
          {isUpdate ? <Button variant='primary' onClick={handleUpdate}>Update</Button> : <Button variant='primary' onClick={handleSave}>Save</Button>}
          &nbsp;
          <Button variant='success' onClick={handleClear}>Clear</Button></div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Serial no</th>
            <th>Id</th>
            <th>Name</th>
            <th>Address</th>
            <th>Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.code}</td>

                <td>
                  <Button variant='primary' onClick={() => handleEdit(item.id)}>Edit</Button>&nbsp;
                  <Button variant='success' onClick={() => handleDelete(item.id)}>Delete</Button></td>
              </tr>

            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
