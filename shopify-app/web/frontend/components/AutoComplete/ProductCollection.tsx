// =====================================
// @ts-nocheck
import { Autocomplete, LegacyStack } from '@shopify/polaris'
import React, { useState, useCallback, useEffect } from 'react'
import type { RootState } from '../../types/index'
import { useDispatch, useSelector } from 'react-redux'
import ResourceListProduct from '../Common/ResourceListProduct'
import { useAuthenticatedFetch } from '../../hooks'
import {
  getCollections,
  resetStateProduct,
  updateCollection,
} from '../../store/actions/product'

const ProductCollection = ({ error }) => {
  const fetch = useAuthenticatedFetch()
  const dispatch = useDispatch()

  const { pageInfo, isLoading, productCollection, allCollection } = useSelector(
    (state) => state.collections
  )

  const { endCursor, hasNextPage } = pageInfo

  const [searchTerm, setSearchTerm] = useState('')

  const [selectedOptions, setSelectedOptions] = useState([])

  const [isMount, setIsMount] = useState(false)
  useEffect(() => {
    const selected = productCollection.map((collection) => collection.id)
    console.log('Mount ... ')
    setSelectedOptions(selected)
    setIsMount(true)
  }, [])

  console.log('selectedOptions: ', selectedOptions)

  useEffect(() => {
    const params = {
      fetch,
      hasNextPage,
      endCursor,
      query: searchTerm,
      type: 'collection',
    }

    localStorage.setItem('searchTerm', searchTerm)
    dispatch(getCollections(params))
  }, [searchTerm])

  useEffect(() => {
    if (isMount) {
      handleSelectedOptions()
    }
  }, [selectedOptions])

  const handleSelectedOptions = () => {
    let data = []

    console.log('ProductCollection: ', productCollection)
    if (selectedOptions.length > productCollection.length) {
      const selectedTemp = selectedOptions.map((id) => {
        const collection = allCollection.find(
          (collection) => collection.id == id
        )
        if (collection) {
          return collection
        }

        return productCollection.find((collection) => collection.id == id)
      })

      data.push(...selectedTemp)
    } else {
      data = productCollection.filter((collection) => {
        return selectedOptions.includes(collection.id)
      })
    }
    dispatch(updateCollection({ collectionTemp: [...data] }))

    // setCollectionTemp(() => [...data])
  }

  const removeTag = (tag: string) => () => {
    const options = [...selectedOptions]
    options.splice(options.indexOf(tag), 1)
    setSelectedOptions(options)
  }

  const handleLoadMoreResults = () => {
    if (!isLoading && hasNextPage) {
      const params = {
        fetch,
        hasNextPage,
        endCursor,
        query: searchTerm,
        isLazyLoading: true,
        type: 'collection',
      }
      dispatch(getCollections(params))
    }
  }

  const updateText = (value) => {
    setSearchTerm(value)
    dispatch(resetStateProduct())
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
      products={productCollection}
    />
  ) : null

  const getOptions = (products) => {
    return products.map((product) => ({
      value: `${product.id}`,
      label: `${product.title}`,
    }))
  }

  const collections = getOptions(allCollection)

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
        willLoadMoreResults={hasNextPage}
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

const ProductCollectionsCard = ({ onRemove, products }) => {
  // const products = useSelector(
  //   (state: RootState) => state.products.allCollection
  // ).filter((product) => {
  //   return selectedOptions.includes(product.id)
  // })

  // console.log('Products: ', products)
  console.log('Product: ', products)
  return (
    <ResourceListProduct
      products={products ? products : []}
      onRemove={onRemove}
    />
  )
}

export default ProductCollection
