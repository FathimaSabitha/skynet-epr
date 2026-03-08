import { useState } from "react"
import PeopleList from "../components/PeopleList"
import PersonDetails from "../components/PersonDetails"
import type { Person } from "../type"

export default function DirectoryPage(){

  const [selectedPerson,setSelectedPerson] = useState<Person | null>(null)

  return(

    <div className="flex h-screen bg-gray-50">

      <div className="w-[320px]">

        <PeopleList onSelect={setSelectedPerson}/>

      </div>

      <div className="flex-1">

        <PersonDetails person={selectedPerson}/>

      </div>

    </div>

  )
}