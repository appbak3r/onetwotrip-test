import React from 'react'
import * as dataActions from '../../actions/dataActions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ImmutablePropTypes from 'react-immutable-proptypes'

import CarriersSelect from '../carriers-select'
import FlightCard from '../flight-card'

import styles from './styles.sass'

class Main extends React.Component {

  state = { currentCarrier: null }

  componentDidMount () {
    this.setCurrentCarrier = this.setCurrentCarrier.bind(this)
    this.props.getData()
  }

  setCurrentCarrier (event) {
    this.setState({ currentCarrier: event.target.value })
  }

  render () {
    const { fetching, carriers, flights } = this.props
    if (fetching) {
      return (<div>loading</div>)
    } else {
      let currentCarrier = this.state.currentCarrier

      let flightCards = flights.filter(f => f.carrier === currentCarrier || !currentCarrier).map((flight) => {
        return <FlightCard key={flight.id} data={flight} />
      })

      return (
        <div>
          <div className={styles.title}>Flights</div>
          <CarriersSelect data={carriers} handleChange={this.setCurrentCarrier} />
          <div className={styles.cardlist}>
            {flightCards}
          </div>
        </div>
      )
    }
  }
}

Main.propTypes = {
  flights: React.PropTypes.array,
  carriers: ImmutablePropTypes.set,
  fetching: React.PropTypes.bool,
  getData: React.PropTypes.func
}

function mapStateToProps (state) {
  return state.data
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(dataActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
