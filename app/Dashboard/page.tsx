import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "../components/Sidebar";
import TableOne from "../components/TableOne";
import NotificationSidebar from "../components/NotificationSidebar";
import { getMyEvents, getRegisteredEvents } from "../utils/api";
import EllipsisMenu from "../components/EllipsisMenu";

const ITEMS_PER_PAGE = 6;

const Dashboard = async ({ searchParams }: any) => {
  const token = cookies().get("jwt");

  if (!token || token.value === "loggedout") {
    redirect("/Login");
  }

  const myEvents = await getMyEvents(token);
  const registeredEvents = await getRegisteredEvents(token);

  const currentTab = searchParams.tab || "myEvents";
  const currentPage = parseInt(searchParams.page) || 1;

  const displayedEvents =
    currentTab === "myEvents"
      ? myEvents.myEvents
      : registeredEvents.userRegisteredEvents;

  const totalPages = Math.ceil(displayedEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = displayedEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col h-full">
      {/* Main Content Area */}
      <div className="flex-1 flex flex-row items-stretch px-4 py-2">
        {/* Left Sidebar */}
        <div className="w-64 flex-shrink-0 bg-white p-4 shadow-md border border-gray-300 rounded-lg hidden custom-sidebar">
          <Sidebar currentTab={currentTab} />
        </div>

        <div className="block custom-ellipsis">
          <EllipsisMenu currentTab={currentTab} />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 mx-4 bg-white border shadow-md border-gray-300 rounded-lg">
          <TableOne
            events={paginatedEvents}
            currentPage={currentPage}
            totalPages={totalPages}
            currentTab={currentTab}
          />
        </main>

        {/* Right Sidebar (Notification Sidebar)
        <div className="w-64 flex-shrink-0 bg-white p-4 shadow-md border border-gray-300 rounded-lg">
          <NotificationSidebar />
        </div>*/}
      </div>
    </div>
  );
};

export async function generateStaticParams() {
  return [{ tab: "myEvents" }, { tab: "registeredEvents" }];
}

export default Dashboard;
