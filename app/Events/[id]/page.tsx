import React from "react";

const EventDetails = ({ params }) => {
  const id = params.id;
  return <div>EventDetails for id: {id}</div>;
};

export default EventDetails;
