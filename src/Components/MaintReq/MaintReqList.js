import axios from 'axios'
import React, { useRef, useEffect, useState } from 'react'
import { connect } from 'react-redux'
//import { useSelector } from 'react-redux'

// import {loginUser} from '../../redux/reducer'


const MaintReqList = props => {
  //const counter = useSelector((state) => state.counter)

  const didMount = useDidMount()
  const [myList, setMyList] = useState()
  const [openList, setOpenList] = useState()
  const [closedList, setClosedList] = useState([])
  //   const [email, setEmail] = useState(props.email.email)
  const [admin, setAdmin] = useState(props.admin)
  const [user_id, setUserId] = useState(props.user_id)

  function useDidMount() {
    console.log('i am trying to mount here')
    const didMountRef = useRef(true)
    didMountRef.current = false
    return didMountRef.current
  }

  useEffect(() => {
    if (admin === false) {
      console.log('I am a lowly tenant')
      axios.get(`/api/tenant/${user_id}/mr`)
        .then(res => {
          setMyList(res.data)
        })
        .catch(err => console.log(err))
    } else if (admin === true) {
      console.log('I am a manager, yo')
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
    console.log('i am inside the mapIt function')
    array.map((element) => {
      console.log('i am inside the maptrix')
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
      {useDidMount()}
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