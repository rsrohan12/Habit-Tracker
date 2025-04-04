"use client";

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import HabitList from "@/components/habit-list";
import AddHabitModal from "@/components/add-habit-modal";
import type { Habit } from "@/types/habit";
import ProgressCard from "@/components/progressCard";

export default function Home() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habitToEdit, setHabitToEdit] = useState<Habit | null>(null);

  const totalHabits = habits.length;
  const completedHabits = habits.filter((habit) => habit.completed).length;

  const getTodayDate = () => new Date().toISOString().split("T")[0];

  useEffect(() => {
    const today = getTodayDate();
    const lastSavedDate = localStorage.getItem("habit-date");

    if (lastSavedDate !== today) {
      // New day: clear habits and update the date
      localStorage.setItem("habit-date", today);
      localStorage.removeItem("habits");
      setHabits([]);
    } else {
      const savedHabits = localStorage.getItem("habits");
      if (savedHabits) {
        setHabits(JSON.parse(savedHabits));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // const addHabit = (name: string) => {
  //   const newHabit: Habit = {
  //     id: Date.now().toString(),
  //     name,
  //     completed: false,
  //   };
  //   setHabits([...habits, newHabit]);
  //   setIsModalOpen(false);
  // };

  const toggleHabit = (id: string) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  return (
    <main className="min-h-screen bg-[#F8F8F8] p-4 md:p-6">
      <div className="max-w-md mx-auto">
        <ProgressCard
          totalHabits={totalHabits}
          completedHabits={completedHabits}
        />
        <h3 className="mt-4 text-xl font-bold text-[#333333] mb-6">
          Today Habit
        </h3>
        <HabitList
          habits={habits}
          onToggle={toggleHabit}
          onDelete={deleteHabit}
          onEdit={(id) => {
            const foundHabit = habits.find((habit) => habit.id === id);
            if (foundHabit) {
              setHabitToEdit(foundHabit);
              setIsModalOpen(true);
            }
          }}
        />

        {/* Floating Action Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#7C5CFC] text-white flex items-center justify-center shadow-lg hover:bg-[#6A4EE0] transition-colors"
          aria-label="Add new habit"
        >
          <Plus size={24} />
        </button>

        {/* Add Habit Modal */}
        <AddHabitModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setHabitToEdit(null);
          }}
          onSave={(name) => {
            if (habitToEdit) {
              // Update existing habit
              setHabits(
                habits.map((habit) =>
                  habit.id === habitToEdit.id ? { ...habit, name } : habit
                )
              );
              setHabitToEdit(null);
            } else {
              // Add new habit
              const newHabit: Habit = {
                id: Date.now().toString(),
                name,
                completed: false,
              };
              setHabits([...habits, newHabit]);
            }
            setIsModalOpen(false);
          }}
          defaultValue={habitToEdit?.name}
        />
      </div>
    </main>
  );
}
