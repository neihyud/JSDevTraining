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

const SpecificProduct = ({ onFocusSpecificProduct, error }) => {
  return (
    <LegacyStack vertical>
      <TextField
        label=""
        placeholder="Search product"
        autoComplete="off"
        onFocus={onFocusSpecificProduct}
        error={error}
      />
      <LegacyCard>
        <SpecificProductsCard></SpecificProductsCard>
      </LegacyCard>
    </LegacyStack>
  )
}

const SpecificProductsCard = () => {
  const products = useSelector(
    (state: RootState) => state.products.specificProducts
  )

  const dispatch = useDispatch()
  const removeSpecificProducts = (id) => {
    dispatch({ type: 'REMOVE_SPECIFIC_PRODUCT', payload: id })
  }
  return (
    <LegacyCard>
      <ResourceList
        resourceName={{ singular: 'customer', plural: 'customers' }}
        items={products}
        renderItem={(item) => {
          const { id, title, images = [] } = item
          // const { src = '' } = item
          console.log('IMAGES: ', images)
          const media = (
            <Thumbnail
              source={
                images.length != 0
                  ? images[0].originalSrc
                  : 'data:image/jpeg;base64,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'
              }
              alt="Black choker necklace"
            />
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
                  onClick={() => removeSpecificProducts(id)}
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
