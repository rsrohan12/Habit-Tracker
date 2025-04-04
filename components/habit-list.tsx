"use client"

import { useState } from "react"
import type { Habit } from "@/types/habit"
import HabitItem from "./habit-item"

interface HabitListProps {
  habits: Habit[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit?: (id: string) => void
}

export default function HabitList({ habits, onToggle, onDelete, onEdit }: HabitListProps) {
  const [showAll, setShowAll] = useState(false)

  if (habits.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm text-center">
        <p className="text-gray-500">No habits yet. Add one to get started!</p>
      </div>
    )
  }

  const visibleHabits = showAll ? habits : habits.slice(0, 4)

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {visibleHabits.map((habit) => (
        <HabitItem
        key={habit.id}
        habit={habit}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit} // 👈 pass here
      />
      ))}

      {habits.length > 4 && (
        <div className="text-center py-3">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-[#7C5CFC] font-medium hover:underline transition-all"
          >
            {showAll ? "See Less" : "See All"}
          </button>
        </div>
      )}
    </div>
  )
}
