import './App.css'
import {observer} from "mobx-react-lite";
import {useContext, useState} from "react";
import {StoreContext} from "./index";
import styled from "styled-components";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import Columns from "./components/Column/Columns";
import {Button} from "./GlobalStyle";
import {values} from 'mobx'
import ShadowColumn from "./components/ShadowColumn";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
`

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  //gap: 20px;
  margin-right: 20px;
  margin-left: 20px;
  background-color: ${props => (props.isDraggingOver ? '#edeaea' : 'white')};
`

const AddButton = styled(Button)``

const App = observer(() => {
    const store = useContext(StoreContext)

    const shadowColumn = store.shadowColumn.get('shadow-column')

    const onBeforeCapture = beforeCapture => {
        store.setDragging(true)
    }


    const onDragStart = start => {
        if (start.type === 'column') {
            const columnDraggable = store.columns.get(start.draggableId)
            const shadowColumnPositionLeft = columnDraggable.positionLeft
            const shadowColumnWidth = columnDraggable.width
            const shadowColumnHeight = columnDraggable.height
            store.addShadow(shadowColumnPositionLeft, shadowColumnWidth, shadowColumnHeight)
        }
    }

    const onDragUpdate = update => {
        if (update.type === 'column' && typeof update.destination !== 'undefined' && update.destination !== null) {
            const columnSourceId = store.columnOrder[update.source.index]
            const columnDestinationId = store.columnOrder[update.destination.index]
            const margin = 10
            let columnPosition
            if (update.source.index < update.destination.index) {
                columnPosition = store.columns.get(columnDestinationId).positionLeft + margin
            }
            if (update.source.index > update.destination.index) {
                columnPosition = store.columns.get(columnDestinationId).positionLeft - margin
            }

            if (update.source.index === update.destination.index) {
                columnPosition = store.columns.get(columnDestinationId).positionLeft
            }

            store.shadowColumn.get('shadow-column').updatePositionShow(columnPosition)
        }
    }

    const onDragEnd = result => {
        const {destination, source} = result
        // destination - назначение
        // source - источник
        // draggable - перетаскиваемый

        if (result.type === 'column') {
            if (typeof result.destination !== 'undefined' && result.destination !== null) {
                store.columnOrderUpdate(result)
            }
            store.shadowColumn.get('shadow-column').getShow(false)
            store.setDragging(false)
        }

        if (result.type === 'card') {
            const start = store.columns.get(result.source.droppableId)
            const finish = store.columns.get(result.destination.droppableId)

            if (start === finish) {
                start.updatePositionCard(result)
            } else {
                start.deleteCard(result)
                finish.addCard(result)
            }

        }
    }

    return (
        <DragDropContext onDragStart={onDragStart} onDragUpdate={onDragUpdate} onDragEnd={onDragEnd} onBeforeCapture={onBeforeCapture}>
            <Wrapper>
                <Droppable droppableId={'all-columns'} direction='horizontal' type={'column'}>
                    {(provided, snapshot) => (
                        <Container
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            <Columns {...provided}/>
                            {provided.placeholder}
                            <ShadowColumn />
                        </Container>
                    )}
                </Droppable>
                <AddButton onClick={(e) => {
                    e.preventDefault()
                    store.addColumn()
                }}>Add column</AddButton>
            </Wrapper>
        </DragDropContext>
    )
})

export default App