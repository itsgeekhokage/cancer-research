import React, { useState } from 'react'
import CameraComponent from './CameraComponent'

const CamDataEntry = () => {
  const [image, setImage] = useState(null);
  return (
    <div>
      <CameraComponent setImage={setImage}/>
    </div>
  )
}

export default CamDataEntry
