import { fetchTemplates as fetchTemplatesFromLocalStorage } from "../store/LocalStorage"

export async function fetchTemplates() {
  return fetchTemplatesFromLocalStorage()
}
