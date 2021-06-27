import React from "react"
import "./Tickets.css"

export const TicketFooter = ({ ticket }) => {

    const ticketStatus = () => {
        if (ticket.date_completed === null) {
            if (ticket.employee) {
                return <span className="status--in-progress">In progress</span>
            }
            return <span className="status--new">Unclaimed</span>
        }
        return <span className="status--completed">Done</span>
    }

    return <footer className="ticket__footer">
        <div className="ticket__employee">
            {
                ticket.date_completed === null
                    ? `Assigned to ${ticket?.employee?.full_name ?? "no one, yet"}`
                    : `Completed by ${ticket?.employee?.full_name} on ${ticket.date_completed}`
            }
        </div>
        <div> {ticketStatus()} </div>
    </footer>
}
