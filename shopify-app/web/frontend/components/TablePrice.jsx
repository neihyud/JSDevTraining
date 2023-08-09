import { DataTable, Layout, Spinner } from '@shopify/polaris'
import React, { memo, useEffect, useState } from 'react'

const TablePrice = ({ rows, isLoading, currencyCode }) => {
  return (
    <div style={{ maxHeight: '785px', overflow: 'auto' }}>
      <Layout.Section secondary>
        <DataTable
          columnContentTypes={['text', 'numeric', 'numeric']}
          headings={[
            <b>Product</b>,
            <b>Old Price ({currencyCode})</b>,
            <b>New Price ({currencyCode})</b>,
          ]}
          rows={rows}
          verticalAlign="bottom"
          hasZebraStripingOnData={true}
        />
        {isLoading && (
          <div
            style={{
              position: 'relative',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              marginTop: '50px',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Spinner size="large" />
          </div>
        )}
      </Layout.Section>
    </div>
  )
}

export default memo(TablePrice)
