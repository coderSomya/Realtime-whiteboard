import React, {useEffect} from 'react'

const Protected = () => {

    useEffect(() => {
        window.location.href= `${import.meta.env.VITE_WHITEBOARD_URL}`
    }, []);
  return (
    <h1>Redirecting to your whiteboard....</h1>
  )
}

export default Protected