"use client";

import { useState } from "react";
import { api } from "../helper/axios.tsx"; // axios route
import { testOutput } from "../helper/types.tsx"; // get basic return type from shared file

export default function loginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const login = async(e: React.FormEvent<HTMLFormElement>) => {
    // Test Backend first
    let output;
    e.preventDefault();
    try {
      output = await api.get<testOutput>('/');
      console.log(`Message from BE: ${output.status}`)
    }
    catch(error){
      if(error) console.log(`error content: ${error}`);
    }
    finally{
      setEmail("");
      setPassword("");
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  };
  
  return (
    <div>
      <main>
        <h1>Login Page</h1>
        <div>
          <form onSubmit={login}>
            <h1>Email:</h1>
            <input type="text" value={email} name="Email" className="border-2 border-black" required onChange={handleEmailChange}/>
            <h1>Password:</h1>
            <input type="password" value={password} name="Password" className="border-2 border-black" required onChange={handlePasswordChange}/>
            <br/>
            <button type="submit">Login</button>
          </form>
        </div>
      </main>
    </div>
  );
}