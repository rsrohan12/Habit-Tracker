import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const formatDate = () => {
//   const options: Intl.DateTimeFormatOptions = {
//     weekday: "long",
//     month: "short",
//     day: "numeric",
//   }
//   return new Date().toLocaleDateString("en-US", options)
// }

