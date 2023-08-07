// @ts-nocheck
import React, { useCallback, useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
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
import { RootState, IErrorForm } from '../types'
import { useAppQuery } from '../hooks'
import TablePrice from '../components/TablePrice'

const PricingRulePage = () => {
  const [error, setError] = useState<IErrorForm>({
    storeName: '',
    priority: '',
    empField2: false,
    empField3: false,
    empField4: false,
    amount1: '',
    amount2: '',
    amount3: '',
  })

  const [storeName, setStoreName] = useState('')

  // const [isLoading, setIsLoading] = useState(true)

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

  // Apply to Product

  const [selectedProduct, setSelectedProduct] = useState(['1'])

  const handleSelectChangeProduct = useCallback(
    (value) => setSelectedProduct(value),
    []
  )

  // Custom Prices
  const [selectedPrice, setSelectedPrice] = useState(['1'])

  const handleSelectChangePrice = useCallback((value) => {
    setAmount('0')
    setSelectedPrice(value)
  }, [])

  const [amount, setAmount] = useState('0')

  const handleAmount = (newValue) => {
    setAmount(newValue)
    setError((error) => ({
      ...error,
      [`amount${selectedPrice[0]}`]: '',
    }))
  }

  const handleBlurAmount = () => {
    let amountTemp = parseFloat(amount)

    if (selectedPrice[0] == '1' && amountTemp < 1) {
      amountTemp = 1
    } else if (selectedPrice[0] == '2') {
      amountTemp = Math.ceil(amountTemp) < 1 ? 1 : Math.ceil(amountTemp)
    } else if (
      selectedPrice[0] == '3' &&
      (amountTemp < 1 || amountTemp > 100)
    ) {
      setError((error) => ({
        ...error,
        amount3: 'Discount value must be between 1 and 100',
      }))
    } else if (selectedPrice[0] == '2' && amountTemp < 1) {
      setError((error) => ({
        ...error,
        amount2: 'Discount value must be greater than 0',
      }))

      setAmount(() => amountTemp.toString())
    }
  }

  // ================= Common ========================

  const specificsProducts = useSelector(
    (state: RootState) => state.products.specificProducts
  )
  let lenSpecificProduct = specificsProducts.length

  const collectionProduct = useSelector(
    (state: RootState) => state.products.productCollection
  )
  let letCollectionProduct = collectionProduct.length

  const tagProduct = useSelector(
    (state: RootState) => state.products.productTags
  )
  let lenTagProduct = tagProduct.length

  useEffect(() => {
    setError((error) => ({ ...error, [`empField${selectedProduct[0]}`]: '' }))
  }, [lenSpecificProduct, letCollectionProduct, lenTagProduct])

  const handleSubmitPage = () => {
    const err: any = {}

    if (!storeName.trim()) {
      err.storeName = 'Name is required!'
    }

    if (0 < parseInt(priority) && parseInt(priority) > 99) {
      err.priority = 'Priority must have a value between 0 and 99'
    }

    if (
      (selectedProduct[0] == '2' && lenSpecificProduct == 0) ||
      (selectedProduct[0] == '3' && letCollectionProduct == 0) ||
      (selectedProduct[0] == '4' && lenTagProduct == 0)
    ) {
      err[`empField${selectedProduct[0]}`] = 'Field must be added'
    }

    if (
      (selectedPrice[0] == '3' && parseFloat(amount) < 1) ||
      parseFloat(amount) > 100
    ) {
      err.amount3 = 'Discount value must be between 1 and 100'
    } else if (
      (selectedPrice[0] == '2' && parseFloat(amount) < 1) ||
      parseFloat(amount) > 100
    ) {
      err.amount2 = 'Discount value must be greater than 1'
    }

    if (Object.keys(err).length > 0) {
      setError(err)
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    } else {
      console.log('No error')
      handleTable()
    }
  }

  const [query, setQuery] = useState('')

  // const { data = {} } = useAppQuery({
  //   url: '/api/product/tablePrice',
  //   fetchInit: {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ query: query }),
  //   },
  //   reactQueryOptions: {
  //     // disable this query from automatically running.
  //     enabled: query ? true : false,
  //     onSuccess: () => {
  //       setIsLoading(false)
  //     },
  //     onError: () => {
  //       console.log('Error: ')
  //     },
  //     queryFn: async () => {
  //       console.log('QueryFn')
  //       return 'sga'
  //     },
  //   },
  // })

  const handleTable = () => {
    let query = ''
    let subQuery = ''

    switch (selectedProduct[0]) {
      case '1':
        query = `{ products (first: 25) { edges { node { title variants(first: 20) { edges { node { price } } } } } } }`
        break
      case '2':
        subQuery = specificsProducts
          .map((product) => {
            const arr = product.id.split('/')
            return `id:${arr[arr.length - 1]}`
          })
          .join(' OR ')

        query = `{
            products (first: 25, query:"${subQuery}") {
              edges {
                node {
                  id
                  title
                }
              }
            }
          }`
        break
      case '3':
        subQuery = collectionProduct
          .map((collection) => {
            const arr = collection.id.split('/')
            return `id:${arr[arr.length - 1]}`
          })
          .join(' OR ')

        query = `{
            collections (first:25, query:"${subQuery}") {
              edges {
                node {
                  products(first:25) {
                    edges {
                      node {
                        title
                      }
                    }
                  }
                }
              }
            }
          }`
        break
      default:
        query = ''
    }

    setQuery(query)
    console.log('End')
  }

  let additionalFieldProduct = <></>

  switch (selectedProduct[0]) {
    case '2':
      additionalFieldProduct = (
        <SpecificProduct
          onFocusSpecificProduct={() => setOpenTypeModal('2')}
          error={error.empField2}
        />
      )
      break
    case '3':
      additionalFieldProduct = (
        <ProductCollection
          onFocusSpecificProduct={() => setOpenTypeModal('3')}
          error={error.empField3}
        />
      )
      break
    case '4':
      additionalFieldProduct = <ProductTags error={error.empField4} />
      break
    default:
      additionalFieldProduct = null
  }

  return (
    // <Provider store={store}>
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
                type="number"
                error={error[`amount${selectedPrice[0]}`]}
                onBlur={handleBlurAmount}
              />
            </FormLayout>
          </LegacyCard>
        </Layout.Section>

        <TablePrice query={query} />
        {/* <Layout.Section secondary>
          <DataTable
            columnContentTypes={['text', 'text']}
            headings={['Title', 'Modified Price']}
            rows={rows}
          />
        </Layout.Section> */}
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
    // </Provider>
  )
}

const WrapperPricingRule = () => {
  return (
    <Provider store={store}>
      <PricingRulePage />
    </Provider>
  )
}

export default WrapperPricingRule
