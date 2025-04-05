"use client"

import { MoreVertical, Pencil, Trash2 } from "lucide-react"
import type { Habit } from "@/types/habit"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

interface HabitItemProps {
  habit: Habit
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  // optional: add onEdit if you're handling edit too
  onEdit?: (id: string) => void
}

export default function HabitItem({ habit, onToggle, onDelete, onEdit }: HabitItemProps) {
  return (
    <div
      className={`flex items-center justify-between p-4 border-b last:border-b-0 rounded-md transition-colors duration-300 ${
        habit.completed ? "bg-green-100" : "bg-white"
      }`}
    >
      {/* LEFT: Habit name */}
      <label
        htmlFor={`habit-${habit.id}`}
        className={`text-lg font-medium transition-colors duration-300 ${
          habit.completed ? "text-green-600" : "text-[#333333]"
        }`}
      >
        {habit.name}
      </label>

      {/* RIGHT: Checkbox + Dropdown */}
      <div className="flex items-center gap-3">
        <Checkbox
          id={`habit-${habit.id}`}
          checked={habit.completed}
          onCheckedChange={() => onToggle(habit.id)}
          className="border-[#7C5CFC] data-[state=checked]:bg-[#7C5CFC] data-[state=checked]:text-white"
        />

        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="text-gray-400 hover:text-black">
              <MoreVertical size={18} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit?.(habit.id)} className="cursor-pointer">
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(habit.id)} className="cursor-pointer text-red-600">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

