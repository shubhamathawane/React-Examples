import React, { useEffect, useReducer } from "react";
import axios from "axios";

const ACTIONS = {
  CALL_API: "call-api",
  SUCCESS: "success",
  ERROR: "error",
};

const userDetailsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CALL_API: {
      return {
        ...state,
        loading: true,
      };
    }
    case ACTIONS.SUCCESS: {
      return {
        ...state,
        loading: false,
        userDetails: action.data,
      };
    }
    case ACTIONS.ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    }
    default:{
        return state;
    }
  }
};

const initialState = {
  userDetails: [],
  loading: false,
  error: null,
};

const User= () => {
  const [state, dispatch] = useReducer(userDetailsReducer, initialState);
  const {userDetails, loading, error }= state;

  useEffect(() => {
    dispatch({ type: ACTIONS.CALL_API });
    const getUsers = async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      if (res.status == 200) {
        dispatch({ type: ACTIONS.SUCCESS, data: res.data });
        console.log('Success')
        return;
      }
      dispatch({ type: ACTIONS.ERROR, error: res.error });
      console.log('Failed')
    };
    getUsers();
  }, []);

  return (
    <div>
      <h1>Hello from reducer</h1>
      {loading ? (
        <p>Loading....</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {userDetails.map((user) => (
            <li key={user.id}>
              <h2>{user.id}</h2>
              <h2>{user.name}</h2>
              <hp>{user.email}</hp>
              <br/>
              <hp>{user.phone}</hp>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default User;
