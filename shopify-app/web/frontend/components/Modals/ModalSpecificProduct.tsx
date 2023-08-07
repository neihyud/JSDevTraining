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

  const [selectedItems, setSelectedItems] = useState<
    ResourceListProps['selectedItems']
  >([])

  const saveModal = () => {
    console.log('SelectedItems: ', selectedItems)
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

  const handleTextFieldChange = useCallback((value) => {
    setTextFieldValue(value)
  }, [])

  const specificProduct = useSelector(
    (state: RootState) => state.products.specificProducts
  )
  useEffect(async () => {
    console.log('Use Effect running ...')
    const res = await fetch('/api/products')

    const { data = [] } = await res.json()

    // console.log('UE between: ', res)
    // const data = await res.json()

    // console.log('UE: ', data)

    dispatch({ type: 'GET_PRODUCTS', payload: [...data] })
  }, [])

  useEffect(() => {
    setSelectedItems(specificProduct)
  }, [specificProduct, isOpen])

  return (
    <>
      {/* <div style={{ height: '500px' }}> */}
      <Modal
        open={isOpen}
        onClose={closeModal}
        title="SELECT SPECIFIC PRODUCTS"
        primaryAction={{
          content: 'Save',
          onAction: saveModal,
        }}
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
                    ></ResourceListProduct>
                  </Scrollable>
                </div>
              </div>
            </Box>
          </LegacyStack>
        </Modal.Section>
      </Modal>
      {/* </div> */}
    </>
  )
}

const ResourceListProduct = ({
  selectedItems,
  setSelectedItems,
  valueSearch,
}) => {
  const resourceName = {
    singular: 'product',
    plural: 'products',
  }

  const items = useSelector((state) => state.products.allProducts).filter(
    (product) => {
      return product.title.toLowerCase().includes(valueSearch.toLowerCase())
    }
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
