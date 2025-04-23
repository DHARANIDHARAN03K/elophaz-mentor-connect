
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { mentors, colleges } from "@/utils/data";

const StudentDashboard: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);

  const filteredColleges = colleges.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const mentorsForCollege = selectedCollege
    ? mentors.filter(m => m.college === selectedCollege)
    : [];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8 text-elophaz-primary">Student Dashboard</h1>

      {/* College search */}
      <section className="mb-8">
        <h2 className="font-semibold mb-2">Search Colleges</h2>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Type to search for colleges..."
          className="px-4 py-2 border rounded w-full mb-4"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredColleges.length === 0 && (
            <div className="col-span-3 text-gray-500">No colleges found.</div>
          )}
          {filteredColleges.map(college => (
            <button
              className={`px-4 py-2 rounded border ${selectedCollege === college.name ? "bg-elophaz-primary/80 text-white" : "bg-white"} hover:bg-elophaz-primary/20`}
              key={college.name}
              onClick={() => setSelectedCollege(college.name)}
            >
              {college.name}
            </button>
          ))}
        </div>
      </section>

      {/* Mentors in college */}
      <section>
        <h2 className="font-semibold mb-2">
          {selectedCollege ? `Mentors from ${selectedCollege}` : "Choose a college to find mentors"}
        </h2>
        <div className="space-y-4">
          {selectedCollege && mentorsForCollege.length === 0 && (
            <div className="text-gray-500">No mentors found for this college.</div>
          )}
          {mentorsForCollege.map(mentor => (
            <div
              key={mentor.id}
              className="border rounded-lg p-4 bg-white flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img src={mentor.avatar} alt={mentor.name} className="w-12 h-12 rounded-full" />
                <div>
                  <p className="font-medium">{mentor.name}</p>
                  <p className="text-gray-500 text-sm">{mentor.department} • {mentor.year}</p>
                </div>
              </div>
              <Button size="sm" className="bg-elophaz-primary text-white">Request Connection</Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
