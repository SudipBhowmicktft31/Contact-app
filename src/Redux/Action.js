import { ADD_DATA, DELETE_DATA, EDIT_DATA, FETCH_DATA } from "./Type";

//Action Creator Function

//fetch Data
export const fetchData = (payload) => {
  return {
    type: FETCH_DATA,
    payload: payload,
  };
};
export const addData = (payload) => {
  return {
    type: ADD_DATA,
    payload: payload,
  };
};
export const editData = (payload) => {
  return {
    type: EDIT_DATA,
    payload: payload,
  };
};
export const deleteData = (payload) => {
  return {
    type: DELETE_DATA,
    payload: payload,
  };
};
