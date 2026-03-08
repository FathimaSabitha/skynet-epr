import { useEffect, useState } from "react";
import { api } from "../api/api";
import type { Person } from "../type";

type Props = {
  onSelect: (person: Person) => void;
};

type RoleFilter = "" | "student" | "instructor";

export default function PeopleList({ onSelect }: Props) {
  const [people, setPeople] = useState<Person[]>([]);
  const [role, setRole] = useState<RoleFilter>("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPeople = async () => {
      const query = new URLSearchParams();

      if (role) query.append("role", role);
      if (search) query.append("search", search);

      const res = await api.get<Person[]>(`/api/people?${query.toString()}`);

      setPeople(res.data);
    };

    fetchPeople();
  }, [role, search]);

  return (
    <div className="p-6 border-r h-screen bg-white">
      <h2 className="text-lg font-semibold mb-4">People</h2>

      <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setRole("")}
          className={`flex-1 py-1 text-sm rounded-md ${role === "" ? "bg-white shadow" : ""}`}
        >
          All
        </button>

        <button
          onClick={() => setRole("student")}
          className={`flex-1 py-1 text-sm rounded-md ${role === "student" ? "bg-white shadow" : ""}`}
        >
          Students
        </button>

        <button
          onClick={() => setRole("instructor")}
          className={`flex-1 py-1 text-sm rounded-md ${role === "instructor" ? "bg-white shadow" : ""}`}
        >
          Instructors
        </button>
      </div>

      <input
        placeholder="Search people..."
        className="w-full mb-4 px-3 py-2 border rounded-lg text-sm"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div>
        {people.map((p) => (
          <div
            key={p.id}
            onClick={() => onSelect(p)}
            className="p-3 rounded-xl hover:bg-gray-100 transition cursor-pointer mb-2"
          >
            <div className="flex justify-between">
              <div className="font-medium">{p.name}</div>

              <span className="text-xs px-2 py-0.5 bg-gray-200 rounded-full">
                {p.role}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
