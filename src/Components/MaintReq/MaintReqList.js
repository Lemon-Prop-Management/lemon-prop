import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

const MaintReqList = props => {
  const [myList, setMyList] = useState([])
  const [openList, setOpenList] = useState([])
  const [closedList, setClosedList] = useState([])
  const { user_id, admin } = props

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
          setOpenList(res.data)
        })
        .catch(err => console.log(err))
      axios.get('/api/manager/mr/admin/true')
        .then(res => {
          setClosedList(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [user_id])



  function mapIt(array) {
    return array.map((element) => {
      let date = element.date_sub.slice(0, 10)
      return (
        <div className='sub-page maint-req' key={element.maint_req_id}>
          {(admin === false && !props.open) ? (
            <div className='row'>
              <h2>{ }</h2>
              <div className='list-item' >{date}</div>
              <div className='list-item'>{element.subject}</div>
              {admin === false ? null : <div className='list-item'>{element.prop_id}</div>}
              <div className='list-item'>{element.status}</div>
              {admin === true && element.status === 'open' ? <button>Complete</button> : null}
            </div>
          ) : (
              element.is_compl === false ? (
                <div className='row'>
                  <h2>{ }</h2>
                  <div className='list-item'>{date}</div>
                  <div className='list-item'>{element.subject}</div>
                  {admin === false ? null : <div className='list-item'>{element.prop_id}</div>}
                  <div className='list-item'>{element.status}</div>
                  {admin === true && element.status === 'open' ? <button>Complete</button> : null}
                </div>
              ) : null)}
          {(admin === true && element.is_compl === true && !props.open) ? (
            <div key={element.maint_req_id} className='row'>
              <h2>{ }</h2>
              <div className='list-item'>{date}</div>
              <div className='list-item'>{element.subject}</div>
              {admin === false ? null : <div className='list-item'>{element.prop_id}</div>}
              <div className='list-item'>{element.status}</div>
              {admin === true && element.status === 'open' ? <button>Complete</button> : null}
            </div>
          ) : null}
        </div>
      )
    })
  }

  return (
    <div >
      <div className='row'>
        <div className='list-item list-title'>Date Submitted</div>
        <div className='list-item list-title'>Subject</div>
      </div>
      { (admin === false && !props.open) ? mapIt(myList) : null}
      {
        (admin === false && props.open) ? (
          <div>
            <h2>Open Requests</h2>
            {mapIt(myList)}
          </div>
        ) : null
      }
      {
        (admin === true && !props.open) ? (
          <div>
            <h2>Open Requests:</h2>
            {mapIt(openList)}
          </div>) : null
      }
      {
        (admin === true && !props.open) ? (
          <div>
            <h2>Closed Requests:</h2>
            {mapIt(closedList)}
          </div>) : null
      }
      {
        (admin === true && props.open) ? (
          <div>
            <h2>Open Requests:</h2>
            {mapIt(openList)}
          </div>) : null
      }
    </div >
  )
}

function mapStateToProps(state) {
  return {
    email: state.user.email,
    user_id: state.user.user_id,
    admin: state.user.admin,
    approved: state.user.approved,
    prop_id: state.user.prop_id
  }
}

export default connect(mapStateToProps)(MaintReqList)