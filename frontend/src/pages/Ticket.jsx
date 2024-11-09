import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getTicket, closeTicket } from "../features/ticket/ticketSlice";
import { getNotes, createNote } from "../features/notes/noteSlice";
import { toast } from "react-toastify";
import { FaPlus } from 'react-icons/fa';
import Modal from "react-modal";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";

const customStyles = {
    content: {
      width: '600px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative',
    },
  }
  
  Modal.setAppElement('#root');

function Ticket() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [noteText, setNoteText] = useState("");
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

    // Functions to Open/Close modal.
    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    // Function to handle note submission.
    const handleNoteSubmit = (e) => {
        e.preventDefault();
        dispatch(createNote({ noteText, ticketId }));
        closeModal();
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

            {ticket.status !== "closed" && (
                <button className="btn" onClick={openModal}>
                   <FaPlus /> Add Note 
                </button>
            )}

            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Add Note"
            >
                <h2>Add Note</h2>
                <button className="btn-close" onClick={closeModal}>X</button>
                <form onSubmit={handleNoteSubmit}>
                    <div className="form-group">
                        <textarea 
                            name="noteText" 
                            id="noteText"
                            className="form-control"
                            placeholder="Enter Note text"
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn" type="submit">Submit</button>
                    </div>
                </form>
            </Modal> 
            
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
