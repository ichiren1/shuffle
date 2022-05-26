import { useState } from "react";

import { useAppDispatch } from '../../app/hooks';
import {
  setCandidates
} from './shuffleSlice';
import './TemplateDialog.css'
import { Template } from "../../entity/Template";

export function TemplateDialog(props: TemplateDialogPropType) {
  const dispatch = useAppDispatch();
  const [selectTemplate, setSelectTemplate] = useState<Template | null>(null)

  const handleTemplateClick = (index: number) => {
    if (!props.templates) {
      return;
    }
    setSelectTemplate(props.templates[index])
  }

  const handleLoadTemplateClick = () => {
    if (!selectTemplate) {
      return;
    }
    dispatch(setCandidates(selectTemplate.candidate.map(c => c.name)))
    props.onCloseHandler()
  }

  return (
    <div className="TemplateDialog">
      <div className="TemplateDialog-overlay">
        <div className="TemplateDialog-content">
          <div className="TemplateDialog-header">
            <h4 className="TemplateDialog-header-title">テンプレート</h4>
            <button className="TemplateDialog-header-close-button" onClick={props.onCloseHandler}>x</button>
          </div>
          <div className="TemplateDialog-main">
            <div className="TemplateDialog-template-list-wrapper">
              <h5 className="TemplateDialog-template-list-title">テンプレート名</h5>
              {!props.templates && <div>保存されたテンプレートがありません</div>}
              <ul className="TemplateDialog-template-list">
                {props.templates && props.templates.map((template, index) => {
                  return (
                    <li className={["TemplateDialog-template-list-item", selectTemplate?.title === template.title ? "__selected" : ""].join(" ")}>
                      <button key={index} onClick={() => handleTemplateClick(index)}>{template.title}</button>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="TemplateDialog-selected-template-preview-wrapper">
              <h5 className="TemplateDialog-selected-template-preview-title">候補者</h5>
              {!selectTemplate && <div>テンプレートが選択されていません。左からテンプレートを選択してください。</div>}
              {selectTemplate && (
                <div className="TemplateDialog-selected-template-preview">
                  <div>{selectTemplate.title}</div>
                  <ul className="TemplateDialog-selected-template-candidates-list">
                    {selectTemplate.candidate.map(c => {
                      return (
                        <li className="TemplateDialog-selected-template-candidates-list-item">{c.name}</li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="TemplateDialog-action">
            <button className="TemplateDialog-load-template-button" onClick={handleLoadTemplateClick}>読み込む</button>
          </div>
        </div>
      </div>
    </div>
  )
}

type TemplateDialogPropType = {
  templates: Template[] | null,
  onCloseHandler: () => void
}