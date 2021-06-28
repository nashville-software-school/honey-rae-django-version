import React from "react"
import { CustomerList } from "./customers/CustomerList";
import { EmployeeList } from "./employees/EmployeeList";

export const Repairs = () => {
    return (
        <>
            <h1>Honey Rae's Repair Shop</h1>

            <h2>Customer List</h2>
            <CustomerList />

            <h2>Employee List</h2>
            <EmployeeList />
        </>
    )
}