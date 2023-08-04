import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  AppProvider as PolarisAppProvider,
  Page,
  Layout,
  TextField,
  FormLayout,
  LegacyCard,
  Select,
  DataTable,
  ChoiceList,
  Form,
  PageActions,
} from '@shopify/polaris'

import { Provider } from 'react-redux'
import store from '../store/index'

import ProductCollection from '../components/AutoComplete/ProductCollection'
import ProductTags from '../components/AutoComplete/ProductTags'
import SpecificProduct from '../components/AutoComplete/SpecificProduct'
import ProductResourcePicker from '../components/Modals/ProductResourcePicker'
import CollectionResourcePicker from '../components/Modals/CollectionResourcePicker'

const PricingRulePage = () => {
  const [error, setError] = useState({})
  const [storeName, setStoreName] = useState('')

  const handleStoreName = useCallback((newValue) => {
    setStoreName(newValue)
    setError((error) => ({ ...error, storeName: '' }))
  }, [])

  const [priority, setPriority] = useState('0')

  const handlePriority = useCallback((newValue) => {
    setPriority(newValue)
    setError((error) => ({ ...error, priority: '' }))
  }, [])

  const [selectedStatus, setSelectedStatus] = useState('enable')

  const handleChangeStatus = useCallback(
    (value) => setSelectedStatus(value),
    []
  )

  // Apply to Product
  const [openTypeModal, setOpenTypeModal] = useState('')

  // =================

  const options = [
    { label: 'Enable', value: 'enable' },
    { label: 'Disable', value: 'disable' },
  ]

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

  // Apply to Product

  const [selectedProduct, setSelectedProduct] = useState(['1'])

  const handleSelectChangeProduct = useCallback(
    (value) => setSelectedProduct(value),
    []
  )

  // Custom Prices
  const [selectedPrice, setSelectedPrice] = useState(['1'])

  const handleSelectChangePrice = useCallback(
    (value) => setSelectedPrice(value),
    []
  )

  const [amount, setAmount] = useState('0')

  const handleAmount = useCallback((newValue) => setAmount(newValue), [])

  // ================= Common ========================

  let additionalFieldProduct = null

  switch (selectedProduct[0]) {
    case '2':
      additionalFieldProduct = (
        <SpecificProduct onFocusSpecificProduct={() => setOpenTypeModal('2')} />
      )
      break
    case '3':
      additionalFieldProduct = (
        <ProductCollection
          onFocusSpecificProduct={() => setOpenTypeModal('3')}
        />
      )
      break
    case '4':
      additionalFieldProduct = <ProductTags />
      break
    default:
      additionalFieldProduct = <></>
  }

  const handleSubmitPage = () => {
    console.log('enter submit')

    const err = {}
    if (!storeName.trim()) {
      err.storeName = 'Name is required!'
    }

    if (0 < priority && priority > 99) {
      err.priority = 'Priority must have a value between 0 and 99'
    }

    if (Object.keys(err).length > 0) {
      console.log('Have Error')
    } else {
      console.log('No error')
    }

    setError(err)
  }

  return (
    <Provider store={store}>
      <Page
        title="New Pricing Rule"
        backAction={{ content: 'Products', url: '#' }}
      >
        <Layout>
          <Layout.Section>
            <LegacyCard title="General Information" sectioned>
              <FormLayout>
                <TextField
                  label="Name"
                  autoComplete="off"
                  value={storeName}
                  name="storeName"
                  onChange={handleStoreName}
                  error={error.storeName ? error.storeName : ''}
                />
                <TextField
                  label="Priority"
                  autoComplete="off"
                  type="number"
                  value={priority}
                  name="priority"
                  onChange={handlePriority}
                  min={'0'}
                  max={'99'}
                  error={error.priority ? error.priority : ''}
                />
                <Select
                  label="Status"
                  options={options}
                  onChange={handleChangeStatus}
                  value={selectedStatus}
                />
              </FormLayout>
            </LegacyCard>
            <LegacyCard title="Apply to Products" sectioned>
              <FormLayout>
                <ChoiceList
                  title=""
                  choices={[
                    {
                      label: 'All products',
                      value: '1',
                    },
                    {
                      label: 'Specific products',
                      value: '2',
                    },
                    {
                      label: 'Product Collections',
                      value: '3',
                    },
                    {
                      label: 'Product Tags',
                      value: '4',
                    },
                  ]}
                  selected={selectedProduct}
                  onChange={handleSelectChangeProduct}
                />

                {additionalFieldProduct}
              </FormLayout>
            </LegacyCard>
            <LegacyCard title="Custom Prices" sectioned>
              <FormLayout>
                <ChoiceList
                  title=""
                  choices={[
                    {
                      label: 'Apply a price to selected products',
                      value: '1',
                    },
                    {
                      label:
                        'Decrease a fixed amount of the original prices of selected products',
                      value: '2',
                    },
                    {
                      label:
                        'Decrease the original prices of selected products by a percentage (%)',
                      value: '3',
                    },
                  ]}
                  selected={selectedPrice}
                  onChange={handleSelectChangePrice}
                />

                <TextField
                  label="Amount"
                  autoComplete="off"
                  value={amount}
                  onChange={handleAmount}
                />
              </FormLayout>
            </LegacyCard>
          </Layout.Section>
          <Layout.Section secondary>
            <DataTable
              columnContentTypes={['text', 'text']}
              headings={['Title', 'Modified Price']}
              rows={rows}
            />
          </Layout.Section>
        </Layout>

        <ProductResourcePicker
          openModal={openTypeModal}
          setOpenTypeModal={setOpenTypeModal}
        />

        <CollectionResourcePicker
          openModal={openTypeModal}
          setOpenTypeModal={setOpenTypeModal}
        />
        <PageActions
          primaryAction={{
            content: 'Save',
            disabled: false,
            onAction: handleSubmitPage,
          }}
        />
      </Page>
    </Provider>
  )
}

export default PricingRulePage
