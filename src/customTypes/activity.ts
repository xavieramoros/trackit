import { CategoryType } from "@customTypes/category";

export type ActivityType = {
  id: string,
  startTimestamp: number,
  endTimestamp: number,
  count: number,
  category: CategoryType
}
