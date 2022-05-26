import { Template } from "../entity/Template"
import { TemplateDto } from "../query/TemplateDto"

const LOCAL_STORAGE_KEY = "ichiren-shuffle::Templates"

export async function fetchTemplates(): Promise<TemplateDto[] | null> {
  const localStorageValue = window.localStorage.getItem(LOCAL_STORAGE_KEY)
  if (!localStorageValue) {
    return null
  }
  const localStorageValueJson = JSON.parse(localStorageValue)
  const templates = localStorageValueJson["templates"]
  if (!templates) {
    return null
  }
  return templates
}

export async function saveTemplates(
  templateDtoList: Template[]
): Promise<void> {
  window.localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({ templates: templateDtoList })
  )
}
