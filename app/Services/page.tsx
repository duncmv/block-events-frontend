const servicesData = [
  {
    title: "Ticket Management",
    description:
      "We offer efficient ticket management services, including online sales, on-site check-ins, and real-time reporting.",
    image: "/ticket.webp",
  },
  {
    title: "Event Planning",
    description:
      "Our event planning team will work with you to ensure every detail of your event is perfectly executed.",
    image: "/mgt.jpg",
  },
  {
    title: "Marketing",
    description:
      "Our marketing services ensure that your event reaches the right audience through targeted campaigns and social media promotion.",
    image: "/marketing.webp",
  },
  {
    title: "Catering",
    description:
      "We provide top-notch catering services with a variety of menu options to satisfy all your guests.",
    image: "/catering.jpg",
  },
  {
    title: "Decor",
    description:
      "Our decor services will transform your event space into a stunning and memorable environment.",
    image: "/decor.jpg",
  },
];

const Services = () => {
  return (
    <div className="p-8 my-4">
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-red-900 mb-4">Our Services</h1>
        <p className="text-lg text-gray-700">
          Welcome to our services page! Here, you can explore the range of
          services we offer. Each service is detailed below, including
          descriptions and images to help you understand what we provide. If you
          have any questions or wish to request a service, feel free to do so
          using the "Request Service" button.
        </p>
      </section>

      <div className="space-y-4">
        {servicesData.map((service, index) => (
          <div key={index} className="collapse collapse-arrow bg-white">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-xl font-bold text-red-900">
              {service.title}
            </div>
            <div className="collapse-content justify-between items-start">
              <div className="w-full lg:w-9/12">
                <p>{service.description}</p>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-auto max-h-48 my-2 object-cover"
                />
              </div>
              <div className="w-full lg:w-3/12 flex items-end">
                <button className="btn btn-primary text-white rounded">
                  Request Service
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
