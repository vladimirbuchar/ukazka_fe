import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import RootRef from '@material-ui/core/RootRef'
import { Link as ReactLink } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Container,
  Box,
  Button
} from '@material-ui/core'
import PropTypes from 'prop-types'
import CustomTableMenu from '../CustomTable/CustomTableMenu'

export default function CustomDragAndDropPanel (props: any) {
  const { editLinkText, deleteButtonText, replaceContent, showAddButton, addLinkUri, addLinkText, onMove, showEdit, editLinkUri, showDelete, deleteUrl, deleteDialogTitle, deleteDialogContent, onReload, deleteParamIdName, customAddButtons } = props

  let { data } = props
  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }
    const items = reorder(
      data,
      result.source.index,
      result.destination.index
    )
    onMove(items)
    data = items
  }

  return (
    <Container component="main" maxWidth="xl">
      <Box paddingBottom={2}>
        {showAddButton &&
            <Button color="primary" variant="outlined" component={ReactLink} to={addLinkUri}>{addLinkText}</Button>
        }
        {customAddButtons}

      </Box>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided: any, snapshot: any) => (
            <RootRef rootRef={provided.innerRef}>
              <List style={getListStyle(snapshot.isDraggingOver)}>
                {data.map((item: any, index: any) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <ListItem data-itemid={item.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}

                      >
                        <ListItem button component={ReactLink} to={showEdit ? (item.customEditLink ? item.customEditLink : editLinkUri + '?id=' + item.id) : ''}>
                          <ListItemText

                            primary={item.name}
                            secondary={item.description}
                          />
                        </ListItem>

                        <ListItemIcon>

                          <CustomTableMenu showEdit={showEdit} item={item} editLinkText={editLinkText} customEditLink={true}
                            editLinkUri={item.customEditLink ? item.customEditLink : editLinkUri + '?id=' + item.id}
                            showDelete={showDelete} deleteUrl={deleteUrl} deleteParamIdName={deleteParamIdName}
                            deleteDialogTitle={deleteDialogTitle} deleteButtonText={deleteButtonText} deleteDialogContent={deleteDialogContent.replace('{' + replaceContent + '}', item[replaceContent])}
                            onReload={onReload} customActionButtons= {item.customActionButtons && item.customActionButtons.map(function (item:any) {
                              item.show = true
                              return item
                            })}
                          />

                        </ListItemIcon>
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            </RootRef>
          )}
        </Droppable>
      </DragDropContext>
    </Container>

  )
}
CustomDragAndDropPanel.prototype = {
  data: PropTypes.array,
  showAddButton: PropTypes.bool,
  addLinkUri: PropTypes.string,
  addLinkText: PropTypes.string,
  onMove: PropTypes.func,
  showEdit: PropTypes.bool,
  editLinkUri: PropTypes.string,
  editLinkText: PropTypes.string,
  showDelete: PropTypes.bool,
  deleteUrl: PropTypes.string,
  deleteDialogTitle: PropTypes.string,
  deleteButtonText: PropTypes.string,
  deleteDialogContent: PropTypes.string,
  deleteParamIdName: PropTypes.string,
  onReload: PropTypes.func,
  replaceContent: PropTypes.string,
  customAddButtons: PropTypes.array
}

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: any, endIndex: any) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: 'rgb(235,235,235)'
  })
})

const getListStyle = (isDraggingOver: any) => ({
  // background: isDraggingOver ? 'lightblue' : 'lightgrey',
})
