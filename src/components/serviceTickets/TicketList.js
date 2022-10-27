import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { fetchIt } from "../../utils/fetchIt"
import { isStaff } from "../../utils/isStaff"
import { useCondensed } from "./useCondensed"
import { TicketCard } from "./TicketCard"
import "./Tickets.css"

export const TicketList = () => {
    const [active, setActive] = useState("")
    const { toggle, setOriginal, condensed: tickets } = useCondensed({ limit: 40, field: "description" })
    const history = useHistory()

    useEffect(() => {
        fetchIt("http://localhost:8000/tickets")
            .then((tickets) => {
                setOriginal(tickets)
            })
            .catch(() => setOriginal([]))
    }, [])

    useEffect(() => {
        const activeTicketCount = tickets.filter(t => t.date_completed === null).length
        if (isStaff()) {
            setActive(`There are ${activeTicketCount} open tickets`)
        }
        else {
            setActive(`You have ${activeTicketCount} open tickets`)
        }
    }, [tickets])

    const toShowOrNotToShowTheButton = () => {
        if (isStaff()) {
            return ""
        }
        else {
            return <button className="actions__create"
                onClick={() => history.push("/tickets/create")}>Create Ticket</button>
        }
    }

    const filterTickets = (status) => {
        fetchIt(`http://localhost:8000/tickets?status=${status}`)
            .then((tickets) => {
                setOriginal(tickets)
            })
            .catch(() => setOriginal([]))
    }

    return <>
        <div>
            <button onClick={() => filterTickets("done")}>Show Done</button>
            <button onClick={() => filterTickets("all")}>Show All</button>
        </div>
        <div className="actions">{toShowOrNotToShowTheButton()}</div>
        <div className="activeTickets">{active}</div>
        <article className="tickets">
            { tickets.map(ticket => <TicketCard key={`ticket--${ticket.id}`} ticket={ticket} toggle={toggle} />) }
        </article>
    </>
}
