import { notFound } from 'next/navigation';

type EventPageProps = {
    params: {
        id: string;
    };
};

export default async function EventPage({ params }: EventPageProps) {
    const response = await fetch(`http://localhost:3300/api/events/${params.id}`, {
        method: 'GET',
        credentials: 'include',
    });
    const event = await response.json();
    if (!event) {
        notFound();
    }
    return (
        <div>
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>{event.startDateTime}</p>
            <p>{event.endDateTime}</p>
            <p>{event.location.address}</p>
            <p>{event.location.city}</p>
            <p>{event.location.state}</p>
            <p>{event.location.zip_code}</p>
            <p>{event.location.googleMapsLink}</p>
            <p>{event.category}</p>
        </div>
    );
}