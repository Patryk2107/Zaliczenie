export const ActionButton = ({
  isChange,
  from,
  to,
  handleClick,
}) => {

  return (
    <button onClick={() => handleClick(from, to, isChange)}>
      {isChange ? 'XCHG ' : 'MOV '}
      {`${from}, ${to}`}
    </button>
  )
}