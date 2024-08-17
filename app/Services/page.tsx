export default function Services() {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-4xl font-bold mb-8">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold mb-4">
            Event Creation
          </h3>
          <p className="text-gray-600 mb-8">
            Create events just by filling out a few details and uploading a few
            photos. Our platform makes it easy to create and manage events
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold mb-4">
            Event Management
          </h3>
          <p className="text-gray-600 mb-8">
            Manage your events with ease. Our platform gives you complete control
            over your event, from tickets sales to attendees management
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold mb-4">
            Event Discovery
          </h3>
          <p className="text-gray-600 mb-8">
            Discover new events and events near you. Our platform makes it easy
            for you to explore and find events that match your interests
          </p>
        </div>
      </div>
    </div>
  );
}
