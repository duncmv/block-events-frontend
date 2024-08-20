import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

type EventPageProps = {
    params: {
        id: string;
    };
};

export default async function EventPage({ params }: EventPageProps) {
    const token = cookies().get('jwt');
    const response = await fetch(`http://localhost:3300/api/events/${params.id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token?.value}`,
            'Content-Type': 'application/json',
        }
    });
    const event = await response.json();
    if (!event) {
        notFound();
    }
    const mediaUrl = 'http://localhost:3300/media/';
    return (
        <div className="flex flex-col max-w-2xl mx-auto mt-16">
            <div className="flex flex-col md:flex-row md:items-center">
                <div className="w-full md:w-1/2 mr-">
                    <img src={mediaUrl + event.media} alt={event.title} className="w-full h-auto mb-4 md:mb-0" />
                </div>
                <div className="w-full md:w-1/2 p-4">
                    <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
                    <p className="text-gray-600 mb-4">By: <span className='font-bold'>{event.organizer.name}</span></p>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <p className="text-gray-600 mb-4">{event.startDateTime}</p>
                    {event.endDateTime && <p className="text-gray-600 mb-4">{event.endDateTime}</p>}
                    <p className="text-gray-600 mb-4">{event.location}</p>
                    <p className="text-gray-600 mb-4">{event.category}</p>
                </div>
            </div>
        </div>
    );
}
