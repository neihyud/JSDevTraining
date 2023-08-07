import { DataTable, Layout } from '@shopify/polaris'
import React, { memo, useState } from 'react'
import { useAppQuery } from '../hooks'

// Table
const rows = [
  ['t shirt', 'all variant prices - 20%'],
  ['Gift Card', 'all variant prices - 20%'],
  ['Stitch', '160.000'],
  ['Ayres Chambray', 'all variant prices - 20%'],
  ['Derby Tier Backpack', 'all variant prices - 20%'],
  ['Chevron', 'all variant prices - 20%'],
  ['% 5 Panel Camp cap', 'all variant prices - 20%'],
]

const TablePrice = ({ query  }) => {
  const [isLoading, setIsLoading] = useState(true)

  console.log('Query Table: ', query)

  //   if (!query) {
  //     setTestEnable(true)
  //   }

  const { data = {} } = useAppQuery({
    url: '/api/product/tablePrice',
    fetchInit: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: query  }),
    },
    reactQueryOptions: {
      // disable this query from automatically running.
      //   enabled: query ? true : false,
      enabled: true,
        refetchOnReconnect: 'always',
      queryKey: [query],
      onSuccess: () => {
        setIsLoading(false)
        // setTestEnable(true)
        // setQuery(() => '')
      },
      onError: () => {
        console.log('Error: ')
      },

    },
  })

  if (!isLoading) {
    console.log('DATA TABLE MAIN: ', data)
    // setTestEnable(false)
  }

  return (
    <>
      <Layout.Section secondary>
        <DataTable
          columnContentTypes={['text', 'text']}
          headings={['Title', 'Modified Price']}
          rows={rows}
        />
      </Layout.Section>
    </>
  )
}

export default memo(TablePrice)
