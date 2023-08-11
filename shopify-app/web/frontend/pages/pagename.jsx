import { Button, Page } from '@shopify/polaris'

import React, { useState } from 'react'
import { useAuthenticatedFetch } from '../hooks'

export default function PageName() {
  const fetch = useAuthenticatedFetch()

  const topic = 'ORDERS_CREATE'
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateHook = async (topic) => {
    setIsLoading(true)
    fetch('/api/webhooks/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topic: topic }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
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
        onClick={() => handleCreateHook('ORDERS_CREATE')}
        loading={isLoading}
        disabled={isLoading}
      >
        CREATE HOOK ORDERS_CREATE
      </Button>

      <Button
        onClick={() => handleCreateHook('CUSTOMERS_CREATE')}
        loading={isLoading}
        disabled={isLoading}
      >
        CREATE HOOK CUSTOMERS_CREATE
      </Button>
    </Page>
  )
}
