import { Template } from "../entity/Template"
import { TemplateDto } from "../query/TemplateDto"
import { fetchTemplates as fetchTemplatesFromQuery } from "../query/StorageQueryService"
import { saveTemplates as saveTemplatesToRepository } from "../repository/TemplateRepository"

export async function fetchTemplates(): Promise<Template[] | null> {
  console.log("fetchTempletes")
  return fetchTemplatesFromQuery()
}

export async function saveTemplates(
  templateDtoList: TemplateDto[]
): Promise<void> {
  saveTemplatesToRepository(templateDtoList)
}
