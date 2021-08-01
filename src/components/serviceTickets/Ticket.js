import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const Ticket = () => {
    const [ticket, set] = useState({})
    const [employees, syncEmployees] = useState([])
    const { ticketId } = useParams()

    const fetchTicket = () => {
        return fetch(`http://localhost:8088/serviceTickets/${ticketId}?_expand=customer&_expand=employee`)
            .then(res => res.json())
            .then(set)
    }

    useEffect(() => {
        fetchTicket()
    }, [ ticketId ])

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
                            const updatedTicket = {
                                customerId: ticket.customerId,
                                employeeId: parseInt(evt.target.value),
                                description: ticket.description,
                                emergency: ticket.emergency,
                                dateCompleted: new Date().toLocaleDateString("en-US")
                            }

                            fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(updatedTicket)
                            }).then(() => {
                                fetchTicket()
                            })
                        }
                    }>
                    {
                        employees.map(e => <option key={`employee--${e.id}`} value={e.id}>{e.name}</option>)
                    }
                </select>
            </div>
        </>
    )
}
