import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { EmployeeViews } from "./EmployeeViews";
import { EmployeeNavBar } from "./nav/EmployeeNavBar";
import "./Repairs.css";
import { isStaff } from "../utils/isStaff";
import { EmployeeRegister } from "./auth/EmployeeRegister";

export const Repairs = () => {

  return (
    <>
      <Route
        render={() => {
          if (localStorage.getItem("honeyrae")) {
            if (isStaff()) {
              return <>
                  <EmployeeNavBar />
                  <EmployeeViews />
                </>
            }
            else {
              return <>
                  <NavBar />
                  <ApplicationViews />
                </>
            }
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />

      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/registeremployee">
        <EmployeeRegister />
      </Route>
    </>
  )
}