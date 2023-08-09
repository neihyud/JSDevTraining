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
import { useAppQuery, useAuthenticatedFetch } from '../hooks'
import TablePrice from '../components/TablePrice'

import ModalSpecificProduct from '../components/Modals/ModalSpecificProduct'

const PricingRulePage = () => {
  const fetch = useAuthenticatedFetch()

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

  const [currencyCode, setCurrencyCode] = useState('')

  const [isOpenModal, setIsOpenModal] = useState(false)

  const [storeName, setStoreName] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const [rows, setRows] = useState([])

  const [pageInfo, setPageInfo] = useState({
    endCursor: '',
    hasNextPage: false,
  })

  useEffect(() => {
    fetch('/api/shop/currencyCode')
      .then((res) => res.json())
      .then((data) => {
        console.log('Daa - currencyCode: ', data)
        setCurrencyCode(data.currencyCode)
      })
      .catch((error) => alert(error))
  }, [])

  const handleFocusSpecificProduct = () => {
    setIsOpenModal(true)
  }

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
    // setAmount('0')
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

  // const handleBlurAmount = () => {
  //   let amountTemp = parseFloat(amount)

  //   if (selectedPrice[0] == '1' && amountTemp < 1) {
  //     amountTemp = 1
  //   } else if (selectedPrice[0] == '2') {
  //     amountTemp = Math.ceil(amountTemp) < 1 ? 1 : Math.ceil(amountTemp)
  //   } else if (
  //     selectedPrice[0] == '3' &&
  //     (amountTemp < 1 || amountTemp > 100)
  //   ) {
  //     setError((error) => ({
  //       ...error,
  //       amount3: 'Discount value must be between 1 and 100',
  //     }))
  //   } else if (selectedPrice[0] == '2' && amountTemp < 1) {
  //     setError((error) => ({
  //       ...error,
  //       amount2: 'Discount value must be greater than 0',
  //     }))
  //   }

  //   console.log('AmountTemp: ', amountTemp)
  //   setAmount(amountTemp.toString())
  // }

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

    if (0 > parseInt(priority) || parseInt(priority) > 99) {
      err.priority = 'Priority must have a value between 0 and 99'
    }

    if (
      (selectedProduct[0] == '2' && lenSpecificProduct == 0) ||
      (selectedProduct[0] == '3' && letCollectionProduct == 0) ||
      (selectedProduct[0] == '4' && lenTagProduct == 0)
    ) {
      err[`empField${selectedProduct[0]}`] = 'Field must be added'
    }

    console.log('SelectedPrice[0]: ', selectedPrice[0])

    switch (selectedPrice[0]) {
      case '3':
        if (
          amount.trim().length == 0 ||
          parseFloat(amount) < 1 ||
          parseFloat(amount) > 100
        ) {
          err.amount3 = 'Discount value must be between 1 and 100'
        }
        break
      case '2':
        if (amount.trim().length == 0 || parseFloat(amount) < 1) {
          err.amount2 = 'Discount value must be greater than 1'
        }
        break
      case '1':
        if (amount < 0) {
          err.amount1 = 'Discount value must be not empty'
        }
    }

    // if (
    //   selectedPrice[0] == '3' &&
    //   (amount.trim().length == 0 ||
    //     parseFloat(amount) < 1 ||
    //     parseFloat(amount) > 100)
    // ) {
    //   console.log('BW: ', selectedPrice[0])
    //   err.amount3 = 'Discount value must be between 1 and 100'
    // } else if (
    //   selectedPrice[0] == '2' &&
    //   (amount.trim().length == 0 || parseFloat(amount) < 1)
    // ) {
    //   err.amount2 = 'Discount value must be greater than 1'
    // } else if (selectedPrice[0] == '1' && amount < 0) {
    //   console.log('True')
    //   err.amount1 = 'Discount value must be not empty'
    // }

    if (
      err.priority ||
      err.storeName ||
      err[`amount${selectedPrice[0]}`] ||
      err[`empField${selectedProduct[0]}`]
    ) {
      setError(err)
    } else {
      console.log('No error')
      setIsLoading(true)
      setRows([])

      console.log('Prev handle table ...')

      handleTable()

      // Save Local Storage
      let dataTemp = []
      switch (selectedProduct[0]) {
        case '1':
          dataTemp = { type: '1' }
          break
        case '2':
          dataTemp = { type: '2', data: [...specificsProducts] }
          break
        case '3':
          dataTemp = { type: '3', data: [...collectionProduct] }
          break
        case '4':
          dataTemp = { type: '4', data: [...tagProduct] }
        default:
          dataTemp = []
      }
      localStorage.setItem('products', JSON.stringify(dataTemp))

      switch (selectedPrice[0]) {
        case '1':
          dataTemp = { type: '1', amount: amount }
          break
        case '2':
          dataTemp = { type: '2', amount: amount }
          break
        case '3':
          dataTemp = { type: '3', amount: amount }
          break
        default:
          dataTemp = {}
      }
      localStorage.setItem('price', JSON.stringify(dataTemp))
      localStorage.setItem('storeName', JSON.stringify(storeName))
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const handleTable = async () => {
    let query = ''
    let subQuery = ''

    switch (selectedProduct[0]) {
      case '1':
        //  products(first: 25 ${
        //   hasNextPage == 'true' ? `, after:"${endCursor}"` : ''
        // })
        query = `{
          products(first: 25 ) {
            edges {
              node {
                title
                variants(first: 1) {
                  edges {
                    node {
                      price
                    }
                  }
                  pageInfo {
                    hasNextPage
                    endCursor
                  }
                }
              }
            }
          }
        }`
        break
      case '2':
        subQuery = specificsProducts
          .map((id) => {
            const arr = id.split('/')
            return `id:${arr[arr.length - 1]}`
          })
          .join(' OR ')

        query = `{
            products (first: 25, query:"${subQuery}" ${
          pageInfo.hasNextPage == 'true'
            ? `, after:"${pageInfo.endCursor}"`
            : ''
        }) {
              edges {
                node {
                  title
                  variants(first: 1) { 
                    edges { 
                      node { 
                        price 
                      } 
                    } 
                  }
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }`
        break
      case '3':
        subQuery = collectionProduct
          .map((id) => {
            const arr = id.split('/')
            return `id:${arr[arr.length - 1]}`
          })
          .join(' OR ')

        query = `{
            collections (first:5, query:"${subQuery}" ${
          hasNextPage == 'true' ? `, after:"${endCursor}"` : ''
        }) {
              edges {
                node {
                  products(first:20) {
                    edges {
                      node {
                        title
                        variants(first: 5) { 
                          edges { 
                            node { 
                              price 
                            } 
                          } 
                        }
                      }
                    }
                    pageInfo {
                      hasNextPage
                      endCursor
                    }
                  }
                }
              }
            }
          }`
        break
      case '4':
        subQuery = tagProduct
          .map((tag) => {
            return `tag:'${tag}'`
          })
          .join(' OR ')

        query = `{
          products(first: 25, query:"${subQuery}" ${
          pageInfo.hasNextPage == 'true' ? `, after:"${pageInfo.endCursor}"` : ''
        }) {
            edges {
              node {
                title
                tags
                variants(first: 5) { 
                  edges { 
                    node { 
                      price 
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

    console.log('Query Table: ', query)

    try {
      const res = await fetch('/api/product/tablePrice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query, type: selectedProduct[0] }),
      })

      const { data = [] } = await res.json()
      setIsLoading(false)

      const rowsTemp = data.map((row) => {
        let newPrice = 0

        switch (selectedPrice[0]) {
          case '1':
            newPrice = amount
            break
          case '2':
            newPrice = +row.price - amount < 0 ? 0 : +row.price - amount
            break
          case '3':
            newPrice = (+row.price * (100 - +amount)) / 100
            break
          default:
            newPrice = 0
        }
        return [row.title, row.price, newPrice]
      })

      setRows(rowsTemp)
    } catch (error) {
      alert(error)
    }
  }

  let additionalFieldProduct = <></>

  switch (selectedProduct[0]) {
    case '2':
      additionalFieldProduct = (
        <SpecificProduct
          handleFocusSpecificProduct={handleFocusSpecificProduct}
          error={error.empField2}
        />
      )

      break
    case '3':
      additionalFieldProduct = <ProductCollection error={error.empField3} />

      break
    case '4':
      additionalFieldProduct = <ProductTags error={error.empField4} />

      break
    default:
      additionalFieldProduct = null
  }

  return (
    <Page
      title="New Pricing Rule"
      backAction={{ content: 'Products', url: '#' }}
      fullWidth="true"
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
                requiredIndicator
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
                min={'0'}
                // onBlur={handleBlurAmount}
              />
            </FormLayout>
          </LegacyCard>
        </Layout.Section>

        <TablePrice
          rows={rows}
          isLoading={isLoading}
          currencyCode={currencyCode}
        />
      </Layout>

      <ModalSpecificProduct openModal={setIsOpenModal} isOpen={isOpenModal} />
      <div style={{ padding: '40px' }}></div>

      <PageActions
        primaryAction={{
          content: 'Save',
          disabled: false,
          onAction: handleSubmitPage,
        }}
      />
    </Page>
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
