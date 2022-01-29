import * as types from "./actionType";
import axios from "axios";

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users,
});

const userDeleted = () => ({
  type: types.DELETE_USERS,
});

export const loadUsers = () => {
  return function (dispatch) {
    axios
      .get(`https://reqres.in/api/users?page=1`)
      .then((res) => {
        console.log(res);
        dispatch(getUsers(res.data.data));
      })
      .catch((error) => console.log(error));
  };
};

export const deleteUser = (id) => {
  return function (dispatch) {
    axios
      .delete(`https://reqres.in/api/users?page=1/id=${id}`)
      .then((res) => {
        console.log(res);
        dispatch(userDeleted());
        dispatch(loadUsers());
      })
      .catch((error) => console.log(error));
  };
};
