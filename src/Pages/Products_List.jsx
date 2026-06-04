import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../redux/product_data/Product_Slice'
import ProductCard from '../Components/Product_Card'

const PAGE_SIZE = 10

const Products_List = () => {
  const dispatch = useDispatch()
  

  const { items = [], status = 'idle', error } = useSelector(
    (state) => state.products
  )

  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('none')
  const [page, setPage] = useState(1)

  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  // Extract categories
  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category))
    return ['All', ...Array.from(set)]
  }, [items])

  // Filter + sort
  const filtered = useMemo(() => {
    let list = [...items]

    if (query) {
      list = list.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase())
      )
    }

    if (category !== 'All') {
      list = list.filter((p) => p.category === category)
    }

    if (sort === 'asc') {
      list.sort((a, b) => a.price - b.price)
    }

    if (sort === 'desc') {
      list.sort((a, b) => b.price - a.price)
    }

    return list
  }, [items, query, category, sort])

  
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))

  const pageItems = useMemo(() => {
    return filtered.slice(
      (page - 1) * PAGE_SIZE,
      page * PAGE_SIZE
    )
  }, [filtered, page])

  
  useEffect(()=>{
    setPage(1)
  },[query,category,sort])
  
  
  if (status === 'loading') {
    return <div className="p-4">Loading products...</div>
  }

  if (status === 'error') {
    return (
      <div className="p-4 text-red-600">
        {error || 'Failed to load products'}
      </div>
    )
  }

  return (
    <div className="p-4">
      
      <div className="mb-4 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="border px-3 py-2 rounded w-full"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="none">Sort</option>
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-gray-500">No products found</div>
      )}

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pageItems.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="border px-3 py-1 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            Page {page} / {totalPages}
          </span>

          <button
            onClick={() =>
              setPage((p) => Math.min(totalPages, p + 1))
            }
            disabled={page === totalPages}
            className="border px-3 py-1 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Products_List