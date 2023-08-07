// =====================================
// @ts-nocheck
import { Autocomplete, LegacyStack } from '@shopify/polaris'
import React, { useState, useCallback, useEffect } from 'react'
import type { RootState } from '../../types/index'
import { useDispatch, useSelector } from 'react-redux'
import ResourceListProduct from '../Common/ResourceListProduct'
import { useAuthenticatedFetch } from '../../hooks'

const ProductCollection = ({ error }) => {
  const fetch = useAuthenticatedFetch()
  const paginationInterval = 25
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true)

  const [deselectedOptions, setDeselectedOptions] = useState([])

  useEffect(async () => {
    const res = await fetch('/api/collections')
    const { data = [] } = await res.json()

    const deselectedOptions = data.map((_, index) => ({
      value: `${_.id}`,
      label: `${_.title}`,
    }))

    setDeselectedOptions(deselectedOptions)
    setOptions(deselectedOptions)
    setIsLoading(false)

    dispatch({ type: 'GET_COLLECTIONS', payload: [...data] })
  }, [])

  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState(deselectedOptions)
  const [willLoadMoreResults, setWillLoadMoreResults] = useState(true)
  const [visibleOptionIndex, setVisibleOptionIndex] =
    useState(paginationInterval)

  // once call
  const selectedOptionsStore = useSelector(
    (state: RootState) => state.products.productCollection,
    () => true
  )

  const [isMount, setIsMount] = useState(false)
  if (!isMount) {
    setSelectedOptions(selectedOptionsStore)
    setIsMount(!isMount)
  }

  useEffect(() => {
    dispatch({
      type: 'UPDATE_PRODUCT_COLLECTION',
      payload: [...selectedOptions],
    })
  }, [dispatch, selectedOptions])

  const removeTag = useCallback(
    (tag: string) => () => {
      const options = [...selectedOptions]
      options.splice(options.indexOf(tag), 1)
      setSelectedOptions(options)
    },
    [selectedOptions]
  )

  const handleLoadMoreResults = useCallback(() => {
    if (willLoadMoreResults) {
      setIsLoading(true)

      setTimeout(() => {
        const remainingOptionCount = options.length - visibleOptionIndex
        const nextVisibleOptionIndex =
          remainingOptionCount >= paginationInterval
            ? visibleOptionIndex + paginationInterval
            : visibleOptionIndex + remainingOptionCount

        setIsLoading(false)
        setVisibleOptionIndex(nextVisibleOptionIndex)

        if (remainingOptionCount <= paginationInterval) {
          setWillLoadMoreResults(false)
        }
      }, 1000)
    }
  }, [willLoadMoreResults, visibleOptionIndex, options.length])

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value)

      if (value === '') {
        setOptions(deselectedOptions)
        return
      }

      const filterRegex = new RegExp(value, 'i')
      const resultOptions = deselectedOptions.filter((option) =>
        option.label.match(filterRegex)
      )

      setOptions(resultOptions)
    },
    [deselectedOptions]
  )

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label=""
      value={inputValue}
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
  const optionList = options.slice(0, visibleOptionIndex)
  const selectedTagMarkup = hasSelectedOptions ? tagsMarkup : null

  return (
    <LegacyStack vertical>
      <Autocomplete
        allowMultiple
        options={optionList}
        selected={selectedOptions}
        textField={textField}
        onSelect={setSelectedOptions}
        listTitle="SUGGESTED COLLECTIONS"
        loading={isLoading}
        onLoadMoreResults={handleLoadMoreResults}
        willLoadMoreResults={willLoadMoreResults}
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
