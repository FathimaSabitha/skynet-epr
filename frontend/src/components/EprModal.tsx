import { useState } from "react"
import { api } from "../api/api"
import type { Epr } from "../type"

type Props = {
  epr?: Epr | null
  personId: number
  personName: string
  onClose: () => void
  onSaved: () => void
}

export default function EprModal({
  epr,
  personId,
  personName,
  onClose,
  onSaved
}: Props) {

  const [periodStart,setPeriodStart] = useState(epr?.period_start || "")
  const [periodEnd,setPeriodEnd] = useState(epr?.period_end || "")

  const [overallRating,setOverallRating] = useState(epr?.overall_rating || 3)
  const [technicalRating,setTechnicalRating] = useState(
    epr?.technical_skills_rating || 3
  )
  const [nonTechnicalRating,setNonTechnicalRating] = useState(
    epr?.non_technical_skills_rating || 3
  )

  const [remarks,setRemarks] = useState(epr?.remarks || "")
  const [status,setStatus] = useState(epr?.status || "draft")

  const handleSubmit = async () => {

    if(epr){

      await api.patch(`/api/epr/${epr.id}`,{
        overallRating,
        technicalSkillsRating: technicalRating,
        nonTechnicalSkillsRating: nonTechnicalRating,
        remarks,
        status
      })

    } else {

      await api.post("/api/epr",{
        personId,
        evaluatorId:1,
        roleType:"student",
        periodStart,
        periodEnd,
        overallRating,
        technicalSkillsRating: technicalRating,
        nonTechnicalSkillsRating: nonTechnicalRating,
        remarks,
        status
      })

    }

    onSaved()
    onClose()

  }

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white rounded-2xl p-7 w-[480px] shadow-xl">

        {/* Header */}

        <div className="mb-6">

          <h2 className="text-xl font-semibold">
            {epr ? "Edit Performance Record" : "New Performance Record"}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {personName}
          </p>

        </div>

        {/* Period */}

        <div className="grid grid-cols-2 gap-3 mb-5">

          <div>
            <label className="text-sm text-gray-600">Period Start</label>
            <input
              type="date"
              value={periodStart}
              onChange={(e)=>setPeriodStart(e.target.value)}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Period End</label>
            <input
              type="date"
              value={periodEnd}
              onChange={(e)=>setPeriodEnd(e.target.value)}
              className="border rounded-lg p-2 w-full"
            />
          </div>

        </div>

        {/* Ratings */}

        <div className="space-y-4 mb-5">

          <div>
            <label className="text-sm text-gray-600">
              Overall Performance ({overallRating})
            </label>

            <input
              type="range"
              min="1"
              max="5"
              value={overallRating}
              onChange={(e)=>setOverallRating(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Technical Skills ({technicalRating})
            </label>

            <input
              type="range"
              min="1"
              max="5"
              value={technicalRating}
              onChange={(e)=>setTechnicalRating(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">
              Non-Technical Skills ({nonTechnicalRating})
            </label>

            <input
              type="range"
              min="1"
              max="5"
              value={nonTechnicalRating}
              onChange={(e)=>setNonTechnicalRating(Number(e.target.value))}
              className="w-full"
            />
          </div>

        </div>

        {/* Remarks */}

        <div className="mb-5">

          <label className="text-sm text-gray-600">Remarks</label>

          <textarea
            value={remarks}
            onChange={(e)=>setRemarks(e.target.value)}
            className="border rounded-lg p-2 w-full mt-1"
            rows={3}
            placeholder="Write evaluation remarks..."
          />

        </div>

        {/* Status */}

        <div className="mb-6">

          <label className="text-sm text-gray-600">Status</label>

          <select
            value={status}
            onChange={(e)=>setStatus(e.target.value as "draft"|"submitted"|"archived")}
            className="border rounded-lg p-2 w-full mt-1"
          >
            <option value="draft">Draft</option>
            <option value="submitted">Submitted</option>
            <option value="archived">Archived</option>
          </select>

        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-black text-white rounded-lg"
          >
            Save Record
          </button>

        </div>

      </div>

    </div>

  )
}