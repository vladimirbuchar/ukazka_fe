import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import CustomTable from '../CustomTable/CustomTable'
import GetUrlParam from '../../core/GetUrlParam'
import PropTypes from 'prop-types'
import { axiosInstance } from '../../axiosInstance'
import GetUserToken from '../../core/GetUserToken'
import { Link as ReactLink } from 'react-router-dom'
import Link from '@material-ui/core/Link'
export default function QuestionList (props: any) {
  const { t } = useTranslation()
  const { questions, loadQuestions, id } = props
  const [bankOfQuestion, setBankOfQuestion] = React.useState([])
  useEffect(() => {
    const fetchData = async () => {
      await axiosInstance.get('webportal/BankOfQuestion/GetBankOfQuestionInOrganization', {
        params: {
          accessToken: GetUserToken(),
          organizationId: id
        }
      }).then(function (response: any) {
        const tmp = [] as any
        response?.data?.data.forEach(function (item: any) {
          const key = item.id
          const value = item.name
          if (item.isDefault) {
            tmp[key] = t(value)
          } else {
            tmp[key] = value
          }
        })
        setBankOfQuestion(tmp)
      })
    }
    fetchData()
  }, [])

  return (
    <CustomTable addLinkUri={'/question/edit?organizationId=' + GetUrlParam('id')} addLinkText={t('BANK_OF_QUESTION_BUTTON_ADD')} columns={
      [
        {
          title: t('BANK_OF_QUESTION_QUESTION'),
          field: 'question',
          render: (rowData:any) => <Link component={ReactLink} to={'/question/edit/' + '?id=' + rowData.id + '&organizationId=' + GetUrlParam('id')} variant="body2">
            {rowData.question}
          </Link>
        },
        { title: t('BANK_OF_QUESTION_QUESTION_TITLE'), field: 'bankOfQuestionId', lookup: bankOfQuestion }

      ]
    }
    showAddButton={true}
    editParams={'&organizationId=' + GetUrlParam('id')}
    showEdit={true}
    showDelete={true}
    data={questions?.map(function (item: any) {
      if (item.isDefault) {
        item.bankOfQuestionName = t(item.bankOfQuestionName)
      }

      return item
    })}
    editLinkUri={'/question/edit'}
    editLinkText={t('QUESTION_EDIT')}
    deleteUrl={'webportal/Question/DeleteQuestion'}
    deleteDialogTitle={t('BANK_OF_QUESTION_QUESTION_DELETE_TITLE')}
    deleteDialogContent={t('BANK_OF_QUESTION_QUESTION_DELETE_CONTENT')}
    deleteParamIdName={'questionId'}
    onReload={loadQuestions}
    replaceContent={'question'}
    deleteButtonText={t('BANK_OF_QUESTION_QUESTION_DELETE')}
    linkColumnName="question"
    />
  )
}
QuestionList.prototype = {
  questions: PropTypes.array,
  loadQuestions: PropTypes.func,
  id: PropTypes.string
}
