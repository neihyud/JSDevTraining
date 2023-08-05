import { Page } from '@shopify/polaris'

import React from 'react'
import { Provider, ResourcePicker } from '@shopify/app-bridge-react'
import { useAppQuery } from '../hooks'
import { useEffect } from 'react'

export default function PageName() {
  const handleSelection = (selectionPayload) => {
    console.log('selection: ', selectionPayload)
  }

  const {
    data  
  } = useAppQuery({
    url: '/api/shop/productTags',
    reactQueryOptions: {
      onSuccess: () => {
        // setIsLoading(false)
        console.log("loading false")
      },
    },
  })

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch('/api/shop/productTags')
  //         console.log('Json: ', await response.json())
  //       } catch (err) {
  //         console.log(err)
  //       }
  //     }
  //     fetchData()
  //   }, [])

  console.log('Return: ', data)

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
