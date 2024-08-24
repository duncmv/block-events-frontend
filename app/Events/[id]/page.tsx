"use client";
import { notFound } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { checkAuth } from '@/app/utils/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type EventPageProps = {
    params: {
        id: string;
    };
};

export default function EventPage({ params }: EventPageProps) {
    const { currentUser, isAuthenticated } = useContext(AuthContext);
    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');

        const checkStatus = async () => {
            if (!token) {
                console.log("Auth Status: Not logged in");
                console.log("isAuthenticated:", isAuthenticated);

                // window.location.href = ("/Login");
            }
            const status: boolean = await checkAuth(token) ?? false;
            if (status) {
                console.log("Auth Status: Logged in");
                fetchEvent();
            } else {
                console.log("Auth Status: Not logged in");
                router.push("/Login");
                return (
                    <div>
                        Please login to access this page.
                    </div>
                )
            }
        }
        const fetchEvent = async () => {
            try {
                // const token = cookies().get('jwt');
                const response = await fetch(`http://localhost:3300/api/events/${params.id}`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    notFound();
                }

                const eventData = await response.json();
                setEvent(eventData);
            } catch (error) {
                console.error('Error fetching event:', error);
                notFound();
            } finally {
                setLoading(false);
            }
        };
        if (isAuthenticated) {
            fetchEvent();
        } else {
            checkStatus();
            // router.push("/Login");
        }
    }, [params.id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <span className="loading loading-spinner text-primary loading-lg"></span>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-xl font-semibold">Event not found.</div>
            </div>
        );
    }

    const mediaUrl = 'http://localhost:3300/media/';
    const eventImage = event.media ? mediaUrl + event.media : '/default-event.jpg';

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative bg-white w-[90%] h-[90%] md:w-[70%] md:h-[70%] rounded-lg shadow-lg overflow-y-auto">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
                    onClick={() => window.location.href = "/"}
                    aria-label="Close"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col md:flex-row h-full">
                    {/* Image Section */}
                    <div className="md:w-1/2 w-full h-64 md:h-full">
                        <img
                            src={eventImage}
                            alt="Event Image"
                            className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="md:w-1/2 w-full p-6 flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">{event.title}</h1>
                            <p className="text-gray-700 mb-4">{event.description}</p>

                            <div className="flex items-center text-gray-600 mb-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-6 mr-2 text-red-900"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                    />
                                </svg>
                                <span>{event.location}</span>
                            </div>

                            <div className="flex items-center text-gray-600 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2 text-red-900">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>

                                <span>
                                    {new Date(event.startDateTime).toLocaleString(undefined, {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </div>

                            {event.endDateTime && (
                                <div className="flex items-center text-gray-600 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2 text-red-900">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                                    </svg>

                                    <span>
                                        {new Date(event.endDateTime).toLocaleString(undefined, {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                            )}

                            <div className="flex items-center text-gray-600 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2 text-red-900">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                                </svg>

                                <span>{event.category}</span>
                            </div>

                            <div className="flex items-center text-gray-600 mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2 text-red-900">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>

                                <span>{event.organizer.name}</span>
                            </div>

                            <div className="flex items-center text-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-6 mr-2 text-red-900"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                    />
                                </svg>
                                <span>{event.organizer.email}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="m-6 flex flex-row justify-center">
                            <Link
                                href={"/Dashboard"}
                                className="m-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-red-900 transition duration-300 h-min"
                                >
                                Dashboard
                            </Link>
                            <Link
                                href={"/Events"}
                                className="m-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-red-900 transition duration-300 h-min"
                                >
                                Explore Events
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
