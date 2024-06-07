import Helmet from "react-helmet"
import React from 'react'

function MetaData({title}) {
  return (
    <Helmet>
        <title>{title}</title>
    </Helmet>
  )
}

export default MetaData