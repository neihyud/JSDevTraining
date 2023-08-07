import { Page } from '@shopify/polaris'

import React, { useState } from 'react'
import { Provider, ResourcePicker } from '@shopify/app-bridge-react'
import { useAppQuery } from '../hooks'
import { useEffect } from 'react'

export default function PageName() {
  const handleSelection = (selectionPayload) => {
    console.log('selection: ', selectionPayload)
  }

  // const {
  //   data
  // } = useAppQuery({
  //   url: '/api/shop/productTags',
  //   reactQueryOptions: {
  //     onSuccess: () => {
  //       // setIsLoading(false)
  //       console.log("loading false")
  //     },
  //   },
  // })

  const [isLoading, setIsLoading] = useState(true)

  const query =
    '{ products (first: 25) { edges { node { title variants(first: 20) { edges { node { price } } } } } } }'
    
  const { data = {} } = useAppQuery({
    url: '/api/product/tablePrice',
    fetchInit: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: query }),
    },
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false)
        console.log('DATA TABLE: ', data)
      },
      onError: (error) => {
        console.log('Error: ', error)
      },
    },
  })

  if (!isLoading) {
    console.log('Return: ', data)
  }

  return (
    <Page>
      <ResourcePicker
        resourceType="Product"
        open={true}
        onSelection={handleSelection}
        initialSelectionIds={[{ id: 'gid://shopify/Product/8434853871914' }]}
      />
      <h1 style={{ fontSize: '55px', position: 'relative', left: 0 }}>
        Page Active
      </h1>
    </Page>
  )
}
