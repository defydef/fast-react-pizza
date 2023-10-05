/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import { decreaseItemQty, increaseItemQty } from './cartSlice'

function UpdateItemQty({ pizzaId, cartQty }) {
    const dispatch = useDispatch()

    return (
        <div className="flex items-center gap-1.5 sm:gap-3">
            <Button
                type="round"
                onClick={() => dispatch(decreaseItemQty(pizzaId))}
            >
                -
            </Button>
            <span className="text-sm font-medium">{cartQty}</span>
            <Button
                type="round"
                onClick={() => dispatch(increaseItemQty(pizzaId))}
            >
                +
            </Button>
        </div>
    )
}

export default UpdateItemQty
