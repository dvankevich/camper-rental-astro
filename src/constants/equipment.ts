// src/constants/equipment.ts

export const EQUIPMENT_OPTIONS = [
  { name: "AC", icon: "AC", label: "AC" },
  { name: "transmission", icon: "transmission", label: "Automatic" },
  { name: "kitchen", icon: "kitchen", label: "Kitchen" },
  { name: "TV", icon: "TV", label: "TV" },
  { name: "bathroom", icon: "bathroom", label: "Bathroom" },
  { name: "refrigerator", icon: "refrigerator", label: "Refrigerator" },
  { name: "microwave", icon: "microwave", label: "Microwave" },
  { name: "gas", icon: "gas", label: "Gas" },
  { name: "water", icon: "water", label: "Water" },
] as const;

export const VEHICLE_TYPES = [
  { name: "van", icon: "Van", label: "Van" },
  {
    name: "fullyIntegrated",
    icon: "FullyIntegrated",
    label: "Fully Integrated",
  },
  { name: "alcove", icon: "Alcove", label: "Alcove" },
] as const;
