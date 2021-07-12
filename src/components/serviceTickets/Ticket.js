import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"

export const Ticket = () => {
    const [ticket, set] = useState({})
    const [employees, syncEmployees] = useState([])
    const { ticketId } = useParams()
    const history = useHistory()


    useEffect(() => {
        fetch(`http://localhost:8088/serviceTickets/${ticketId}?_expand=customer&_expand=employee`)
            .then(res => res.json())
            .then(set)
    }, [ticketId])

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees`)
                .then(res => res.json())
                .then(syncEmployees)
        }, []
    )

    return (
        <>
            <h3>{ticket.description}</h3>
            <div>Submitted by {ticket.customer?.name}</div>
            <div>Assigned to
                <select
                    value={ticket.employeeId}
                    onChange={
                    evt => {
                        const copy = { ...ticket }
                        copy.employeeId = parseInt(evt.target.value)
                        delete copy.customer
                        delete copy.employee

                        fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(copy)
                        }).then(() => {
                            set(copy)
                            history.push(`/tickets/${ticketId}`)
                        })
                    }
                }>
                    {
                        employees.map(e => <option value={e.id}>{e.name}</option>)
                    }
                </select>
            </div>
        </>
    )
}