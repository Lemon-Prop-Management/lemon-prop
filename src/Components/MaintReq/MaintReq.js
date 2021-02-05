import React from 'react'
import MaintReqList from '../MaintReq/MaintReqList'
import { Link } from 'react-router-dom'

const MaintReq = props => {
    return (
        <div className='page'>
            <div className='title-container'>
                <h1>Maintenance Requests</h1>
            </div>
            <MaintReqList />
            <Link to='/maintreq/request'>
                <button className="submit btn-edit">New Request</button>
            </Link>
        </div>
    )
}

export default MaintReq