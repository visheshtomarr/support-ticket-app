import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTickets, reset } from "../features/ticket/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function Tickets() {
    const { tickets, isLoading, isSuccess } = useSelector((state) => 
        state.ticket
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTickets());
    }, [dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div>
            <h1>Tickets</h1>
        </div>
    )
}

export default Tickets;
