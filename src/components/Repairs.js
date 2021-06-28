import React from "react"
import { NavBar } from "./nav/NavBar";
import { ApplicationViews } from "./ApplicationViews";
import "./Repairs.css"

export const Repairs = () => {
    return (
        <>
            <NavBar />
            <h1>Honey Rae's Repair Shop</h1>
            <ApplicationViews />
        </>
    )
}