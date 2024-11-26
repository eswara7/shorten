import { useState } from 'react'
import axios from 'axios'

function App() {
  const [url,setUrl] = useState("")
  const [shortedUrl,setShortedUrl] = useState("")
  const [error,setError] = useState("")
  const shortenUrl =async ()=>{
    setError("")
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/shorten`,{
        url
      })
      if(response.data){
        setShortedUrl(`${import.meta.env.VITE_BACKEND_URI}/${response.data.id}`)
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error)
      } else {
        setError("something went wrong try agian")
      }
    }
  }

  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='flex justify-center gap-2 pt-36'>
        <input  onChange = {(e)=>{setUrl(e.target.value),setShortedUrl(""),setError("")}} className='rounded-md w-64 p-2 border border-neutral-300 bg-neutral-100 text-neutral-600 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md focus:outline-none' type="text" placeholder='paste url to shorten' />
        <button onClick={shortenUrl} className="px-3 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-600 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">shorten</button>
      </div>

      {error && (
        <div className="text-red-500 text-center mt-4">{error}</div>
      )}


      {shortedUrl && (
        <div className='flex justify-center items-center mt-8'>
          <div className='bg-slate-300 text-black px-6 py-4 rounded-full'>
              <a className ="hover:text-blue-500 hover:underline cursor-pointer"  href={shortedUrl} target='_blank'>{shortedUrl}</a>
          </div>
        </div>
      )}

    </div>
  )
}

export default App
