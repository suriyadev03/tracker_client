import { Button } from '@mui/material'
import Link, { useNavigate } from 'react-router-dom'

const PageNotFount = () => {
  const navigate = useNavigate()
  return (
    <section className=" dark:bg-gray-900">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-orange-600 dark:text-orange-500">404</h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">Something's missing.</p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
            <Button variant='outlined' onClick={()=>navigate("/home")} color='warning' sx={{color:"orange"}} className="inline-flex text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-orange-900 my-4">Back to Homepage</Button>
        </div>   
    </div>
</section>
  )
}

export default PageNotFount
