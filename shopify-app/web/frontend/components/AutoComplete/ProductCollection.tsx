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

const ProductCollection = ({ onFocusSpecificProduct, error }) => {
  return (
    <LegacyStack vertical>
      <TextField
        label=""
        placeholder="Vintage, cotton, summer"
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
    (state: RootState) => state.products.productCollection
  )

  const dispatch = useDispatch()
  const removeSpecificProducts = (id) => {
    dispatch({ type: 'REMOVE_PRODUCT_COLLECTION', payload: id })
  }
  return (
    <LegacyCard>
      <ResourceList
        resourceName={{ singular: 'customer', plural: 'customers' }}
        items={products}
        renderItem={(item) => {
          const { id, title, image } = item
          console.log('Image: ', image)
          const media = (
            <Thumbnail
              source={
                image
                  ? image.originalSrc
                  : 'data:image/png;base64,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'
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

export default ProductCollection
