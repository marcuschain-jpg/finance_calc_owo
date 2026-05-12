"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../helper/axios.tsx"; // axios route
import { testOutput } from "../helper/types.tsx"; // get basic return type from shared file
import errSuccMsg from "../.components/errSuccMsg.tsx" // error & success msg modal

export default function registerPage() {
  const router = useRouter();
  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [DOB, setDOB] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error/Success Message
  const [showMsgModal, setShowMsgModal] = useState(false); // TO CHANGE
  const [msgType, setMsgType] = useState("");
  const [msg, setMsg] = useState("");

  // Clear all textbox
  const clearTextbox = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setDOB("");
    setPassword("");
    setConfirmPassword("");
  };

  const resetMsgModal = () => {
    setTimeout(() => {
      setShowMsgModal(false);
      setMsgType("");
      setMsg("");
    }, 2000);
  }

  const registerAccount = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailIsValid = (emailToValidate:string) => {
      return emailToValidate.match(emailRegex);
    }
    if(confirmPassword !== password) {
      setMsgType("error");
      setMsg("Password do not match");
      setPassword("");
      setConfirmPassword("");
      setShowMsgModal(true);
      resetMsgModal();
      return;
    }
    if(!emailIsValid(email)) {
      setMsgType("error");
      setMsg("Email format is invalid");
      setEmail("")
      setShowMsgModal(true);
      resetMsgModal();
      return;
    }

    let output;
    try {
      output = await api.post<testOutput>('/auth/register', {email, firstName, lastName, password, DOB});
      if(output.status === 200){
        setMsgType("success");
        setMsg("Account Successfully created. Navigating to login page...");
        setShowMsgModal(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    }
    catch(error){
      if(error) console.log(`error content: ${error}`);
    }
    finally{
      clearTextbox();
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  };

  const handleFNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value)
  };

  const handleLNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value)
  };

  const handleDOBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDOB(e.target.value)
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  };
  
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  };

  return (
    <div>
      <main>
        <h1>Register Page</h1>
        <div className="flex justify-center items-center">
          <form onSubmit={registerAccount}>
            <h1>Email:</h1>
            <input type="text" value={email} placeholder="example@gmail.com" name="Email" className="border-2 border-black" required onChange={handleEmailChange}/>
            <h1>First Name:</h1>
            <input type="text" value={firstName} placeholder="John" name="FN" className="border-2 border-black" required onChange={handleFNChange}/>
            <h1>Last Name:</h1>
            <input type="text" value={lastName} placeholder="Doe" name="LN" className="border-2 border-black" required onChange={handleLNChange}/>
            <h1>Date of Birth:</h1>
            <input type="date" value={DOB} placeholder="Select Date" name="DOB" className="border-2 border-black" required onChange={handleDOBChange}/>
            <h1>Password:</h1>
            <input type="password" value={password} name="Password" className="border-2 border-black" required onChange={handlePasswordChange}/>
            {password && <h1>Confirm Password:</h1>}
            {password && <input type="password" value={confirmPassword} name="ConfirmPassword" className="border-2 border-black" required onChange={handleConfirmPassword}/>}
            <br/>
            <button type="submit">Create Account</button>
          </form>
        </div>
      </main>
      {showMsgModal && errSuccMsg(msgType, msg)}
    </div>
  );
}