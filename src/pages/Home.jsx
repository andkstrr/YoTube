import Button from '../components/Button'
import { useState } from 'react'

const Home = () => {
  const [count, setCount] = useState(0)
  return (
    <div>   
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}></button>
    </div>
  )
}

export default Home
