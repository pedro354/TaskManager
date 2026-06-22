import { useDroppable } from "@dnd-kit/core"
import type { ReactNode } from "react"

interface DroppableColumnProps {
  id: string
  children: ReactNode
}

export const DroppableColumn: React.FC<DroppableColumnProps> = ({
  id,
  children
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        height: "100%",
        opacity: isOver ? 0.8 : 1
      }}
    >
      {children}
    </div>
  )
}