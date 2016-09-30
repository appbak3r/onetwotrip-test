import { GET_DATA_REQUEST, GET_DATA_SUCCESS, GET_DATA_FAILURE } from '../constants/data'
import { Set } from 'immutable'

const initialState = {
  flights: [],
  fetching: false
}

export default function data (state = initialState, action) {
  switch (action.type) {
    case GET_DATA_REQUEST:
      return { ...state, fetching: true }
    case GET_DATA_SUCCESS:
      let data = action.payload
      let carriers = new Set()
      action.payload.flights.forEach((item) => {
        carriers = carriers.add(item['carrier'])
      })
      data.carriers = carriers
      return { ...state, ...data, fetching: false }
    case GET_DATA_FAILURE:
      return { ...state, fetching: false }
    default:
      return state
  }
}
