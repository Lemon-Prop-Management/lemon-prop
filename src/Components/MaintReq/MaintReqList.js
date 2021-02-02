import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

const MaintReqList = props => {

  const [myList, setMyList] = useState([])
  const [openList, setOpenList] = useState([])
  const [closedList, setClosedList] = useState([])
  const [admin, setAdmin] = useState(props.admin)
  const [user_id, setUserId] = useState(props.user_id)


  useEffect(() => {
    if (admin === false) {
      axios.get(`/api/tenant/${user_id}/mr`)
        .then(res => {
          setMyList(res.data)
        })
        .catch(err => console.log(err))
    } else if (admin === true) {
      axios.get('/api/manager/mr/false')
        .then(res => {
          setOpenList(res.data)
        })
        .catch(err => console.log(err))
      axios.get('/api/manager/mr/true')
        .then(res => {
          setClosedList(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [])

  function mapIt(array) {
    return array.map((element) => {
      return (
        <div key={element.maint_req_id}>
          <div>{element.date_sub}</div>
          <div>{element.subject}</div>
          {admin === false ? null : <div>{element.prop_id}</div>}
          <div>{element.status}</div>
          {admin === true && element.status === 'open' ? <button>Complete</button> : null}
        </div>
      )
    })
  }

  return (
    <div className='maint-req'>
      <h1>Maintenance Request History</h1>
      {admin === false ? mapIt(myList) : null}
      {admin === true ? mapIt(openList) : null}
      {admin === true ? mapIt(closedList) : null}
    </div>
  )
}

function mapStateToProps(state) {
  console.log('state:', state)
  return {
    email: state.email,
    user_id: state.user_id,
    admin: state.admin,
    approved: state.approved
  }
}

export default connect(mapStateToProps)(MaintReqList)