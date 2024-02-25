import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function UserDetails() {

  const[userData, setUserData] = useState({});
  const {userid} = useParams();
  
  useEffect(() => {
    fetch("http://localhost:8000/users/"+userid)
            .then((res) => {
                return res.json();
            })
            .then((resp) => {
                setUserData(resp);
            })
            .catch((err) => {
                console.log(err);
            })
  }, [])

  return (
    <div className='card' style={{textAlign:"center"}}>
      <div className='card-title'>
        <h2>USER DETAILS</h2>
      </div>
      <div className='card-body'>
        { userData &&
          <>
            <h1>The users UserName is : {userData.username} </h1>
            <h5>Email is: {userData.email}</h5>
            <h5>Age is: {userData.birthDate}</h5>
            <Link className='btn btn-danger' to="/">Back to Home</Link>
          </>
        }
      </div>
    </div>
  )
}

export default UserDetails