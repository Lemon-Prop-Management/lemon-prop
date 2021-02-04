import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

const MaintReqList = props => {

  const [myList, setMyList] = useState([])
  const [openList, setOpenList] = useState([])
  const [closedList, setClosedList] = useState([])
  const [admin] = useState(props.admin)
  const [user_id] = useState(props.user_id)

  // useEffect(() => {
  //   myList.forEach( => {
  //     let humanReadableDate = date_sub.split('T').slice(1, 1)
  //     return humanReadableDate
  //   })
  // }, [])
  // console.log(myList.date_sub)

  useEffect(() => {
    if (admin === false) {
      axios.get(`/api/tenant/${user_id}/mr`)
        .then(res => {
          setMyList(res.data)
        })
        .catch(err => console.log(err))
    } else if (admin === true) {
      axios.get(`/api/manager/mr/admin/false`)
        .then(res => {
          console.log(res.data)
          setOpenList(res.data)
          // console.log(openList)
        })
        .catch(err => console.log(err))
      axios.get('/api/manager/mr/admin/true')
        .then(res => {
          setClosedList(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [])



  function mapIt(array) {
    return array.map((element) => {
      return (
        <div>
          {(admin === false && !props.open) ? (
            <div key={element.maint_req_id}>
              <h2>{ }</h2>
              <div>{element.date_sub}</div>
              <div>{element.subject}</div>
              {admin === false ? null : <div>{element.prop_id}</div>}
              <div>{element.status}</div>
              {admin === true && element.status === 'open' ? <button>Complete</button> : null}
            </div>
          ) : (
              element.is_compl === false ? (
                <div key={element.maint_req_id}>
                  <h2>{ }</h2>
                  <div>{element.date_sub} {console.log(element)}</div>
                  <div>{element.subject}</div>
                  {admin === false ? null : <div>{element.prop_id}</div>}
                  <div>{element.status}</div>
                  {admin === true && element.status === 'open' ? <button>Complete</button> : null}
                </div>
              ) : null)}
          {(admin === true && element.is_compl === true && !props.open) ? (
            <div key={element.maint_req_id}>
              <h2>{ }</h2>
              <div>{element.date_sub}</div>
              <div>{element.subject}</div>
              {admin === false ? null : <div>{element.prop_id}</div>}
              <div>{element.status}</div>
              {admin === true && element.status === 'open' ? <button>Complete</button> : null}
            </div>
          ) : null}
        </div>
      )
    })
  }

  return (
    <div className='maint-req'>
      <h1>{!props.open ? 'Maintenance Request History' : null}</h1>
      {(admin === false && !props.open) ? mapIt(myList) : null}
      {(admin === false && props.open) ? (
        <div>
          <h2>Open Requests</h2>
          {mapIt(myList)}
        </div>
      ) : null}
      {(admin === true && !props.open) ? (
        <div>
          <h2>Open Requests:</h2>
          {mapIt(openList)}
        </div>) : null}
      {(admin === true && !props.open) ? (
        <div>
          <h2>Closed Requests:</h2>
          {mapIt(closedList)}
        </div>) : null}
      {(admin === true && props.open) ? (
        <div>
          <h2>Open Requests:</h2>
          {mapIt(openList)}
        </div>) : null}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    email: state.email,
    user_id: state.user_id,
    admin: state.admin,
    approved: state.approved
  }
}

export default connect(mapStateToProps)(MaintReqList)