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
  const [pageInfo, setPageInfo] = useState({
    endCursor: '',
    hasNextPage: false,
  })

  const [pageInfoSearch, setPageInfoSearch] = useState({
    endCursor: '',
    hasNextPage: false,
  })

  const [tagsSearch, setTagsSearch] = useState([])

  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const [searchTerm, setSearchTerm] = useState('')

  const debouncedValue = useDebounce(searchTerm, 500)

  // once call
  const selectedTag = useSelector(
    (state: RootState) => state.products.productTags,
    () => true
  )

  /// ====== =======

  useEffect(async () => {
    if (isLoading) {
      const res = await fetch('/api/shop/productTags')
      const { data = {} } = await res.json()

      setIsLoading(false)
      dispatch({ type: 'GET_TAGS', payload: data.tags })
      setPageInfo(() => ({ ...data.pageInfo }))
    }
  }, [])

  useEffect(() => {
    setSelectedOptions(selectedTag)
  }, [selectedTag])

  useEffect(() => {
    dispatch({
      type: 'UPDATE_PRODUCT_TAG',
      payload: [...selectedOptions],
    })
  }, [dispatch, selectedOptions])

  let willLoadMoreResults = searchTerm
    ? pageInfoSearch.hasNextPage
    : pageInfo.hasNextPage

  const removeTag = (tag: string) => () => {
    const options = [...selectedOptions]
    options.splice(options.indexOf(tag), 1)
    setSelectedOptions(options)
  }

  const updateText = (value) => {
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

  const selectedTagMarkup = hasSelectedOptions ? (
    <LegacyStack spacing="extraTight">{tagsMarkup}</LegacyStack>
  ) : null

  let allTagTemp = useSelector((state) => state.products.allTags).map((tag) => {
    return {
      value: `${tag.title}`,
      label: `${tag.title}`,
    }
  })

  const tags = allTagTemp.filter((tag) => {
    console.log('TAG: ', tag)
    return tag.value.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <LegacyStack vertical>
      <Autocomplete
        actionBefore={{
          content: 'Add',
          icon: CirclePlusMinor,
          onAction: () => {
            console.log('actionBefore clicked!')
          },
        }}
        allowMultiple
        options={tags}
        selected={selectedOptions}
        textField={textField}
        onSelect={setSelectedOptions}
        listTitle="SUGGESTED TAGS"
        loading={isLoading}
        // onLoadMoreResults={handleLoadMoreResults}
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
