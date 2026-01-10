import React from 'react'
import Countdown from 'react-countdown'

const registration = () => {
  return (
    <>
            <div className="space">
                <div className="spacehead">
                        <div className="spacetitle">
                            <i></i>
                            <h5>User Registration</h5>
                            <p>Will be closed in<Countdown date={new Date("2026-01-20T10:00:00")}/> </p>
                        </div>
                </div>
            </div>
    </>
  )
}

export default registration
