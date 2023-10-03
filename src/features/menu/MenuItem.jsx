import { formatCurrency } from '../../utilities/helpers'
import Button from '../../ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../cart/cartSlice'

/* eslint-disable react/prop-types */
function MenuItem({ pizza }) {
    const {
        id: pizzaId,
        name,
        unitPrice,
        ingredients,
        soldOut,
        imageUrl,
    } = pizza
    const dispatch = useDispatch()
    const cart = useSelector((store) => store.cart)

    function addItemToCart(e) {
        e.preventDefault()
        dispatch(
            addItem({
                pizzaId,
                name,
                unitPrice,
                quantity: 1,
                totalPrice: unitPrice,
            })
        )
        // const addedItem = cart.find((item) => item.pizzaId === pizzaId)
        console.log(cart)
    }

    return (
        <li className="flex gap-4 py-2 pt-0.5">
            <img
                src={imageUrl}
                alt={name}
                className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
            />
            <div className="flex grow flex-col">
                <p className="font-medium">{name}</p>
                <p className="text-sm capitalize italic text-stone-500">
                    {ingredients.join(', ')}
                </p>
                <div className="mt-auto flex items-center justify-between">
                    {!soldOut ? (
                        <p className="text-sm">{formatCurrency(unitPrice)}</p>
                    ) : (
                        <p className="text-sm font-medium uppercase text-stone-500">
                            Sold out
                        </p>
                    )}
                    {!soldOut && (
                        <Button type="small" onClick={addItemToCart}>
                            Add to cart
                        </Button>
                    )}
                </div>
            </div>
        </li>
    )
}

export default MenuItem
