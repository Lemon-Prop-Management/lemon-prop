import React from 'react'

const RequestAccess = props => {
      return (
            <div className="popup">
                  <p>Fill out your information below and we'll
                  send you an activation link via email. To
                  best match your account, please use the
                  same information provided to your Property
                  Manager.</p>
                  <form>
                        <input placeholder="First name" type="text" />
                        <input placeholder="Last name" type="text" />
                        <input placeholder="Phone Number" type="text" />
                        <input placeholder="Email" type="text" />
                        <input placeholder="Password" type="password" />
                        <input type="radio" id="pets" name="pets" value="pets" />
                        <label for="pets">Pets?</label>
                        <button onClick="render-RequestSubmitted">Submit</button>
                  </form>
            </div>
      )
}

export default RequestAccess