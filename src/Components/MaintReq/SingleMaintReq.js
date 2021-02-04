import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

const SingleMaintReq = props => {
  const [subject, setSubject] = useState('')
  const [request, setRequest] = useState('')
  const [admin] = useState(props.admin)
  const [user_id] = useState(props.user_id)
  const [prop_id] = useState(props.prop_id)

  console.log(props)

  function submitMaintReq() {
    axios.post(`/api/tenant/${user_id}/mr`, { prop_id, subject, request })
      .then(() => {
        props.history.push('/maintreq')
      })
      .catch(err => console.log(err))
  }



  return (
    <div>
      <h1>Maintenance Request</h1>
      <input
        value={subject}
        onChange={e => setSubject(e.target.value)}
        placeholder="Subject"
        type="text"
      >
      </input>
      <input
        value={request}
        onChange={e => setRequest(e.target.value)}
        placeholder="What is the issue?"
        type="text"
      >
      </input>
      <button onClick={submitMaintReq}>Submit</button>
    </div>
  )
}

function mapStateToProps(state) {
  console.log('state:', state)
  return {
    email: state.email,
    user_id: state.user_id,
    admin: state.admin,
    approved: state.approved,
    prop_id: state.prop_id
  }
}

export default connect(mapStateToProps)(SingleMaintReq)