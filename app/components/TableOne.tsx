"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/navigation';
import { Tooltip } from '@mui/material';
import { DialogModal } from './DialogModal';
import { unRegisterEvent } from '../utils/api';

interface Event {
    _id: string;
    title: string;
    description: string;
    startDateTime: string;
    endDateTime?: string;
    location: string;
    media: string[];
    category: string;
    organizer: {
        name: string;
        phone: string;
        email: string;
    };
    attendees: string[];
    status: string;
}

interface TableProps {
    events: Event[];
    currentPage: number;
    totalPages: number;
    currentTab: string;
}

const TableOne: React.FC<TableProps> = ({ events, currentPage, totalPages, currentTab }) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const [isUnregistered, setIsUnregistered] = useState(false);
    const [token, setToken] = useState<{}>({ value: "" });
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        setToken({ value: storedToken });
        if (isDeleted) {
            setTimeout(() => setIsDeleted(false), 3000);  // Hide alert after 3 seconds
        }
        if (isUnregistered) {
            setTimeout(() => setIsUnregistered(false), 3000);  // Hide alert after 3 seconds
        }
    }, [isDeleted, isUnregistered]);
    const router = useRouter();
    const formatDate = (dateToFormat: string) => {
        let dateStr = dateToFormat.replace("K", "");
        const date = new Date(dateStr);
        return date.toLocaleString();
    };
    const tabName = (currentTab === 'myEvents') ? 'My Events' : 'Registered Events';
    const handleEdit = (event: Event) => { router.push(`/Events/Update/${event._id}`) }
    const handleView = (event: Event) => { router.push(`/Events/${event._id}`) }
    const handleUnregister = async (event: Event) => {
        const response = await unRegisterEvent(token, event._id);
        if (!response.ok) {
            console.log('Failed to delete event');
        } else {
            console.log('Event deleted successfully');
            setIsUnregistered(true);
            router.refresh();
        }
    }

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            {isDeleted && (
                <div role="alert" className="fixed left-1/2 top-1/2  transform -translate-x-1/2 -translate-y-1/2 z-10 alert alert-warning w-80">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Deleted event successfully.</span>
                </div>
            )}
            {isUnregistered && (
                <div role="alert" className="fixed left-1/2 top-1/2  transform -translate-x-1/2 -translate-y-1/2 z-10 alert alert-info w-80">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>You have successfully unregistered from this event.</span>
                </div>
            )}
            <h4 className="mb-6 text-xl font-semibold text-black">{tabName}</h4>
            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Event</h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Date</h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Location</h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">{tabName === 'My Events' ? 'No. of Attendees' : 'Status'}</h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">Action</h5>
                    </div>
                </div>
                {events.map((event, key) => (
                    <div
                        className={`grid grid-cols-3 sm:grid-cols-5 ${key === events.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"
                            }`}
                        key={event._id}
                    >
                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                            <p className="hidden text-black sm:block">{event.title}</p>
                        </div>
                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black">{formatDate(event.startDateTime)}</p>
                        </div>
                        <div className="flex items-center p-2.5 xl:p-5">
                            <p className="text-black">{event.location}</p>
                        </div>
                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-black">{tabName === 'My Events' ? event?.attendees?.length : event?.status || "N/A"}</p>
                        </div>
                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <div className='flex p-2'>
                                {tabName === 'My Events' ? (
                                    <Tooltip title="Edit"><EditIcon onClick={() => handleEdit(event)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="View">
                                        <VisibilityIcon
                                            onClick={() => { handleView(event) }
                                            }
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </Tooltip>
                                )}
                            </div>
                            <div className='flex p-2'>
                                {tabName === 'My Events' ? (
                                    <Tooltip title="Delete">
                                        <DeleteIcon
                                            onClick={() => {
                                                const modal: HTMLElement | null = document.getElementById(event._id);
                                                if (modal instanceof HTMLDialogElement) { modal.showModal() }
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="Unregister">
                                        <BookmarkRemoveIcon
                                            onClick={() => {
                                                const modal: HTMLElement | null = document.getElementById(event._id);
                                                if (modal instanceof HTMLDialogElement) { modal.showModal() }
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    </Tooltip>
                                )}
                            </div>
                        </div>
                        <DialogModal token={token} event={event} tabName={tabName} isDeleted={isDeleted} setIsDeleted={setIsDeleted} isUnregistered={isUnregistered} setIsUnregistered={setIsUnregistered}/>
                    </div>
                )) || <p>No events found</p>}
            </div>
            {/* Pagination controls */}
            {totalPages > 1 && (
                <div className="mt-4 flex justify-center">
                    <div className="join grid grid-cols-2 gap-4">
                        <Link
                            href={`?tab=${currentTab}&page=${currentPage - 1}`}
                            className={`join-item btn btn-outline ${currentPage === 1 ? "btn-disabled" : ""} text-sm px-3 py-1`}
                        >
                            Previous
                        </Link>
                        <Link
                            href={`?tab=${currentTab}&page=${currentPage + 1}`}
                            className={`join-item btn btn-outline ${currentPage === totalPages ? "btn-disabled" : ""} text-sm px-3 py-1`}
                        >
                            Next
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableOne;
