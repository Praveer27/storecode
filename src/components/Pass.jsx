import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from 'postcss';
const Pass = () => {
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordarray, setpasswordarray] = useState([])
  useEffect(() => {
    let passwords = localStorage.getItem("passwords")
    if (passwords) {
      setpasswordarray(JSON.parse(passwords))
    }
  }, [])

  const ref = useRef()
  const passref=useRef()
  const changeeye = () => {

    if (ref.current.src.includes("icons/show.png")) {
      ref.current.src = "icons/hide11.png"
      passref.current.type='text'
    }
    else {
      ref.current.src = "icons/show.png"
       passref.current.type='password'
    }
  }
  const copytext=(text)=>{
    toast('COPIED TO CLIPBOARD', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      
      });
    navigator.clipboard.writeText(text)
  }

  const savepass = () => {

    if(form.site.length==0 && form.password.length==0 && form.username.length==0){
      toast('PASSWORD NOT SAVED', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
    else{
      setpasswordarray([...passwordarray, {...form,id:uuidv4()}])
      localStorage.setItem("passwords", JSON.stringify([...passwordarray, {...form,id:uuidv4()}]))
      console.log([...passwordarray, form])
      setform({ site: "", username: "", password: "" })
    }
    
    

  }
  const editpass = (id) => {

    setform(passwordarray.filter(i=>i.id===id)[0])
    setpasswordarray(passwordarray.filter(item=>item.id!==id))

  }
  const deletepass = (id) => {
    

    let c=confirm("ARE U SURE YOU WANT TO DELETE")
    toast('DELETED PASSWORD', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    if(c){
      setpasswordarray(passwordarray.filter((item)=>item.id!=id))
    localStorage.setItem("passwords", JSON.stringify(passwordarray.filter((item)=>item.id!=id)))
    }


  }
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })


  }
  return (

    <div className='container'>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition= "Bounce"
    />
    {/* Same as */}
    <ToastContainer />




    
      <div className='flex bg-emerald-200 justify-center min-h-screen w-screen'>
        <div className='flex flex-col items-center'>
        <h1 className=' text-center text-4xl font-bold text-green-600'><span className='text-emerald-900'>&lt;</span>Pass<span className='text-emerald-700'>  OP</span><span className='text-emerald-900'>/&gt;</span>  </h1>
          <input value={form.site} onChange={handlechange} type="text" name="site" id="" className='border-2 border-green-900 w-96 h-9 rounded-lg mt-4 placeholder:text-center pl-2' placeholder='Website' />
          <input value={form.username} onChange={handlechange} type="text" name="username" id="" className='border-2 border-green-900 w-96 h-9 rounded-lg mt-4 placeholder:text-center pl-2' placeholder='Username' />

          <div className=' relative'>
            <input ref={passref} value={form.password} onChange={handlechange} type='password' name="password" id="" className='border-2 border-green-900 w-96 h-9 rounded-lg mt-4 placeholder:text-center pl-2' placeholder='Password' />
            <span onClick={changeeye} className=' absolute right-2 mt-5 rounded-full px-1 hover:cursor-pointer font-bold'  ><img ref={ref} src="icons/show.png" width={30}></img></span>

          </div>

          <button onClick={savepass} className='bg-green-800 text-white  rounded-lg p-1 mt-4   flex justify-center text-2xl w-fit hover:bg-green-700'>
            <lord-icon src="https://cdn.lordicon.com/ftndcppj.json" trigger="hover"></lord-icon>ADD</button>

          <br></br>
          
            
            {passwordarray.length===0 && <div>NO PASSWORDS</div>}
            {passwordarray.length!=0 && <table className="table-auto mb-10 border-2 w-full border-black border-collaps bg-white">
              <thead className='border border-black border-collapse'>
                <tr>
                  <th>WEBSITE</th>
                  <th>USERNAME</th>
                  <th>PASSWORD</th>
                  <th className=' pr-10'>ACTIONS</th>
                </tr>
              </thead>
              <tbody className=' border-2 border-black border-collapse mb-10'>
                {passwordarray.map((item)=>{
                  return <tr className=' border-2 border-black '>
                  <td className=' text-center pl-10 pr-10'><span onClick={()=>{copytext(item.site)}} className=' flex hover:cursor-pointer'>{item.site}<img width={25}  className=' ml-2' src='icons/copy.png'></img></span></td>
                  <td className=' text-center pl-10 pr-10'><span onClick={()=>{copytext(item.username)}} className=' flex hover:cursor-pointer'>{item.username}<img width={25}  className=' ml-2' src='icons/copy.png'></img></span></td>
                  <td className=' text-center pl-10 pr-10'><span onClick={()=>{copytext(item.password)}} className=' flex hover:cursor-pointer'>{item.password}<img width={25}  className=' ml-2' src='icons/copy.png'></img></span></td>
                  <td className=' text-center pl-10 pr-10'><span className=' flex flex-row'><img src='icons/edit.gif' onClick={()=>editpass(item.id)} width={25} className=' hover:cursor-pointer hover:w-10'></img><img src='icons/trash-bin.gif' onClick={()=>{deletepass(item.id)}} className=' hover:cursor-pointer' width={25}></img></span></td>
                  </tr>
                })}
              </tbody>  
              
            </table>}
        </div>
      </div>

    </div>

  )
}

export default Pass