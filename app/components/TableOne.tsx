import React from 'react';
import Link from 'next/link';
import { getAttendees } from '../utils/api';

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
    const formatDate = (dateToFormat: string) => {
        let dateStr = dateToFormat.replace("K", "");
        const date = new Date(dateStr);
        return date.toLocaleString();
    };
    const tabName = (currentTab === 'myEvents') ? 'My Events' : 'Registered Events';

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
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
                        key={key}
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
                            <button className="btn btn-neutral">{tabName === 'My Events' ? "Edit" : "View"}</button>
                        </div>
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
