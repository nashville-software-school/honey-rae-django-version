import React, { useEffect, useState } from "react"
import { fetchIt } from "../../utils/fetchIt"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])
    const [totalCustomerMessage, updateMessage] = useState("")

    useEffect(
        () => {
            fetchIt("http://localhost:8000/customers")
                .then(setCustomers)
                .catch(() => setCustomers([]))
        }, []
    )

    useEffect(
        () => {
            if (customers.length === 1) {
                updateMessage("You have 1 customer")
            }
            else {
                updateMessage(`You have ${customers.length} customers`)
            }
        },
        [customers]
    )

    return (
        <>
            <h2>Customer List</h2>
            <div>{totalCustomerMessage}</div>
            {
                customers.map(
                    (customerObject) => {
                        return <p key={`customer--${customerObject.id}`}>{customerObject.full_name}</p>
                    }
                )
            }
        </>
    )
}