import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 1500,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const showPassword = () => {
        if (ref.current.src.includes("eyecross.png")) {
            ref.current.src = "eye.png"
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "eyecross.png"
        }
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const newPasswordArray = [...passwordArray, { ...form, id: uuidv4() }];
            setPasswordArray(newPasswordArray)
            localStorage.setItem("passwords", JSON.stringify(newPasswordArray))
            setform({ site: "", username: "", password: "" })
            toast('Password saved!');
        }
        else {
            toast('Error: Fields must be > 3 characters');
        }
    }

    const deletePassword = (id) => {
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            const newArray = passwordArray.filter(item => item.id !== id);
            setPasswordArray(newArray)
            localStorage.setItem("passwords", JSON.stringify(newArray))
            toast('Password Deleted!');
        }
    }

    const editPassword = (id) => {
        setform(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer />
            <div className="min-h-screen flex flex-col bg-white">
                
                {/* Center Container to match your image exactly */}
                <div className="flex-grow md:mycontainer p-5 md:px-0">
                     <h3 className="text-2xl p-3 font-bold text-center text-blue-700">Password Manager</h3>
                    <p className="text-center text-blue-500">Your encrypted vault for passwords.</p>

                    <div className="flex flex-col p-4 text-black gap-5 items-center max-w-4xl mx-auto">
                        {/* URL Input */}
                        <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-blue-900 w-full px-5 py-1.5 outline-none' type="text" name="site" id="site" />
                        
                        {/* Middle Row: Username and Password */}
                        <div className="flex flex-col md:flex-row w-full justify-between gap-5">
                            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-blue-900 w-full px-5 py-1.5 outline-none' type="text" name="username" id="username" />
                            
                            <div className="relative w-full">
                                <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' title="Password" className='rounded-full border border-blue-900 w-full px-5 py-1.5 outline-none' type="password" name="password" id="password" />
                                <span className='absolute right-[15px] top-[7px] cursor-pointer' onClick={showPassword}>
                                    <img ref={ref} width={22} src="eye.png" alt="eye" />
                                </span>
                            </div>
                        </div>

                        {/* Save Button styled to match image */}
                        <button onClick={savePassword} className='flex justify-center items-center gap-2 bg-blue-300 hover:bg-blue-200 rounded-full px-8 py-2 w-fit border border-blue-900 font-bold transition-all'>
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover"
                                colors="primary:#104891"
                                style={{width: "20px", height: "20px"}}>
                            </lord-icon>
                            Save Password
                        </button>
                    </div>

                    {/* Table Section */}
                    <div className="passwords mt-14 max-w-5xl mx-auto">
                        <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                        {passwordArray.length === 0 && <div className='text-gray-400 italic'> No passwords to show...</div>}
                        {passwordArray.length !== 0 && 
                        <div className="overflow-x-auto rounded-lg shadow-md ">
                            <table className="table-auto w-full text-sm">
                                <thead className='bg-blue-900 text-white'>
                                    <tr>
                                        <th className='py-3 px-2'>Site</th>
                                        <th className='py-3 px-2'>Username</th>
                                        <th className='py-3 px-2'>Password</th>
                                        <th className='py-3 px-2'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-blue-50'>
                                    {passwordArray.map((item, index) => (
                                        <tr key={index} className="border-b border-white hover:bg-blue-100 transition-colors">
                                           <td className='py-2 border border-white text-center'>
                                                <div className='flex items-center justify-center '>
                                                    <a href={item.site} target='_blank' rel="noreferrer">{item.site}</a>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.site)}>
                                                        <lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-white text-center'>
                                                <div className='flex items-center justify-center '>
                                                    <span>{item.username}</span>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.username)}>
                                                        <lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-white text-center'>
                                                <div className='flex items-center justify-center '>
                                                    <span>{"*".repeat(item.password?.length || 0)}</span>
                                                    <div className='lordiconcopy size-7 cursor-pointer' onClick={() => copyText(item.password)}>
                                                        <lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='justify-center py-2 border border-white text-center'>
                                                <span className='cursor-pointer mx-1' onClick={() => editPassword(item.id)}>
                                                    <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{ "width": "25px", "height": "25px" }}></lord-icon>
                                                </span>
                                                <span className='cursor-pointer mx-1' onClick={() => deletePassword(item.id)}>
                                                    <lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style={{ "width": "25px", "height": "25px" }}></lord-icon>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>}
                    </div>
                </div>

                
                
            </div>
        </>
    )
}

export default Manager