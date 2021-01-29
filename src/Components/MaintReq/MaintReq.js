import React from 'react'
import MaintReqList from '../MaintReq/MaintReqList'
import { Link } from 'react-router-dom'

const MaintReq = props => {
 return (
  <div>
   <MaintReqList />
   <Link to='/maintreq/request'>
       <button className="submit">New Request</button>
   </Link>
  </div>
 )
}
export default MaintReq