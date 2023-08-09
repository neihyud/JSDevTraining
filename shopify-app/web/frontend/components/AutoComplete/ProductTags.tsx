//  @ts-nocheck
import { Autocomplete, Tag, LegacyStack } from '@shopify/polaris'
import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../types'
import { CirclePlusMinor } from '@shopify/polaris-icons'
import { useAppQuery } from '../../hooks'
import { useAuthenticatedFetch } from '../../hooks'
import useDebounce from '../../hooks/useDebounce'


const ProductTags = ({ error }) => {

  const fetch = useAuthenticatedFetch()
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true)

  const { data = {} } = useAppQuery({
    url: '/api/shop/productTags',
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false)
      },
    },
  })

  const [deselectedOptions, setDeselectedOptions] = useState([])

  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState([])
  const [willLoadMoreResults, setWillLoadMoreResults] = useState(true)
  const [visibleOptionIndex, setVisibleOptionIndex] =
    useState(paginationInterval)

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

  // once call
  const selectedOptionsTag = useSelector(
    (state: RootState) => state.products.productTags,
    () => true
  )
  /// ====== =======
  const dispatch = useDispatch()

  useEffect(() => {
    let { data: temp = [] } = data

    const deselectedOptions = temp.map((_, index) => ({
      value: `${_.name}`,
      label: `${_.name}`,
    }))

    setDeselectedOptions(deselectedOptions)
    setOptions(deselectedOptions)
  }, [data])

  useEffect(() => {
    setSelectedOptions(selectedOptionsTag)
  }, [])

  useEffect(() => {
    dispatch({
      type: 'UPDATE_PRODUCT_TAG',
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

  const tagsMarkup = hasSelectedOptions
    ? selectedOptions.map((option) => {
        let tagLabel = ''
        tagLabel = option.replace('_', ' ')
        tagLabel = titleCase(tagLabel)
        return (
          <Tag key={`option${option}`} onRemove={removeTag(option)}>
            {tagLabel}
          </Tag>
        )
      })
    : null
  const optionList = options.slice(0, visibleOptionIndex)
  const selectedTagMarkup = hasSelectedOptions ? (
    <LegacyStack spacing="extraTight">{tagsMarkup}</LegacyStack>
  ) : null

  return (
    <LegacyStack vertical>
      <Autocomplete
        actionBefore={{
          accessibilityLabel: 'Action label',
          content: 'Add',
          icon: CirclePlusMinor,
          onAction: () => {
            console.log('actionBefore clicked!')
          },
        }}
        allowMultiple
        options={optionList}
        selected={selectedOptions}
        textField={textField}
        onSelect={setSelectedOptions}
        listTitle="SUGGESTED TAGS"
        loading={isLoading}
        onLoadMoreResults={handleLoadMoreResults}
        willLoadMoreResults={willLoadMoreResults}
      />
      {error && (
        <span style={{ color: 'red', position: 'relative', top: '-10px' }}>
          {error}
        </span>
      )}
      {selectedTagMarkup}
    </LegacyStack>
  )

  function titleCase(string: string) {
    return string
      .toLowerCase()
      .split(' ')
      .map((word) => {
        return word.replace(word[0], word[0].toUpperCase())
      })
      .join(' ')
  }
}

export default ProductTags
