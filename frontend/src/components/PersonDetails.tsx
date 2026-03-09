import { useEffect, useState } from "react";
import { api } from "../api/api";
import type { Person, Epr } from "../type";
import EprModal from "./EprModal";

type Props = {
  person: Person | null;
};

export default function PersonDetails({ person }: Props) {
  const [eprs, setEprs] = useState<Epr[]>([]);
  const [selectedEpr, setSelectedEpr] = useState<Epr | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [summary, setSummary] = useState<any>(null);

  const refreshEprs = async () => {
    if (!person) return;

    const res = await api.get<Epr[]>(`/api/epr?personId=${person.id}`);
    setEprs(res.data);
  };

  useEffect(() => {
    if (!person) return;

    refreshEprs();

    const loadSummary = async () => {
      const res = await api.get(`/api/epr/summary/${person.id}`);
      setSummary(res.data);
    };

    loadSummary();
  }, [person]);

  if (!person) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400">
        Select a person
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">{person.name}</h2>
          <div className="text-gray-500 text-sm">{person.role}</div>
        </div>

        <button
          onClick={() => {
            setSelectedEpr(null);
            setShowModal(true);
          }}
          className="px-3 py-2 text-sm bg-black text-white rounded-lg"
        >
          New EPR
        </button>
      </div>
      {summary && (
        <div className="bg-white border rounded-xl p-5 shadow-sm mb-6">
          <h3 className="font-medium mb-3">Performance Snapshot</h3>

          <div className="text-3xl font-bold mb-2">
            ⭐ {summary.averageOverallRating?.toFixed(1)}
          </div>

          <div className="flex gap-2 mb-4">
            <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded">
              Technical {summary.averageTechnicalRating?.toFixed(1)}
            </span>

            <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">
              Non-Technical {summary.averageNonTechnicalRating?.toFixed(1)}
            </span>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-2">Recent Trend</p>

            {summary.lastThreePeriods?.map((p: any, i: number) => {
              const label = new Date(p.periodLabel).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  year: "numeric",
                },
              );

              return (
                <div key={i} className="flex justify-between text-sm py-1">
                  <span>{label}</span>
                  <span className="font-medium">{p.overallRating}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <h3 className="font-medium mb-3">Performance Records</h3>

      {eprs.map((epr) => {
        const start = new Date(epr.period_start).toLocaleDateString();
        const end = new Date(epr.period_end).toLocaleDateString();

        return (
          <div
            key={epr.id}
            onClick={() => {
              setSelectedEpr(epr);
              setShowModal(true);
            }}
            className="border rounded-xl p-4 mb-3 bg-white cursor-pointer hover:shadow-sm transition"
          >
            <div className="text-sm text-gray-500">
              {start} – {end}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm font-medium">
                Rating {epr.overall_rating}
              </span>

              <span
                className={`text-xs px-2 py-1 rounded-full
                  ${
                    epr.status === "submitted"
                      ? "bg-green-100 text-green-700"
                      : epr.status === "draft"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200"
                  }
                `}
              >
                {epr.status}
              </span>
            </div>
          </div>
        );
      })}

      {showModal && person && (
        <EprModal
          epr={selectedEpr}
          personId={person.id}
          personName={person.name}
          onClose={() => setShowModal(false)}
          onSaved={refreshEprs}
        />
      )}
    </div>
  );
}
