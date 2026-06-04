import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-5 flex flex-col border border-gray-100">
      <Link
        to={`/product/${product.id}`}
        className="flex-1 flex flex-col items-center text-center"
      >
        <img
          src={product.image}
          alt={product.title}
          className="mx-auto h-48 w-full object-contain p-2 hover:scale-105 transition-transform duration-300"
        />
        <h3 className="mt-4 font-semibold text-gray-800 text-sm line-clamp-2">
          {product.title}
        </h3>
      </Link>

      <div className="mt-3 flex items-center justify-between">
        <div className="font-bold text-lg text-gray-900">
          ${product.price.toFixed(2)}
        </div>
        <div className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
          {product.category}
        </div>
      </div>

      <div className="text-sm mt-3 flex items-center gap-1 text-yellow-600 font-medium">
        ⭐ {product.rating?.rate ?? 'N/A'}
      </div>
    </div>
  )
}

export default ProductCard