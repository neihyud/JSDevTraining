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

const SpecificProduct = ({ onFocusSpecificProduct }) => {
  return (
    <LegacyStack vertical>
      <TextField
        label=""
        placeholder="Search product"
        autoComplete="off"
        onFocus={onFocusSpecificProduct}
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
          const { id, title, images } = item
          // const { src = '' } = item
          const media = (
            <Thumbnail
              source={
                images[0].originalSrc
                  ? images[0].originalSrc
                  : 'https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg'
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
