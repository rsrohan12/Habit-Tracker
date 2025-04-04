"use client"

import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import { CalendarDays } from "lucide-react"

interface ProgressCardProps {
  totalHabits: number
  completedHabits: number
}

export default function ProgressCard({ totalHabits, completedHabits }: ProgressCardProps) {
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    const today = new Date()
    const formattedDate = today.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })
    setCurrentDate(formattedDate)
  }, [])

  const percentage = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0

  return (
    <div className="max-w-md mx-auto">
      {/* Date and Name */}
      <div className="mb-4">
        <p className="text-sm text-gray-500">{currentDate}</p>
        <h2 className="text-xl font-semibold text-gray-800">Hello, Friend! 👋</h2>
      </div>

      {/* Progress Card */}
      <div className="relative bg-gradient-to-r from-orange-400 to-orange-500 text-white p-6 rounded-2xl shadow-lg flex items-center">
        {/* Circular Progress */}
        <div className="w-16 h-16 mr-4">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              textColor: "#fff",
              pathColor: "#fff",
              trailColor: "rgba(255,255,255,0.3)",
              textSize: "20px",
            })}
          />
        </div>

        {/* Progress Text */}
        <div>
          <p className="text-lg font-semibold">{completedHabits} of {totalHabits} habits</p>
          <p className="text-sm">completed today!</p>
        </div>

        {/* Calendar Icon */}
        <div className="absolute bottom-2 right-3 opacity-70">
          <CalendarDays size={32} className="text-white" />
        </div>
      </div>
    </div>
  )
}
