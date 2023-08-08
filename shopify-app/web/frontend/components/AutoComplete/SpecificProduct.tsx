// @ts-nocheck

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../types'

import {
  LegacyCard,
  LegacyStack,
  ResourceItem,
  ResourceList,
  TextField,
  Thumbnail,
  Text,
  Icon,
} from '@shopify/polaris'

import { CancelMajor } from '@shopify/polaris-icons'

const SpecificProduct = ({ handleFocusSpecificProduct, error }) => {
  let specificProducts = useSelector(
    (state: RootState) => state.products.specificProducts
  )

  const dispatch = useDispatch()
  const removeSpecificProducts = (id) => {
    console.log('ID specific products: ', id)
    dispatch({ type: 'REMOVE_SPECIFIC_PRODUCT', payload: id })
  }

  return (
    <LegacyStack vertical>
      <TextField
        label=""
        placeholder="Search product"
        autoComplete="off"
        onFocus={handleFocusSpecificProduct}
        error={error}
      />
      <LegacyCard>
        <SpecificProductsCard
          onRemove={removeSpecificProducts}
          selectedOptions={specificProducts}
        ></SpecificProductsCard>
      </LegacyCard>
    </LegacyStack>
  )
}

const SpecificProductsCard = ({ onRemove, selectedOptions }) => {
  const products = useSelector(
    (state: RootState) => state.products.allProducts
  ).filter((product) => {
    return selectedOptions.includes(product.id)
  })

  return (
    <LegacyCard>
      <ResourceList
        resourceName={{ singular: 'customer', plural: 'customers' }}
        items={products}
        renderItem={(item) => {
          const { id, title, url } = item
          const media = (
            <Thumbnail source={`${url}`} alt="Black choker necklace" />
          )

          return (
            <ResourceItem
              id={id}
              url={''}
              media={media}
              accessibilityLabel={`View details for ${title}`}
            >
              <div style={{ padding: '20px 0' }}>
                <Text variant="bodyMd" fontWeight="bold" as="h3">
                  {title}
                </Text>
                <span
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    padding: '5px',
                  }}
                  onClick={() => onRemove(id)}
                >
                  <Icon source={CancelMajor} color="base" />
                </span>
              </div>
            </ResourceItem>
          )
        }}
      />
    </LegacyCard>
  )
}

export default SpecificProduct
