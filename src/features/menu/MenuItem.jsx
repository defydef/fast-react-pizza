import { formatCurrency } from '../../utilities/helpers'
import Button from '../../ui/Button'
import DeleteItem from '../cart/DeleteItem'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, getQtyById } from '../cart/cartSlice'
import UpdateItemQty from '../cart/UpdateItemQty'

/* eslint-disable react/prop-types */
function MenuItem({ pizza }) {
    const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza
    const dispatch = useDispatch()
    const cartQty = useSelector(getQtyById(id))

    function addItemToCart() {
        const newItem = {
            pizzaId: id,
            name,
            unitPrice,
            quantity: 1,
            totalPrice: unitPrice,
        }
        dispatch(addItem(newItem))
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
                    {cartQty > 0 && (
                        <div className="flex items-center gap-3 sm:gap-8">
                            <UpdateItemQty pizzaId={id} cartQty={cartQty} />{' '}
                            <DeleteItem pizzaId={id} />
                        </div>
                    )}

                    {!soldOut && !cartQty && (
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
