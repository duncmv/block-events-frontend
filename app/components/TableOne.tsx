"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { useRouter } from "next/navigation";
import { Tooltip } from "@mui/material";
import { DialogModal } from "./DialogModal";
import EventModal from "./EventModal";

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

interface TableProps {
  events: Event[];
  currentPage: number;
  totalPages: number;
  currentTab: string;
  totalEvents: number;
}

const TableOne: React.FC<TableProps> = ({
  events,
  currentPage,
  totalPages,
  currentTab,
  totalEvents
}) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isUnregistered, setIsUnregistered] = useState(false);
  const [token, setToken] = useState<{}>({ value: "" });
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken({ value: storedToken });
    if (isDeleted) {
      setTimeout(() => setIsDeleted(false), 3000); // Hide alert after 3 seconds
    }
    if (isUnregistered) {
      setTimeout(() => setIsUnregistered(false), 3000); // Hide alert after 3 seconds
    }
  }, [isDeleted, isUnregistered]);
  const router = useRouter();

  const formatDate = (dateToFormat: string) => {
    let dateStr = dateToFormat.replace("K", "");
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  const tabName = currentTab === "myEvents" ? "My Events" : "Registered Events";

  const handleEdit = (event: Event) => {
    router.push(`/Events/Update/${event._id}`);
  };

  const handleView = (event: Event) => {
    router.push(`/Events/${event._id}`);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {/* Alerts */}
      {isDeleted && (
        <div
          role="alert"
          className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 alert alert-warning w-80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Deleted event successfully.</span>
        </div>
      )}
      {isUnregistered && (
        <div
          role="alert"
          className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 alert alert-info w-80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>You have successfully unregistered from this event.</span>
        </div>
      )}
      {/* Table Title */}
      <h4 className="mb-6 text-xl font-semibold text-black">{tabName}</h4>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="font-medium uppercase text-sm md:text-base">
              Events (<span className="font-bold text-primary">{totalEvents}</span>)
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="font-medium uppercase text-sm md:text-base">
              Date
            </h5>
          </div>
          <div className="p-2.5 xl:p-5">
            <h5 className="font-medium uppercase text-sm md:text-base">
              Location
            </h5>
          </div>
          <div className="hidden p-2.5 sm:block xl:p-5">
            <h5 className="font-medium uppercase text-sm md:text-base">
              {tabName === "My Events" ? "Attendees" : "Status"}
            </h5>
          </div>
          <div className="hidden p-2.5 sm:block xl:p-5">
            <h5 className="font-medium uppercase text-sm md:text-base">
              Action
            </h5>
          </div>
        </div>
        {events.map((event, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${key === events.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
              }`}
            key={event._id}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="text-black">{event.title}</p>
            </div>
            <div className="flex items-center  p-2.5 xl:p-5">
              <p className="text-black">{formatDate(event.startDateTime)}</p>
            </div>
            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black">{event.location}</p>
            </div>
            <div className="hidden items-center p-2.5 sm:flex xl:p-5">
              <p className="text-black">
                {tabName === "My Events"
                  ? event?.attendees?.length
                  : event?.status || "N/A"}
              </p>
            </div>
            <div className="hidden items-center p-2.5 sm:flex xl:p-5">
              <div className="flex p-2">
                {tabName === "My Events" ? (
                  <Tooltip title="Edit">
                    <EditIcon
                      className="hover:text-red-900"
                      onClick={() => handleEdit(event)}
                      style={{ cursor: "pointer" }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="View">
                    <VisibilityIcon
                      className="hover:text-red-900"
                      onClick={() => {
                        const modal = document.getElementById(event._id);
                        if (modal instanceof HTMLDialogElement) {
                          modal.showModal();
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </Tooltip>
                )}
              </div>
              <div className="flex p-2">
                {tabName === "My Events" ? (
                  <Tooltip title="Delete">
                    <DeleteIcon
                      className="hover:text-red-900"
                      onClick={() => {
                        const modal: HTMLElement | null =
                          document.getElementById(event._id + "dialog");
                        if (modal instanceof HTMLDialogElement) {
                          modal.showModal();
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Unregister">
                    <PersonRemoveIcon
                      className="hover:text-red-900"
                      onClick={() => {
                        const modal: HTMLElement | null =
                          document.getElementById(event._id + "dialog");
                        if (modal instanceof HTMLDialogElement) {
                          modal.showModal();
                        }
                      }}
                      style={{ cursor: "pointer" }}
                    />
                  </Tooltip>
                )}
              </div>
            </div>
            <DialogModal
              token={token}
              event={event}
              tabName={tabName}
              isDeleted={isDeleted}
              setIsDeleted={setIsDeleted}
              isUnregistered={isUnregistered}
              setIsUnregistered={setIsUnregistered}
            />
            <EventModal event={event} register={true} setRegister={null} />
          </div>
        ))}
      </div>
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <div className="grid grid-cols-2 gap-4">
            <Link
              href={`?tab=${currentTab}&page=${currentPage - 1}`}
              className={`btn btn-outline ${currentPage === 1 ? "btn-disabled" : ""
                } text-sm px-3 py-1`}
            >
              Previous
            </Link>
            <Link
              href={`?tab=${currentTab}&page=${currentPage + 1}`}
              className={`btn btn-outline ${currentPage === totalPages ? "btn-disabled" : ""
                } text-sm px-3 py-1`}
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
