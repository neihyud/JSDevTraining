import { Button, Page } from '@shopify/polaris'

import React, { useState } from 'react'
import { useAuthenticatedFetch } from '../hooks'

export default function PageName() {
  const fetch = useAuthenticatedFetch()

  const topic = 'ORDERS_CREATE'
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateHook = async () => {
    setIsLoading(true)
    fetch('/api/webhooks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': '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',
        // 'X-Shopify-API-Version': '2023-07',
        // 'X-Shopify-Shop-Domain': 'spfy8.myshopify.com',
        // 'X-Shopify-Hmac-Sha256': 'OwNPlf9HyR18zhusUgPbI00pSSdkD8SMXXAW9JXoiMM=',
        // 'X-Shopify-Topic': 'orders/create',
        // 'X-Shopify-Webhook-Id': '3f0689ae-eae5-42b3-a9b1-13287bba4739',
      },
      body: JSON.stringify({ topic: topic }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        console.log(data.message)
      })
      .catch((error) => {
        alert(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Page>
      <Button
        onClick={handleCreateHook}
        loading={isLoading}
        disabled={isLoading}
      >
        CREATE HOOK
      </Button>
    </Page>
  )
}
