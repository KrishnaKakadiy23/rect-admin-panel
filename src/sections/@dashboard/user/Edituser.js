import React from 'react'
import { useParams } from 'react-router-dom'

const Edituser = () => {

  const {id} =useParams();

  return (
    <div>
      {id}
        <h2>Edit page</h2>
    </div>
  )
}

export default Edituser
