// =====================================
// @ts-nocheck
import { Autocomplete, LegacyStack } from '@shopify/polaris'
import React, { useState, useCallback, useEffect } from 'react'
import type { RootState } from '../../types/index'
import { useDispatch, useSelector } from 'react-redux'
import ResourceListProduct from '../Common/ResourceListProduct'
import { useAuthenticatedFetch } from '../../hooks'
import useDebounce from '../../hooks/useDebounce'

const ProductCollection = ({ error }) => {
  const fetch = useAuthenticatedFetch()
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true)
  const [pageInfo, setPageInfo] = useState({
    endCursor: '',
    hasNextPage: false,
  })

  const [pageInfoSearch, setPageInfoSearch] = useState({
    endCursor: '',
    hasNextPage: false,
  })

  const [collectionsSearch, setCollectionsSearch] = useState([])

  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const [searchTerm, setSearchTerm] = useState('')

  const debouncedValue = useDebounce(searchTerm, 500)

  // once call
  const selectedCollection = useSelector(
    (state: RootState) => state.products.productCollection,
    () => true
  )

  useEffect(async () => {
    if (isLoading) {
      const res = await fetch('/api/collections')
      const { data = {} } = await res.json()

      setIsLoading(false)
      dispatch({ type: 'GET_COLLECTIONS', payload: data.collections })
      setPageInfo(() => ({ ...data.pageInfo }))
    }
  }, [])

  useEffect(() => {
    setSelectedOptions(selectedCollection)
  }, [selectedCollection])

  useEffect(() => {
    dispatch({
      type: 'UPDATE_PRODUCT_COLLECTION',
      payload: [...selectedOptions],
    })
  }, [dispatch, selectedOptions])

  useEffect(() => {
    setIsLoading(true)
    setCollectionsSearch([])
    setPageInfoSearch({ endCursor: '', hasNextPage: false })

    console.log('Debounced Value: ', debouncedValue)
    if (debouncedValue.trim()) {
      fetch(
        `/api/collections/?endCursor=${pageInfoSearch.endCursor}&hasNextPage=${pageInfoSearch.hasNextPage}&q=${debouncedValue}`
      )
        .then((res) => res.json())
        .then(({ data }) => {
          setPageInfoSearch({ ...pageInfoSearch, ...data.pageInfo })
          setCollectionsSearch([...data.collections])
        })
        .catch((error) => {
          alert(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      if (collectionsSearch.length != 0) setIsLoading(false)
    }
  }, [debouncedValue])

  let willLoadMoreResults = searchTerm
    ? pageInfoSearch.hasNextPage
    : pageInfo.hasNextPage

  const removeTag = (tag: string) => () => {
    const options = [...selectedOptions]
    options.splice(options.indexOf(tag), 1)
    setSelectedOptions(options)
  }

  const handleLoadMoreResults = () => {
    console.log('Loading more result ... ')
    if (willLoadMoreResults && !isLoading && !searchTerm) {
      setIsLoading(true)

      fetch(
        `/api/collections?endCursor=${pageInfo.endCursor}&hasNextPage=${pageInfo.hasNextPage}`
      )
        .then((res) => res.json())
        .then(({ data }) => {
          setPageInfo({ ...pageInfo, ...data.pageInfo })

          dispatch({ type: 'GET_COLLECTIONS', payload: data.collections })
        })
        .catch(() => {
          alert(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }

    if (willLoadMoreResults && !isLoading && searchTerm) {
      setIsLoading(true)

      fetch(
        `/api/collections?endCursor=${pageInfoSearch.endCursor}&hasNextPage=${pageInfoSearch.hasNextPage}&q=${searchTerm}`
      )
        .then((res) => res.json())
        .then(({ data }) => {
          setPageInfoSearch({ ...pageInfoSearch, ...data.pageInfo })
          setCollectionsSearch([...collectionsSearch, ...data.collections])
        })
        .catch(() => {
          alert(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  const updateText = (value) => {
    console.log('Value Search: ', value)
    setSearchTerm(value)
  }

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label=""
      value={searchTerm}
      placeholder="Vintage, cotton, summer"
      autoComplete="off"
    />
  )

  const hasSelectedOptions = selectedOptions.length > 0

  const tagsMarkup = hasSelectedOptions ? (
    <ProductCollectionsCard
      onRemove={removeTag}
      selectedOptions={selectedOptions}
    />
  ) : null

  const getOptions = (products) => {
    return products.map((product) => ({
      value: `${product.id}`,
      label: `${product.title}`,
    }))
  }

  let allCollectionTemp = useSelector((state) => state.products.allCollection)

  const collections = searchTerm
    ? getOptions(collectionsSearch)
    : getOptions(allCollectionTemp)

  const selectedTagMarkup = hasSelectedOptions ? tagsMarkup : null

  return (
    <LegacyStack vertical>
      <Autocomplete
        allowMultiple
        options={collections}
        selected={selectedOptions}
        textField={textField}
        onSelect={setSelectedOptions}
        listTitle="SUGGESTED COLLECTIONS"
        loading={isLoading}
        onLoadMoreResults={handleLoadMoreResults}
        willLoadMoreResults={willLoadMoreResults}
        preferredPosition={'below'}
        emptyState={
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: '700',
            }}
          >
            No collection
          </div>
        }
      />
      {error && (
        <span style={{ color: 'red', position: 'relative', top: '-10px' }}>
          {error}
        </span>
      )}
      <div style={{ width: '100%' }}>{selectedTagMarkup}</div>
    </LegacyStack>
  )
}

const ProductCollectionsCard = ({ onRemove, selectedOptions }) => {
  const products = useSelector(
    (state: RootState) => state.products.allCollection
  ).filter((product) => {
    return selectedOptions.includes(product.id)
  })

  // console.log('Products: ', products)
  return <ResourceListProduct products={products} onRemove={onRemove} />
}

export default ProductCollection
