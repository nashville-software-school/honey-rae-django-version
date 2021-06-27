import React, {useState} from "react"
import { useHistory } from "react-router-dom"
import { fetchIt } from "../../utils/fetchIt"

export const TicketForm = () => {

    const [ticket, updateTicket] = useState({
        description: "",
        emergency: false
    })
    const history = useHistory()

    const submitTicket = (evt) => {
        evt.preventDefault()

        fetchIt(
            "http://localhost:8000/tickets",
            { method: "POST", body: JSON.stringify(ticket) }
        )
            .then(() => history.push("/tickets"))
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = {...ticket}
                                copy.description = evt.target.value
                                updateTicket(copy)
                            }
                        }
                        required autoFocus
                        type="text" id="description"
                        className="form-control"
                        placeholder="Brief description of problem"
                         />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input
                        onChange={
                            (evt) => {
                                const copy = {...ticket}
                                copy.emergency = evt.target.checked
                                updateTicket(copy)
                            }
                        }
                        type="checkbox" />
                </div>
            </fieldset>
            <button onClick={submitTicket} className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}