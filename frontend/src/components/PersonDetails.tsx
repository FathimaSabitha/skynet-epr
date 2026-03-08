import { useEffect, useState } from "react"
import { api } from "../api/api"
import type { Person, Epr } from "../type"

type Props = {
  person: Person | null
}

export default function PersonDetails({ person }: Props) {

  const [eprs,setEprs] = useState<Epr[]>([])

  useEffect(()=>{

    if(!person) return

    const fetchEprs = async () => {

      const res = await api.get<Epr[]>(`/api/epr?personId=${person.id}`)

      setEprs(res.data)

    }

    fetchEprs()

  },[person])


  if(!person){

    return(

      <div className="flex items-center justify-center h-screen text-gray-400">

        Select a person

      </div>

    )

  }

  return(

    <div className="p-8">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-xl font-semibold">{person.name}</h2>

          <div className="text-gray-500 text-sm">{person.role}</div>

        </div>

        {/* New EPR Button */}

        <button className="px-3 py-2 text-sm bg-black text-white rounded-lg">

          New EPR

        </button>

      </div>


      <h3 className="font-medium mb-3">Performance Records</h3>


      {eprs.map(epr => {

        const start = new Date(epr.period_start).toLocaleDateString()
        const end = new Date(epr.period_end).toLocaleDateString()

        return(

          <div
            key={epr.id}
            className="border rounded-xl p-4 mb-3 bg-white"
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
                  ${epr.status==="submitted"
                    ? "bg-green-100 text-green-700"
                    : epr.status==="draft"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-200"}
                `}
              >
                {epr.status}
              </span>

            </div>

          </div>

        )

      })}

    </div>

  )
}