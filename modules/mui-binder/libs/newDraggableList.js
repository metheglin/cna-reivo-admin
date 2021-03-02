import React, {useState, useCallback, useEffect, useRef} from 'react'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { useDrag, useDrop } from 'react-dnd'

import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

const getRandomId = () => Math.floor(Math.random() * 100000000)

export default ({defaultValue, Component}) => {
  const [items, setItems] = useState(defaultValue || [])
  useEffect(()=>{
    setItems(defaultValue || [])
  }, [defaultValue])
  const onMove = useCallback((dragIndex, hoverIndex) => {
    const itemsEnsureId = items.map(x=>({id: getRandomId(), ...x}))
    const dragging = itemsEnsureId[dragIndex]
    let newItems = [...itemsEnsureId.filter(x=>x.id!==dragging.id)]
    newItems.splice(hoverIndex, 0, dragging)
    // console.log(dragIndex, hoverIndex, newItems)
    setItems(newItems)
  }, [items])

  const render = (
    <DndProvider backend={Backend}>
      <List dense={false}>
        {items.map((x,i)=>(
          <Item key={i} id={x.id} index={i} onMove={onMove}>
            <ListItemIcon>
              <DragIndicatorIcon />
            </ListItemIcon>
            <Component index={i} {...x} />
          </Item>
        ))}
      </List>
    </DndProvider>
  )

  return {render, items, setItems}
}

const Item = ({id, index, onMove, children, ...props}) => {
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: 'dragListItem',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      onMove(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'dragListItem', id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return (
    <ListItem ref={ref} index={index} onMove={onMove}>
      {children}
    </ListItem>
  )
}