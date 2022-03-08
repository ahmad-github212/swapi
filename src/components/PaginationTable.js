import React from 'react'
import {useParams} from 'react-router-dom'
function PaginationTable() {
    const params = useParams() ;
    const {id} = params ;
 ;  return (
      <>
      
        <div>{id} PaginationTable</div>
      </>
    
  )
}
 
export default PaginationTable