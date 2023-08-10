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
        'X-Shopify-API-Version': '',
        'X-Shopify-Shop-Domain': '',
        'X-Shopify-Hmac-Sha256': '',
        'X-Shopify-Topic': '',
        'X-Shopify-Webhook-Id': '',
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
