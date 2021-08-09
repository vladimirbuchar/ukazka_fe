import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import PropTypes from 'prop-types'
import { getLanguage } from '../../i18n'
import { useTranslation } from 'react-i18next'

export default function CustomHtmlEditor (props: any) {
  const { content, onChangeContent, enableTemplate, onEditorLeave } = props
  const { t } = useTranslation()
  const handleEditorChange = (content: any, editor: any) => {
    onChangeContent(content)
  }
  const onMouseLeave = () => {
    if (onEditorLeave) {
      onEditorLeave()
    }
  }

  return (
    <Editor
      initialValue={content}
      apiKey="zz4n465utf5nl4h4tpaj3na8qlxu8bdbmvg1ck3qgt3i6s7u"
      init={{
        height: 500,
        menubar: false,
        language: getLanguage(),
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount emoticons'
        ],
        toolbar:
          'undo redo | formatselect |fontselect |fontsizeselect |  table | bold italic  underline strikethrough forecolor backcolor |  alignleft aligncenter alignright alignjustify |  bullist numlist outdent indent | removeformat | pagebreak | charmap emoticons | insertfile image media|' + (enableTemplate === true ? 'templateButton' : '') + '',
        setup: function (editor) {
          editor.ui.registry.addMenuButton('templateButton', {
            text: t('HTML_EDITOR_ENV'),

            fetch: function (callback: any) {
              var items = [
                {
                  type: 'menuitem',
                  text: t('HTML_EDITOR_ENV_FULL_NAME'),
                  onAction: function () {
                    editor.insertContent('{fullName}')
                  }
                },
                {
                  type: 'menuitem',
                  text: t('HTML_EDITOR_ENV_COURSE_NAME'),
                  onAction: function () {
                    editor.insertContent('{courseName}')
                  }
                },
                {
                  type: 'menuitem',
                  text: t('HTML_EDITOR_ENV_ACTUAL_DATE'),
                  onAction: function () {
                    editor.insertContent('{actualDate}')
                  }
                },
                {
                  type: 'menuitem',
                  text: t('HTML_EDITOR_ENV_COURSE_TERM'),
                  onAction: function () {
                    editor.insertContent('{courseTerm}')
                  }
                },
                {
                  type: 'menuitem',
                  text: t('HTML_EDITOR_ENV_ORG_NAME'),
                  onAction: function () {
                    editor.insertContent('{organizationName}')
                  }
                },
                {
                  type: 'menuitem',
                  text: t('HTML_EDITOR_ENV_ORG_ADDRESS_COUNTRY'),
                  onAction: function () {
                    editor.insertContent('{organizationAddressCountry}')
                  }
                },
                {
                  type: 'menuitem',
                  text: t('HTML_EDITOR_ENV_ORG_ADDRESS_REGION'),
                  onAction: function () {
                    editor.insertContent('{organizationAddressRegion}')
                  }
                },
                {
                  type: 'menuitem',
                  text: t('HTML_EDITOR_ENV_ORG_ADDRESS_CITY'),
                  onAction: function () {
                    editor.insertContent('{organizationAddressCity}')
                  }
                },
                {
                  type: 'menuitem',
                  text: t('HTML_EDITOR_ENV_ORG_ADDRESS_STREET'),
                  onAction: function () {
                    editor.insertContent('{organizationAddressStreet}')
                  }
                },
                {
                  type: 'menuitem',
                  text: t('HTML_EDITOR_ENV_ORG_ADDRESS_HOUSE_NUMBER'),
                  onAction: function () {
                    editor.insertContent('{organizationAddressHouseNumber}')
                  }
                },
                {
                  type: 'menuitem',
                  text: t('HTML_EDITOR_ENV_ORG_ADDRESS_ZIP'),
                  onAction: function () {
                    editor.insertContent('{organizationAddressHouseZip}')
                  }
                }

              ]
              callback(items)
            }

          })
        }
      }}

      onEditorChange={handleEditorChange}
      onMouseLeave={onMouseLeave}
    />
  )
}
CustomHtmlEditor.prototype = {
  content: PropTypes.string,
  onChangeContent: PropTypes.func,
  enableTemplate: PropTypes.bool,
  onEditorLeave: PropTypes.func
}
