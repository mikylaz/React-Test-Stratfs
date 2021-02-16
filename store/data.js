import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_DATA = 'GET_DATA'
const ADD_DATA = 'ADD_DATA'
const DELETE_DATA = 'DELETE_DATA'
/**
 * ACTION CREATORS
 */
const getData = data => ({type: GET_DATA, data})

export const postData = newData =>({
  type: ADD_DATA,
  newData
})

export const deleteData = ids => ({
  type: DELETE_DATA,
  ids
})
// /**
//  * THUNK CREATORS
//  */
export const fetchData = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json')
      console.log(data)
      dispatch(getData(data))
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * INITIAL STATE
 */
const defaultData = []

/**
 * REDUCER
 */
export default function(state = defaultData, action) {
  switch (action.type) {
    case GET_DATA:
      return action.data
    case ADD_DATA:
      return  [...state, action.newData]
    case DELETE_DATA:
      for(let i = 0; i<action.ids.length; i++){
        state = state.filter(elm => elm.id!==action.ids[i])
      }
      return state
    default:
      return state
  }
}
