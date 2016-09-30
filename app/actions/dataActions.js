import { GET_DATA_REQUEST, GET_DATA_SUCCESS, GET_DATA_FAILURE } from '../constants/data'
import fetch from 'isomorphic-fetch'

export function getData () {
  return (dispatch) => {
    dispatch({
      type: GET_DATA_REQUEST
    })

    fetch('data.json', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        return response.json()
      })
      .then(json => {
        dispatch({
          type: GET_DATA_SUCCESS,
          payload: json
        })
      })
      .then(error => {
        if (error) {
          dispatch({
            type: GET_DATA_FAILURE,
            payload: error
          })
        }
      })
  }
}
