import { DataTable, Layout } from '@shopify/polaris'
import React, { memo, useEffect, useState } from 'react'
import { useAppQuery, useAuthenticatedFetch } from '../hooks'

const TablePrice = ({ rows }) => {
  return (
    <div style={{maxHeight: '700px', overflow: 'auto'}}>
      <Layout.Section secondary>
        <DataTable
          columnContentTypes={['text', 'text', 'text']}
          headings={[<b>Product</b>, <b>Old Price</b>, <b>New Price</b>]}
          rows={rows}
        />
      </Layout.Section>
    </div>
  )
}

export default memo(TablePrice)
