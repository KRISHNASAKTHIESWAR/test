import React, {useState,useEffect} from "react";
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
export default function App(){
    const[details,setDetails] = useState([]);
    const[form, setForm] = useState({sname:'',address:'',email:'',dept:'',description:''});

    const fetchData = async()=>{
        const rs = await axios.get(`${API_URL}/all`);
        setDetails(rs.data);
    };

    useEffect(()=>{fetchData()},[]);

    const handleSubmit = async(e)=>{
        e.preventDefault();
        await axios.post(`${API_URL}/add`,form);
        setForm({sname:'',address:'',email:'',dept:'',description:''});
        fetchData();
    }

    return(
        <>
        <div className="cont">
        <h1>Engineering Admission enquiry System</h1>
        <form onSubmit={handleSubmit}>
            <input placeholder="Name" value={form.sname} onChange={e=>setForm({...form,sname:e.target.value})}/>
            <input placeholder="Address" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/>
            <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
            <input placeholder="Dept" value={form.dept} onChange={e=>setForm({...form,dept:e.target.value})}/>
            <select className="filter" value={form.dept}>
                <option value="CSE" onChange={(e)=>setForm(e.target.value)}>CSE</option>
                <option value="IT" onChange={(e)=>setForm(e.target.value)}>IT</option>
                <option value="AIDS" onChange={(e)=>setForm(e.target.value)}>AIDS</option> 
            </select>
            <input placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/>
            <button>Submit</button>
        </form>
        <table className="tb">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Dept</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {details.map(
                    obj=>(
                    <tr key={obj.id}>
                        <td>{obj.sname}</td>
                        <td>{obj.address}</td>
                        <td>{obj.email}</td>
                        <td>{obj.dept}</td>
                        <td>{obj.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        </>
    )
}