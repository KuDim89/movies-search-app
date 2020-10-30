import React from 'react';
import {useAuth} from "../../hooks/use-auth";
import {Redirect} from "react-router-dom";

export default function Info() {
  const authentication = useAuth();
  return (
      authentication
      ? <>
          <h1>Info</h1>
        </>
      : <Redirect to="/" />
  )
};