
import React from "react";
import { Button } from "@/components/ui/button";

const MentorDashboard: React.FC = () => {
  // Placeholder static "requests", "connections", "sessions". Replace with real data after Supabase integration!
  const connectionRequests = [
    { id: 1, student: "Amit Sharma", college: "IIT Delhi", status: "pending" },
    { id: 2, student: "Sara Khan", college: "IIT Bombay", status: "pending" }
  ];
  const finishedConnections = [
    { id: 3, student: "Priya Patel", college: "IIT Madras" }
  ];
  const bookedSessions = [
    { id: 4, student: "Rahul Verma", time: "2024-04-24 3:00PM" }
  ];

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8 text-elophaz-primary">Mentor Dashboard</h1>
      
      <section className="mb-8">
        <h2 className="font-semibold text-lg mb-2">Connection Requests</h2>
        <div className="space-y-4">
          {connectionRequests.length === 0 ? (
            <div className="text-gray-500">No new connection requests.</div>
          ) : (
            connectionRequests.map(req => (
              <div
                key={req.id}
                className="border rounded-lg p-4 bg-white flex justify-between items-center"
              >
                <div>
                  <div>
                    <span className="font-medium">{req.student}</span> wants to connect ({req.college})
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-elophaz-primary text-white">Accept</Button>
                  <Button size="sm" variant="outline" className="border-elophaz-primary text-elophaz-primary">Decline</Button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="font-semibold text-lg mb-2">Finished Connections</h2>
        <div className="space-y-2">
          {finishedConnections.length === 0 ? (
            <div className="text-gray-500">No finished connections yet.</div>
          ) : (
            finishedConnections.map(con => (
              <div key={con.id} className="border rounded-lg p-4 bg-gray-50">
                Connected with <span className="font-medium">{con.student}</span> ({con.college})
              </div>
            ))
          )}
        </div>
      </section>

      <section>
        <h2 className="font-semibold text-lg mb-2">Booked Sessions</h2>
        <div className="space-y-2">
          {bookedSessions.length === 0 ? (
            <div className="text-gray-500">No upcoming sessions booked.</div>
          ) : (
            bookedSessions.map(sess => (
              <div key={sess.id} className="border rounded-lg p-4 bg-blue-50">
                Session with <span className="font-medium">{sess.student}</span>: {sess.time}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default MentorDashboard;

