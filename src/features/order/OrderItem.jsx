import { formatCurrency } from '../../utilities/helpers'

/* eslint-disable react/prop-types */
function OrderItem({ item, isLoadingIngredients }) {
    const { ingredients, quantity, name, totalPrice } = item

    return (
        <li className="py-3">
            <div className="flex items-center justify-between text-sm">
                <p>
                    <span className="font-bold">{quantity}&times;</span> {name}
                </p>

                <p className="font-bold">{formatCurrency(totalPrice)}</p>
            </div>
            <p className="text-xs capitalize italic text-stone-500">
                {isLoadingIngredients ? 'Loading...' : ingredients?.toString()}
            </p>
        </li>
    )
}

export default OrderItem
