export const Square = ({ children, isSelected, updateBoard, index }) => {
    const className = `square ${isSelected ? 'bg-stone-300' : ''}`
  
    const handleClick = () => {
      updateBoard(index)
    }
  
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    )
  }