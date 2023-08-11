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

import {
  getProducts,
  handleSelected,
  updateProducts,
} from '../../store/actions/product'

const ModalSpecificProduct = ({ openModal, isOpen }) => {
  const dispatch = useDispatch()
  const fetch = useAuthenticatedFetch()

  useEffect(() => {
    console.log('MOUNT ...')
  }, [])

  const { pageInfo, isLoading, specificProducts, allProducts } = useSelector(
    (state) => state.products
  )

  const { endCursor, hasNextPage } = pageInfo

  const [selectedItems, setSelectedItems] = useState([])

  const [searchTerm, setSearchTerm] = useState('')

  const debouncedValue = useDebounce(searchTerm, 500)

  const [productTemp, setProductTemp] = useState([])

  const saveModal = () => {
    openModal((isOpen) => !isOpen)
    dispatch(updateProducts({ productTemp }))
    dispatch({ type: 'RESET_STATE_PRODUCT' })
    setSearchTerm('')
  }

  const closeModal = () => {
    openModal((isOpen) => !isOpen)
    // setSelectedItems([])
    console.log('UNMOUNT ...')
    setSearchTerm('')
    dispatch({ type: 'RESET_STATE_PRODUCT' })
  }

  const handleTextFieldChange = (value) => {
    setSearchTerm(value)
  }

  const [isMount, setIsMount] = useState(false)
  useEffect(() => {
    const selected = specificProducts.map((product) => product.id)

    console.log('specificProducts: ', specificProducts)
    console.log('productTemp: ', productTemp)
    console.log('selected: ', selected)
    setSelectedItems(selected)
    // dispatch({ type: 'RESET_STATE_PRODUCT' })
    setIsMount(true)
  }, [isOpen])

  useEffect(() => {
    const params = { fetch, endCursor, hasNextPage, query: debouncedValue }

    dispatch(getProducts(params))
  }, [debouncedValue])

  useEffect(() => {
    if (!isMount) {
      return
    }
    handleSelectedItem()
  }, [selectedItems])

  const handleSelectedItem = () => {
    let data = []
    console.log('ProductTemp handle: ', productTemp)

    if (selectedItems.length > productTemp.length) {
      // const id = selectedItems[selectedItems.length - 1]
      // const product = allProducts.find((product) => product.id == id)

      const selectedTemp = selectedItems.map((id) => {
        // if ()
        const product = allProducts.find((product) => product.id == id)
        if (product) {
          return product
        }

        console.log('Product Temp: ', productTemp)
        return productTemp.find((product) => {
          console.log('Product: ', product)
          return product.id == id
        })
      })

      // data = [...productTemp, { ...product }]
      console.log('productTemp selected: ', selectedTemp)
      data.push(...selectedTemp)
    } else {
      data = productTemp.filter((product) => {
        return selectedItems.includes(product.id)
      })
    }

    setProductTemp(() => [...data])
  }

  const handleScrollBottom = () => {
    if (!isLoading && hasNextPage) {
      const params = {
        fetch,
        hasNextPage,
        endCursor,
        query: searchTerm,
        isLazyLoading: true,
      }

      dispatch(getProducts(params))
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

const ResourceListProduct = ({ selectedItems, setSelectedItems }) => {
  const resourceName = {
    singular: 'product',
    plural: 'products',
  }

  const { allProducts: items, isLoading } = useSelector(
    (state) => state.products
  )

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
