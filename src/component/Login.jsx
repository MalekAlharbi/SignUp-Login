// Login.js
import React, { useState, useEffect } from 'react';
import HelloPage from "./HelloPage";

function Login(props) {
  const [toHomePage,setToHomePage] = useState(false);
  const [data,setData] = useState({
    name:"",
    pass:""
  });
  const [error,setError] = useState("");

  const accounts = props.accs;

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const foundAccount = accounts.find(
      account => account.name === data.name && account.pass === data.pass
    );

    if (foundAccount) {
      setToHomePage(true);
    } else {
      setError("Invalid username or password");
    }
  };

  return (
      toHomePage ? <HelloPage name={data.name}/> :    
      <div>
        <form className='flex flex-col justify-center items-center' onSubmit={handleLogin}>
        <div className='flex flex-col'>
          <label htmlFor="name">Username:</label>
          <input id="name" type="text" placeholder="🧑🏻‍🦱 Username" value={data.name} onChange={(e) => setData({...data,name: e.target.value})}/>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="pass">Password:</label>
          <input id="pass" type="password" placeholder="🔑 Password" value={data.pass} onChange={(e) => setData({...data,pass: e.target.value})}/>
        </div>
        <div className='flex flex-col'>
        {error && <div style={{ color: 'red' }}>{error}</div>}  
          <button type="submit">Login</button>
        </div>
        </form>
    </div>
  );
}

export default Login;