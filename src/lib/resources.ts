import { resources } from "@/data/resources";
import { Resource } from "@/types/resource";

export function getAllResources(): Resource[] {
  return resources;
}

export function getResourceById(id: string): Resource | undefined {
  return resources.find((r) => r.id === id);
}

export function getResourcesByCategory(category: string): Resource[] {
  if (category === "All") return resources;
  return resources.filter((r) => r.category === category);
}
