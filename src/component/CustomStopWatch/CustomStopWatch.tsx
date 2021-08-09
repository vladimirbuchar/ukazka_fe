import React from 'react'
import PropTypes from 'prop-types'
import Countdown from 'react-countdown'

export default function CustomStopWatch (props: any) {
  const { time, endTest } = props
  const Completionist = () => <span></span>
  return (
    <Countdown date={Date.now() + (time * 60000)} onComplete={endTest}>
      <Completionist />
    </Countdown>
  )
}

CustomStopWatch.prototype = {
  time: PropTypes.any,
  endTest: PropTypes.func
}
