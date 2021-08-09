import React, { useEffect, forwardRef } from 'react'
import { Container } from '@material-ui/core'
import MaterialTable, { Icons } from 'material-table'
import PropTypes from 'prop-types'

import AddBox from '@material-ui/icons/AddBox'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import CustomTableMenu from './CustomTableMenu'
import QuestionDialog from '../QuestionDialog/QuestionDialog'
import InfoDialog from '../InfoDialog/InfoDialog'
import DeleteIcon from '@material-ui/icons/Delete'
import { useHistory } from 'react-router'

import GetUserToken from '../../core/GetUserToken'
import { axiosInstance } from '../../axiosInstance'
export default function CustomTable (props: any) {
  const { showAddButton, addLinkUri, deleteParamIdName, addLinkText, columns, data, showDelete, showEdit, editLinkText, editLinkUri, deleteUrl, deleteDialogTitle, deleteButtonText, deleteDialogContent, onReload, replaceContent, editParams, customActionButtons, deleteParams, deleteSelected, editable, addAction, editAction, multiUpdateUrl, title, selection, customAction } = props
  const [, setShowColum] = React.useState([] as any)

  const { t } = useTranslation()
  const [selectedItems, setSelectedItems] = React.useState([] as any)
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
  const [openInfoDialog, setOpenInfoDialog] = React.useState(false)
  const [actions, setActions] = React.useState([] as any)
  const history = useHistory()

  useEffect(() => {
    const fetchData = async () => {
      const actionTmp = []
      const rowAction = []
      if (showDelete) {
        actionTmp.push({
          icon: () => <DeleteIcon />,
          tooltip: t('CUSTOM_TABLE_DELETE_SELECTED'),
          onClick: deleteSelectedClick
        })
        rowAction.push()
      }
      if (showAddButton) {
        if (editable === undefined || !editable) {
          if (addLinkUri !== undefined) {
            actionTmp.push({
              icon: () => <AddBox />,
              isFreeAction: true,
              tooltip: addLinkText,
              onClick: () => history.push(addLinkUri)
            })
          } else {
            actionTmp.push({
              icon: () => <AddBox />,
              isFreeAction: true,
              tooltip: addLinkText,
              onClick: () => addAction()
            })
          }
        }
      }
      if (customAction !== undefined) {
        customAction?.forEach(function (item: any) {
          actionTmp.push({
            icon: () => item.icon,
            isFreeAction: true,
            tooltip: item.tooltip,
            onClick: () => item.onClick()
          })
        })
      }
      setActions(actionTmp)
      setShowColum(columns)
    }
    fetchData()
  }, [])
  const handleCloseInfoDialog = () => {
    setOpenInfoDialog(false)
  }
  const deleteSelectedClick = (event: any, rowData: any) => {
    if (rowData.length > 0) {
      setSelectedItems(rowData)
      setOpenDeleteDialog(true)
    } else {
      setOpenInfoDialog(true)
    }
  }

  const tableIcons: Icons = {
    Add: forwardRef(() => <AddBox />),
    Check: forwardRef(() => <Check />),
    Clear: forwardRef(() => <Clear />),
    Delete: forwardRef(() => <DeleteOutline />),
    DetailPanel: forwardRef(() => <ChevronRight />),
    Edit: forwardRef(() => <Edit />),
    Export: forwardRef(() => <SaveAlt />),
    Filter: forwardRef(() => <FilterList />),
    FirstPage: forwardRef(() => <FirstPage />),
    LastPage: forwardRef(() => <LastPage />),
    NextPage: forwardRef(() => <ChevronRight />),
    PreviousPage: forwardRef(() => <ChevronLeft />),
    ResetSearch: forwardRef(() => <Clear />),
    Search: forwardRef(() => <Search />),
    SortArrow: forwardRef(() => <ArrowUpward />),
    ThirdStateCheck: forwardRef(() => <Remove />),
    ViewColumn: forwardRef(() => <ViewColumn />)

  }
  if (columns.findIndex((x: any) => x.field === 'action') === -1) {
    columns[columns.length] = { title: '', field: 'action', grouping: false, sorting: false, filtering: false, align: 'right', removable: false, editable: false, hiddenByColumnsButton: true }
  }

  if (!editable || editable === undefined) {
    data?.forEach(function (item: any) {
      if (!item.hideActionButton) {
        item.action = <CustomTableMenu showEdit={showEdit} editParams={editParams} editLinkUri={editLinkUri} editLinkText={editLinkText} item={item}
          showDelete={item.showDelete === undefined ? showDelete : item.showDelete} deleteParams={deleteParams} deleteParamIdName={deleteParamIdName} deleteUrl={deleteUrl} deleteDialogTitle={deleteDialogTitle}
          deleteButtonText={deleteButtonText} deleteDialogContent={deleteDialogContent} replaceContent={replaceContent} onReload={onReload} customActionButtons={customActionButtons}
        />
      }
    })
  }
  let editableObj = {}
  if (editable) {
    if (showAddButton) {
      editableObj = {
        onRowAdd: (newData: any) =>
          new Promise((resolve: any) => {
            if (showAddButton) {
              addAction(newData)
              resolve()
            } else {
              resolve()
            }
          })

      }
    }
    if (showEdit) {
      editableObj = {

        onRowUpdate: (newData: any, oldData: any) =>
          new Promise((resolve: any) => {
            resolve()
            editAction(oldData, newData)
          }),

        onBulkUpdate: (changes: any) =>
          new Promise((resolve: any) => {
            resolve()
            if (showEdit) {
              if (multiUpdateUrl === undefined || multiUpdateUrl === '') {
                for (const [, value] of Object.entries(changes)) {
                  const tmp = value as any
                  editAction(tmp?.oldData, tmp?.newData)
                }
              }
            }
          })

      }
    }
    if (showDelete) {
      editableObj = {
        onRowDelete: (oldData: any) =>
          new Promise((resolve: any) => {
            resolve()
            if (showDelete) {
              axiosInstance.delete(deleteUrl + '?' + deleteParamIdName + '=' + oldData.id + '&accessToken=' + GetUserToken() + '&' + deleteParams).then(function () {
                onReload()
              })
            }
          })
      }
    }
    if (showEdit && showDelete) {
      editableObj = {

        onRowUpdate: (newData: any, oldData: any) =>
          new Promise((resolve: any) => {
            resolve()
            editAction(oldData, newData)
          }),

        onBulkUpdate: (changes: any) =>
          new Promise((resolve: any) => {
            resolve()

            if (multiUpdateUrl === undefined || multiUpdateUrl === '') {
              for (const [, value] of Object.entries(changes)) {
                const tmp = value as any
                editAction(tmp?.oldData, tmp?.newData)
              }
            }
          }),
        onRowDelete: (oldData: any) =>
          new Promise((resolve: any) => {
            resolve()

            axiosInstance.delete(deleteUrl + '?' + deleteParamIdName + '=' + oldData.id + '&accessToken=' + GetUserToken() + '&' + deleteParams).then(function () {
              onReload()
            })
          })
      }
    }
    if (showAddButton && showDelete) {
      editableObj = {
        onRowAdd: (newData: any) =>
          new Promise((resolve: any) => {
            addAction(newData)
            resolve()
          }),

        onRowDelete: (oldData: any) =>
          new Promise((resolve: any) => {
            resolve()

            axiosInstance.delete(deleteUrl + '?' + deleteParamIdName + '=' + oldData.id + '&accessToken=' + GetUserToken() + '&' + deleteParams).then(function () {
              onReload()
            })
          })
      }
    }
    if (showAddButton && showEdit) {
      editableObj = {
        onRowAdd: (newData: any) =>
          new Promise((resolve: any) => {
            addAction(newData)
            resolve()
          }),

        onRowUpdate: (newData: any, oldData: any) =>
          new Promise((resolve: any) => {
            resolve()
            editAction(oldData, newData)
          }),

        onBulkUpdate: (changes: any) =>
          new Promise((resolve: any) => {
            resolve()

            if (multiUpdateUrl === undefined || multiUpdateUrl === '') {
              for (const [, value] of Object.entries(changes)) {
                const tmp = value as any
                editAction(tmp?.oldData, tmp?.newData)
              }
            }
          })

      }
    }
    if (showAddButton && showEdit && showDelete) {
      editableObj = {
        onRowAdd: (newData: any) =>
          new Promise((resolve: any) => {
            addAction(newData)
            resolve()
          }),

        onRowUpdate: (newData: any, oldData: any) =>
          new Promise((resolve: any) => {
            resolve()
            editAction(oldData, newData)
          }),

        onBulkUpdate: (changes: any) =>
          new Promise((resolve: any) => {
            resolve()

            if (multiUpdateUrl === undefined || multiUpdateUrl === '') {
              for (const [, value] of Object.entries(changes)) {
                const tmp = value as any
                editAction(tmp?.oldData, tmp?.newData)
              }
            }
          }),
        onRowDelete: (oldData: any) =>
          new Promise((resolve: any) => {
            resolve()

            axiosInstance.delete(deleteUrl + '?' + deleteParamIdName + '=' + oldData.id + '&accessToken=' + GetUserToken() + '&' + deleteParams).then(function () {
              onReload()
            })
          })
      }
    }
  }

  const handleCloseDeleteDialog = () => {
    setSelectedItems([])
    setOpenDeleteDialog(false)
  }
  const handleDelete = async () => {
    if (deleteSelected === undefined || deleteSelected === '') {
      selectedItems.forEach(function (item: any) {
        axiosInstance.delete(deleteUrl + '?' + deleteParamIdName + '=' + item.id + '&accessToken=' + GetUserToken() + '&' + deleteParams).then(function () {
          onReload()
        })
      })
      setSelectedItems([])
      setOpenDeleteDialog(false)
    }
  }

  return (
    <Container component="main" maxWidth="xl" style={{ paddingLeft: 0, paddingRight: 0 }}>
      {openDeleteDialog && <QuestionDialog title={deleteDialogTitle} openDialog={openDeleteDialog} onCloseDialog={handleCloseDeleteDialog}
        content={t('DELETE_MORE_ITEMS')} oclickYes={handleDelete}
      />}

      {openInfoDialog && <InfoDialog title={deleteDialogTitle} openDialog={openInfoDialog} onCloseDialog={handleCloseInfoDialog}
        content={t('DELETE_MORE_ITEMS_NO_SELECT')}
      />}

      <MaterialTable style={{ paddingLeft: 0, paddingRight: 0 }}
        editable={editable ? editableObj : {}}
        options={{
          grouping: false,
          filtering: true,
          selection: selection === undefined ? true : selection,
          paging: false,
          addRowPosition: 'first',
          columnsButton: !editable,
          emptyRowsWhenPaging: true
        }}
        localization={{
          body: {
            addTooltip: addLinkText,
            deleteTooltip: deleteButtonText,
            editTooltip: editLinkText,
            emptyDataSourceMessage: t('TABLE_EMPTY'),
            editRow: {
              deleteText: deleteDialogContent?.replace('{' + replaceContent + '}', ''),
              saveTooltip: t('TABLE_SAVE'),
              cancelTooltip: t('TABLE_CANCEL')
            }
          },
          header: {
            actions: ''
          },
          toolbar: {
            showColumnsTitle: t('TABLE_SHOW_COLUMNS'),
            addRemoveColumns: t('TABLE_SELECT_COLUMNS'),
            searchPlaceholder: t('TABLE_SEARCH'),
            nRowsSelected: t('TABLE_SELECTED_ROWS')
          }
        }}
        title={title === undefined ? '' : title}
        icons={tableIcons}
        actions={actions}
        columns={columns}
        data={data}
      />

    </Container>
  )
}
CustomTable.prototype = {
  addLinkUri: PropTypes.string,
  addLinkText: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  showDelete: PropTypes.bool,
  showEdit: PropTypes.bool,
  editLinkUri: PropTypes.string,
  editLinkText: PropTypes.string,
  deleteUrl: PropTypes.string,
  deleteDialogTitle: PropTypes.string,
  deleteButtonText: PropTypes.string,
  deleteDialogContent: PropTypes.string,
  deleteParamIdName: PropTypes.string,
  onReload: PropTypes.func,
  replaceContent: PropTypes.string,
  showAddButton: PropTypes.bool,
  editParams: PropTypes.string,
  customActionButtons: PropTypes.array,
  deleteParams: PropTypes.string,
  id: PropTypes.string,
  deleteSelected: PropTypes.string,
  linkColumnName: PropTypes.string,
  editable: PropTypes.any,
  addAction: PropTypes.func,
  editAction: PropTypes.func,
  multiUpdateUrl: PropTypes.string,
  title: PropTypes.string,
  selection: PropTypes.bool,
  customAction: PropTypes.array

}
