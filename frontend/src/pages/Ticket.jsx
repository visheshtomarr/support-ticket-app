import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTicket, closeTicket } from "../features/ticket/ticketSlice";
import { getNotes, reset as notesReset } from "../features/notes/noteSlice";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";

function Ticket() {
    const { ticket, isLoading, isError, message } = useSelector(
        (state) => state.ticket 
    );
    
    const { notes, isLoading: notesIsLoading } = useSelector(
        (state) => state.note 
    );

    const { ticketId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(getTicket(ticketId));
        dispatch(getNotes(ticketId));
    }, [isError, message, dispatch, ticketId])

    // Function to handle ticket close.
    const onTicketClose = () => {
        dispatch(closeTicket(ticketId));
        toast.success("Ticket Closed!");
        navigate("/tickets");
    }

    if (isLoading || notesIsLoading) {
        return <Spinner /> 
    }

    if (isError) {
        return <h3>Something went wrong</h3>
    }

    return (
        <div className="ticket-page">
            <header className="ticket-header">
                <BackButton url="/tickets" />
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>
                        {ticket.status}
                    </span>
                </h2>
                <h3>
                    Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-UK")}
                </h3>
                <h3>Product: {ticket.product}</h3>
                <hr />
                <div className="ticket-desc">
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>Notes</h2>
            </header>
            
            {notes.map((note) => (
                <NoteItem key={note._id} note={note} />
            ))}

            {ticket.status !== "closed" && (
                <button className="btn btn-block btn-danger" onClick={onTicketClose}>
                    Close Ticket
                </button>
            )}
        </div>
    )
}

export default Ticket;
