import React, { useEffect, useState, useCallback } from "react"
import { useHistory, useParams } from "react-router-dom"
import { fetchIt } from "../../utils/fetchIt"
import { isStaff } from "../../utils/isStaff"

export const Ticket = () => {
    const [ticket, loadTicket] = useState({})
    const [employees, syncEmployees] = useState([])
    const { ticketId } = useParams()
    const history = useHistory()

    const fetchTicket = useCallback(() => {
        return fetchIt(`http://localhost:8000/tickets/${ticketId}`)
            .then(loadTicket)
            .catch(() => loadTicket({}))
    }, [ticketId])

    useEffect(
        () => {
            fetchTicket()
        },
        [ticketId, fetchTicket]
    )

    useEffect(
        () => {
            fetchIt("http://localhost:8000/employees")
                .then(syncEmployees)
                .catch(() => syncEmployees([]))
        }, []
    )

    const deleteTicket = () => {
        fetchIt(
            `http://localhost:8000/tickets/${ticketId}`,
            {
                method: "DELETE"
            }
        ).then(() => history.push("/tickets"))
    }

    const updateTicket = (evt) => {
        const updatedTicket = {...ticket, employee: parseInt(evt.target.value)}

        fetchIt(
            `http://localhost:8000/tickets/${ticketId}`,
            {
                method: "PUT",
                body: JSON.stringify(updatedTicket)
            }
        ).then(fetchTicket)
    }

    const ticketStatus = () => {
        if (ticket.date_completed === null) {
            if (ticket.employee) {
                return <span className="status--in-progress">In progress</span>
            }
            return <span className="status--new">Unclaimed</span>
        }
        return <span className="status--completed">Done</span>
    }

    const employeePicker = (ticket) => {
        if (isStaff()) {
            return <div className="ticket__employee">Assigned to {" "}
                <select
                    value={ticket?.employee?.id}
                    onChange={updateTicket}>
                    <option value="0">Choose...</option>
                    {
                        employees.map(e => <option key={`employee--${e.id}`} value={e.id}>{e.full_name}</option>)
                    }
                </select>
            </div>
        }
        else {
            return <div className="ticket__employee">Assigned to {ticket?.employee?.full_name ?? "no one"}</div>
        }
    }

    return (
        <>
            <section className="ticket">
                <h3 className="ticket__description">Description</h3>
                <div>{ticket.description}</div>

                <footer className="ticket__footer ticket__footer--detail">
                    <div className=" footerItem">Submitted by {ticket.customer?.full_name}</div>
                    <div className="ticket__employee footerItem">
                        {
                            ticket.date_completed === null
                                ? employeePicker(ticket)
                                : `Completed by ${ticket.employee?.name} on ${ticket.date_completed}`
                        }
                    </div>
                    <div className="footerItem">
                        { ticketStatus() }
                    </div>
                    {
                        isStaff()
                            ? ""
                            : <button onClick={deleteTicket}>Delete</button>
                    }
                </footer>

            </section>
        </>
    )
}
