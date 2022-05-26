import { Template } from "../entity/Template"
import { saveTemplates as saveTemplatesToStore } from "../store/LocalStorage"

export async function saveTemplates(
  templateDtoList: Template[]
): Promise<void> {
  saveTemplatesToStore(templateDtoList)
}
