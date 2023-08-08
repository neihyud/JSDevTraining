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

const ModalSpecificProduct = ({ openModal, isOpen }) => {
  const dispatch = useDispatch()
  const fetch = useAuthenticatedFetch()
  const [isLoading, setIsLoading] = useState(false)

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

  const [textFieldValue, setTextFieldValue] = useState('')
  const handleTextFieldChange = async (value) => {
    setTextFieldValue(value)

    if (value) {
      console.log('Search True')
      console.log('Value: ', value)

      setPageInfoSearch([])
      setIsLoading(true)

      console.log('Products Search: ', productsSearch)
      console.log(
        'Query: ',
        `/api/products?endCursor=${pageInfoSearch.endCursor}&hasNextPage=${pageInfoSearch.hasNextPage}&q=${value}`
      )

      fetch(
        `/api/products?endCursor=${pageInfoSearch.endCursor}&hasNextPage=${pageInfoSearch.hasNextPage}&q=${value}`
      )
        .then((res) => res.json())
        .then(({ data }) => {
          console.log('data: ', data)
          console.log('Data: ', data.products)
          setPageInfoSearch({ ...pageInfoSearch, ...data.pageInfo })
          setProductsSearch(() => [...data.products])
        })
        .catch((error) => {
          alert(error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  const specificProduct = useSelector(
    (state: RootState) => state.products.specificProducts
  )

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
    if (!isLoading && pageInfo.hasNextPage && !textFieldValue) {
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

    if (!isLoading && pageInfoSearch.hasNextPage && textFieldValue) {
      setIsLoading(true)
      console.log('TRUE SCROLL BOTTOM SEARCH')

      console.log(
        'Query: ',
        `/api/products?endCursor=${pageInfoSearch.endCursor}&hasNextPage=${pageInfoSearch.hasNextPage}&q=${textFieldValue}`
      )

      fetch(
        `/api/products?endCursor=${pageInfoSearch.endCursor}&hasNextPage=${pageInfoSearch.hasNextPage}&q=${textFieldValue}`
      )
        .then((res) => {
          res.json()
        })
        .then((info) => {
          const { data = {} } = info
          console.log('Scroll Data:  ', info)
          setPageInfoSearch({ ...pageInfoSearch, ...data.pageInfo })
          setProductsSearch([...productsSearch, ...data.products])
        })
        .finally(() => {
          setIsLoading(false)
        })

      // const { data = {} } = await res.json()

      // setPageInfoSearch({ ...pageInfoSearch, ...data.pageInfo })
      // setProductsSearch([...productsSearch, ...data.products])

      // setIsLoading(false)
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
                  value={textFieldValue}
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
                      valueSearch={textFieldValue}
                      productsSearch={productsSearch}
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
