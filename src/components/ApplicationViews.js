import React from "react"
import { Route } from "react-router-dom"
import { Ticket } from "./serviceTickets/Ticket";
import { TicketForm } from "./serviceTickets/TicketForm";
import { TicketList } from "./serviceTickets/TicketList";

export const ApplicationViews = () => {

    return (
        <>
            <Route exact path="/">
                <TicketList />
            </Route>

            <Route exact path="/tickets">
                <TicketList />
            </Route>

            <Route exact path="/tickets/:ticketId(\d+)">
                <Ticket />
            </Route>

            <Route path="/tickets/create">
                <TicketForm />
            </Route>
        </>
    )
}
