import { useRef, useState } from "react";
import Login from "./Login";
import "../index.css"

const Register = () => {
    const [accounts,setAccounts] = useState([]);
    const [error,setError] = useState({});
    const [toLogin,setToLogin] = useState(false);

    const name = useRef();
    const email = useRef();
    const pass = useRef();
    
    const mailRegex = /[a-zA-Z][a-zA-Z0-9]*@[a-zA-Z]{3,}\.[a-zA-Z]{2,}/g;

    const validate = () => {
      const newErrors = {}; // Reset errors
  
      const nameValue = name.current.value.trim();
      const emailValue = email.current.value.trim();
      const passValue = pass.current.value.trim();
  
      if (!nameValue) {
        newErrors.name = ("Username cannot be empty.");
      }
  
      if (!mailRegex.test(emailValue)) {
        newErrors.email = ("Invalid email format.");
      }
  
      if (passValue.length < 6) {
        newErrors.pass = ("Password must be at least 6 characters");
      }
  
      if (accounts.some(account => account.email === emailValue || account.name === nameValue)) {
          newErrors.accEixst = ("An account with this email already exists.");
      }
  
      setError(newErrors);

      return Object.keys(newErrors).length === 0;
    };

    const AddAccount = (e) => {
      
      e.preventDefault();

      if(validate()){
        const account = {
          name: name.current.value,
          email: email.current.value,
          pass: pass.current.value
        }

        setAccounts([...accounts,account]);

        name.current.value = "";
        email.current.value = "";
        pass.current.value = "";

        setToLogin(true);
      }
      
  }

  console.log(accounts);

    return(
      toLogin ? <Login accs={accounts}/> : // if login = true go to login
      
      <form onSubmit={AddAccount} className="flex flex-col justify-center items-center">
        <div className='flex flex-col'>
          <label htmlFor="name">Username:</label>
          <input id="name" ref={name} type="text" placeholder="🧑🏻‍🦱 Username"/>
          {error.name && <div style={{ color: 'red' }}>{error.name}</div>}
        </div>
        <div className='flex flex-col'>
          <label htmlFor="email">Email:</label>
          <input id="email" ref={email} type="email" placeholder="✉️ Email"/>
          {error.email && <div style={{ color: 'red' }}>{error.email}</div>}
        </div>
        <div className='flex flex-col'>
          <label htmlFor="pass">Password:</label>
          <input id="pass" ref={pass} type="password" placeholder="🔑 Password"/>
          {error.pass && <div style={{ color: 'red' }}>{error.pass}</div>}
        </div>
        <div className="flex flex-col">
        {error.accEixst && <div style={{ color: 'red' }}>{error.accEixst}</div>}  
          <button className="text-sm cursor-pointer hover:text-amber-100" type="submit">Sign Up</button>
        </div>
        <p className="text-sm cursor-pointer hover:text-amber-100" onClick={() => setToLogin(true)}>Already have an account?</p>
      </form>
    );
    
}

export default Register;