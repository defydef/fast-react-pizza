import { formatCurrency } from '../../utilities/helpers'

/* eslint-disable react/prop-types */
function OrderItem({ item }) {
    const { ingredients, quantity, name, totalPrice } = item

    return (
        <li className="py-3">
            <div className="flex items-center justify-between text-sm">
                <p>
                    <span className="font-bold">{quantity}&times;</span> {name}
                </p>

                <p className="font-bold">{formatCurrency(totalPrice)}</p>
            </div>
            <div className="text-xs">{ingredients?.toString()}</div>
        </li>
    )
}

export default OrderItem
