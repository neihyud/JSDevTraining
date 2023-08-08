// @ts-nocheck

import {
  Modal,
  LegacyStack,
  Box,
  TextField,
  Icon,
  Scrollable,
  LegacyCard,
  ResourceList,
  ResourceItem,
  Text,
  Thumbnail,
  Spinner,
} from '@shopify/polaris'
import { SearchMajor } from '@shopify/polaris-icons'
import type { ResourceListProps } from '@shopify/polaris'

import React, { useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../types'
import { useAuthenticatedFetch } from '../../hooks'
import useDebounce from '../../hooks/useDebounce'

const ModalSpecificProduct = ({ openModal, isOpen }) => {
  const dispatch = useDispatch()
  const fetch = useAuthenticatedFetch()
  const [isLoading, setIsLoading] = useState(false)
  const [isHasData, setIsHasData] = useState(false)
  const [pageInfo, setPageInfo] = useState({
    endCursor: '',
    hasNextPage: false,
  })

  const [pageInfoSearch, setPageInfoSearch] = useState({
    endCursor: '',
    hasNextPage: false,
  })

  const [productsSearch, setProductsSearch] = useState([])

  const [selectedItems, setSelectedItems] = useState<
    ResourceListProps['selectedItems']
  >([])

  const [searchTerm, setSearchTerm] = useState('')

  const debouncedValue = useDebounce(searchTerm, 500)

  const saveModal = () => {
    openModal((isOpen) => !isOpen)
    dispatch({
      type: 'UPDATE_SPECIFIC_PRODUCT',
      payload: [...selectedItems],
    })
  }

  const closeModal = () => {
    openModal((isOpen) => !isOpen)
    setSelectedItems([])
  }

  const handleTextFieldChange = (value) => {
    setSearchTerm(value)
  }

  const specificProduct = useSelector(
    (state: RootState) => state.products.specificProducts
  )

  useEffect(() => {
    setIsLoading(true)
    setProductsSearch([])
    setPageInfoSearch({ endCursor: '', hasNextPage: false })

    if (debouncedValue.trim()) {
      console.log('Search True')

      console.log('Products Search: ', productsSearch)
      console.log(
        'Query: ',
        `/api/products?endCursor=${pageInfoSearch.endCursor}&hasNextPage=${pageInfoSearch.hasNextPage}&q=${debouncedValue}`
      )

      fetch(
        `/api/products?endCursor=${pageInfoSearch.endCursor}&hasNextPage=${pageInfoSearch.hasNextPage}&q=${debouncedValue}`
      )
        .then((res) => res.json())
        .then(({ data }) => {
          setPageInfoSearch({ ...pageInfoSearch, ...data.pageInfo })
          setProductsSearch(() => [...data.products])
        })
        .catch((error) => {
          alert(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      // setPageInfoSearch({ endCursor: '', hasNextPage: false })
      // setProductsSearch([])
      setIsLoading(false)
    }
  }, [debouncedValue])

  useEffect(async () => {
    if (!isLoading) {
      const res = await fetch('/api/products')

      const { data = {} } = await res.json()

      dispatch({ type: 'GET_PRODUCTS', payload: [...data.products] })
      setPageInfo(() => ({ ...data.pageInfo }))
    }
  }, [])

  useEffect(() => {
    setSelectedItems(specificProduct)
  }, [specificProduct, isOpen])

  const handleScrollBottom = () => {
    // loading: false thi ms xu ly
    if (!isLoading && pageInfo.hasNextPage && !searchTerm) {
      console.log('TRUE SCROLL BOTTOM')

      setIsLoading(true)

      fetch(
        `/api/products?endCursor=${pageInfo.endCursor}&hasNextPage=${pageInfo.hasNextPage}`
      )
        .then((res) => res.json())
        .then(({ data }) => {
          setPageInfo({ ...pageInfo, ...data.pageInfo })
          dispatch({ type: 'GET_PRODUCTS', payload: data.products })
        })
        .catch((error) => {
          // handle Error
          alert(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }

    if (!isLoading && pageInfoSearch.hasNextPage && searchTerm) {
      setIsLoading(true)
      console.log('TRUE SCROLL BOTTOM SEARCH')

      console.log(
        'Query: ',
        `/api/products?endCursor=${pageInfoSearch.endCursor}&hasNextPage=${pageInfoSearch.hasNextPage}&q=${debouncedValue}`
      )

      fetch(
        `/api/products?endCursor=${pageInfoSearch.endCursor}&hasNextPage=${pageInfoSearch.hasNextPage}&q=${debouncedValue}`
      )
        .then((res) => res.json())
        .then((info) => {
          const { data = {} } = info
          console.log('Scroll Data:  ', info)
          setPageInfoSearch({ ...pageInfoSearch, ...data.pageInfo })
          setProductsSearch([...productsSearch, ...data.products])
        })
        .finally(() => {
          console.log('Finally ...')
          setIsLoading(false)
        })
    }
  }

  return (
    <>
      <Modal
        open={isOpen}
        onClose={closeModal}
        title="SELECT SPECIFIC PRODUCTS"
        primaryAction={{
          content: 'Save',
          onAction: saveModal,
        }}
        onScrolledToBottom={handleScrollBottom}
      >
        <Modal.Section>
          <LegacyStack vertical>
            <Box>
              <div>
                <TextField
                  label=""
                  value={searchTerm}
                  onChange={handleTextFieldChange}
                  prefix={<Icon source={SearchMajor} color="base" />}
                  autoComplete="off"
                  placeholder="Product Name"
                />
                <div>
                  <Scrollable>
                    <ResourceListProduct
                      selectedItems={selectedItems}
                      setSelectedItems={setSelectedItems}
                      valueSearch={searchTerm}
                      productsSearch={productsSearch}
                      isLoading={isLoading}
                    ></ResourceListProduct>
                  </Scrollable>
                </div>
              </div>
            </Box>
          </LegacyStack>
        </Modal.Section>
        {isLoading && (
          <div
            style={{
              width: '100%',
              margin: '10px 0',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Spinner size="large" />
          </div>
        )}
      </Modal>
    </>
  )
}

const ResourceListProduct = ({
  selectedItems,
  setSelectedItems,
  valueSearch,
  productsSearch,
  isLoading,
}) => {
  const resourceName = {
    singular: 'product',
    plural: 'products',
  }

  const items = valueSearch
    ? productsSearch
    : useSelector((state) => state.products.allProducts)

  return (
    <LegacyCard>
      <ResourceList
        resourceName={resourceName}
        items={items}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable
      />
      {items.length == 0 && !isLoading ? (
        <div style={{ marginTop: '10px' }}>No product</div>
      ) : (
        <></>
      )}
    </LegacyCard>
  )

  function renderItem(item: (typeof items)[number]) {
    const { id, url, title } = item
    const media = <Thumbnail source={`${url}`} alt="Black choker necklace" />

    return (
      <ResourceItem
        id={id}
        url={url}
        media={media}
        accessibilityLabel={`View details for ${title}`}
      >
        <div style={{ padding: '20px 0' }}>
          <Text variant="bodyMd" fontWeight="bold" as="h3">
            {title}
          </Text>
        </div>
      </ResourceItem>
    )
  }
}

export default ModalSpecificProduct
