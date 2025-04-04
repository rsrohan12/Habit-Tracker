"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AddHabitModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string) => void
  defaultValue?: string
}

export default function AddHabitModal({ isOpen, onClose, onSave, defaultValue }: AddHabitModalProps) {
  const [habitName, setHabitName] = useState(defaultValue || "")

  useEffect(() => {
    if (isOpen) {
      setHabitName(defaultValue || "")
    }
  }, [isOpen, defaultValue])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (habitName.trim()) {
      onSave(habitName.trim())
      setHabitName("")
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-[#333333]">
            {defaultValue ? "Edit Habit" : "Add New Habit"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="habit-name" className="block text-sm font-medium text-gray-700 mb-1">
              Habit Name
            </label>
            <Input
              id="habit-name"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              placeholder="Enter habit name"
              className="w-full"
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setHabitName("")
                onClose()
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!habitName.trim()} className="bg-[#7C5CFC] hover:bg-[#6A4EE0]">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
