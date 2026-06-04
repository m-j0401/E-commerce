import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Product_Detail = () => {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return

    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError('')

        const res = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        )

        setProduct(res.data)
      } catch (err) {
        setError('Failed to load product')
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return <div className="p-4 text-blue-600 font-medium">Loading product...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500 font-medium">{error}</div>
  }
    
  if (!product) {
    return <div className="p-4 text-gray-500">No product found</div>
  }


  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-10 border border-gray-100">

        <div className="flex flex-col lg:flex-row gap-10">

          {/* Image */}
          <div className="lg:w-1/3 flex justify-center bg-gray-50 rounded-xl p-6">
            <img
              src={product.image}
              alt={product.title}
              className="h-80 object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">
              {product.title}
            </h1>

            <p className="mt-3 text-2xl font-extrabold text-green-600">
              ${product.price?.toFixed(2)}
            </p>

            <p className="mt-3 text-sm inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
              {product.category}
            </p>

            <p className="mt-6 text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-6 flex items-center gap-2 text-yellow-500 font-semibold">
              ⭐ {product.rating?.rate ?? 'N/A'}
              <span className="text-gray-500 text-sm">
                ({product.rating?.count ?? 0} reviews)
              </span>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default Product_Detail