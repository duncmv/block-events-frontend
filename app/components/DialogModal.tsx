import React, { useState, useEffect } from 'react'
import { deleteEvent, unRegisterEvent } from '../utils/api';
import { useRouter } from 'next/navigation';

interface Event {
    _id: string;
    title: string;
    description: string;
    startDateTime: string;
    endDateTime: string;
    location: string;
    media: string;
    category: string;
    attendees: string[];
    status: string;
    organizer: {
        name: string;
        address: string;
        email: string;
    };
}
interface EventProps {
    event: Event;
    isDeleted: Boolean;
    setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
    isUnregistered: Boolean;
    setIsUnregistered: React.Dispatch<React.SetStateAction<boolean>>;
    tabName: string;
    token: {};
}

export const DialogModal = ({ token, event, tabName, setIsDeleted, setIsUnregistered }: EventProps) => {
    const router = useRouter();
    const handleAction = async () => {
        if (tabName === 'My Events') {
            const response = await deleteEvent(token, event._id);
            // const response = {ok: true};
            if (!response.ok) {
                setIsDeleted(false);
            } else {
                console.log('Event deleted successfully');
                setIsDeleted(true);
                router.refresh();
            }
        } else if (tabName === 'Registered Events') {
            const response = await unRegisterEvent(token, event._id);
            // const response = {ok: true};
            if (!response.ok) {
                setIsUnregistered(false);
            } else {
                console.log('Event Unregistered successfully');
                setIsUnregistered(true);
                router.refresh();
            }
        }
    }
    return (
        <div>
            {/* <button className='btn' onClick={() => document.getElementById(event._id)?.showModal()} type='button'>Open Modal</button> */}
            <dialog id={event._id+"dialog"} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete Event: {event.title}!</h3>
                    <p className="py-4">Are you sure you want to {tabName === 'My Events' ? <strong>delete</strong> : <strong>unregister for</strong>} this event?</p>
                    {tabName === 'My Events' ? <p><span>All attendees will be informed that the Event has been cancelled via Email.</span></p> : null}
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button onClick={handleAction} className="btn btn-secondary mr-5 text-white">{tabName === 'My Events' ? 'Delete' : 'Unregister'}</button>
                            <button className="btn text-black">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}
