import React from 'react'
import { useParams } from 'react-router-dom'

const ViewTour = () => {

  const {_id} = useParams();

  return (
    <div>
            View{_id}
    </div>
  )
}

export default ViewTour
