import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function UserList() {

    const[userData, setUserData] = useState(null);
    const navigate = useNavigate();

    const userDetail = (id) => {
        navigate("/userdetail/"+id);
    }

    const editUser = (id) => {
        navigate("/useredit/"+id);
    }

    const removeUser = (id) => {
        if(window.confirm('Do you want to remove?')){
            fetch("http://localhost:8000/users/"+id, {
            method:"DELETE"
        }).then((res) => {
            alert('Deleted user successfully');
            window.location.reload();s
        }).catch((error) => {
            console.log('error', error);
        })
        }
    }

    useEffect(() => {
        fetch("http://localhost:8000/users")
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

    console.log(userData)
    return (
        <div className='container py-2 '>
            <div className='card text-center'>
                <div className='card-title m-0'>
                    <h2 className='py-2'>Users List</h2>
                </div>
                <div className='card-body m-0'>
                    <div className='my-2'>
                        <Link to="/adduser" className='btn btn-success'>Add New</Link>
                    </div>
                    <table className='table table-bordered'>
                        <thead className='bg-dark text-white'>
                            <tr>
                                <td>Username</td>
                                <td>Email</td>
                                <td>Description</td>
                                <td>Skill</td>
                                <td>Date of birth</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>

                            { userData &&
                                userData.map(item => (
                                    <tr key={item.id}>
                                        <td>{item?.username}</td>
                                        <td>{item?.email}</td>
                                        <td>{item?.description}</td>
                                        <td>{item?.selectOption}</td>
                                        <td>{item?.birthDate}</td>
                                        <td>
                                            <a onClick={() => {userDetail(item.id)}} className='btn btn-primary'>Detail</a>
                                            <a onClick={() => {editUser(item.id)}} className='btn btn-success'>Edit</a>
                                            <a onClick={() => {removeUser(item.id)}} className='btn btn-danger'>Remove</a>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserList