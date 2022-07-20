import { useDispatch } from 'react-redux'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { deleteGoal } from '../features/goals/goalSlice'

function GoalItem({ goal }) {
  const dispatch = useDispatch()

  return (
    <div className="goal">
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className="edit">
        <FaEdit />
      </button>
      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
        <FaTrash />
      </button>
    </div>
  )
}

export default GoalItem