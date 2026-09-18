import { ExpenseCategoryType } from "../types/database";

export interface CategoryMetadata {
  id: ExpenseCategoryType;
  translationKey: string;
  icon: string;
  color: string;
  bgColor: string;
}

export const CATEGORY_LIST: Record<ExpenseCategoryType, CategoryMetadata> = {
  FOOD_AND_BEVERAGE: {
    id: "FOOD_AND_BEVERAGE",
    translationKey: "category.FOOD_AND_BEVERAGE",
    icon: "utensils",
    color: "#F97316", // Orange
    bgColor: "#FFEDD5",
  },
  TRANSPORTATION: {
    id: "TRANSPORTATION",
    translationKey: "category.TRANSPORTATION",
    icon: "fuel",
    color: "#EAB308", // Amber
    bgColor: "#FEF9C3",
  },
  HOUSING_AND_UTILITIES: {
    id: "HOUSING_AND_UTILITIES",
    translationKey: "category.HOUSING_AND_UTILITIES",
    icon: "home",
    color: "#8B5CF6", // Purple
    bgColor: "#EDE9FE",
  },
  EDUCATION: {
    id: "EDUCATION",
    translationKey: "category.EDUCATION",
    icon: "graduation-cap",
    color: "#3B82F6", // Blue
    bgColor: "#DBEAFE",
  },
  HEALTHCARE: {
    id: "HEALTHCARE",
    translationKey: "category.HEALTHCARE",
    icon: "heart-pulse",
    color: "#EF4444", // Red
    bgColor: "#FEE2E2",
  },
  ENTERTAINMENT: {
    id: "ENTERTAINMENT",
    translationKey: "category.ENTERTAINMENT",
    icon: "gamepad-2",
    color: "#EC4899", // Pink
    bgColor: "#FCE7F3",
  },
  SHOPPING: {
    id: "SHOPPING",
    translationKey: "category.SHOPPING",
    icon: "shopping-bag",
    color: "#10B981", // Emerald
    bgColor: "#D1FAE5",
  },
  FINANCIAL: {
    id: "FINANCIAL",
    translationKey: "category.FINANCIAL",
    icon: "credit-card",
    color: "#6366F1", // Indigo
    bgColor: "#E0E7FF",
  },
  OTHER: {
    id: "OTHER",
    translationKey: "category.OTHER",
    icon: "more-horizontal",
    color: "#64748B", // Slate
    bgColor: "#F1F5F9",
  },
};
