// @ts-nocheck
import { join } from 'path'
import { readFileSync } from 'fs'
import express from 'express'
import serveStatic from 'serve-static'

import shopify from './shopify.js'
import productCreator from './product-creator.js'
import GDPRWebhookHandlers from './gdpr.js'

import {
  getProductTags,
  getDataTable,
  getProducts,
  getCollections,
} from './service/product.js'

const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || '3000',
  10
)

const STATIC_PATH =
  process.env.NODE_ENV === 'production'
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`

const app = express()

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin())
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
)
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
)

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use('/api/*', shopify.validateAuthenticatedSession())

app.use(express.json())

app.get('/api/products/count', async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  })
  res.status(200).send(countData)
})

app.get('/api/products/create', async (_req, res) => {
  let status = 200
  let error = null

  try {
    await productCreator(res.locals.shopify.session)
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`)
    status = 500
    error = e.message
  }
  res.status(status).send({ success: status === 200, error })
})

app.get('/api/shop/productTags', async (_req, res) => {
  let status = 200
  let error = null

  try {
    const tags = await getProductTags(res.locals.shopify.session)

    // // return 2
    // return data
    return res
      .status(status)
      .send({ success: status === 200, error, data: tags ? tags : [] })
  } catch (e) {
    console.log(`Failed to process get product tag: ${e.message}`)
    status = 500
    error = e.message
    return res
      .status(status)
      .send({ success: status === 200, error, message: 'Error' })
  }
})

app.post('/api/product/tablePrice', async (_req, res) => {
  let status = 200

  const { query, type } = _req.body
  try {
    const data = await getDataTable(res.locals.shopify.session, query, type)

    return res.status(200).json({ data })
  } catch (error) {
    console.log('Error: ', error)
    // console.log(`Failed to process get product tag: ${e.message}`)
    status = 500
    // error = e.message
    return res
      .status(status)
      .send({ success: status === 200, error, message: 'Error' })
  }

})

app.get('/api/products', async (req, res) => {
  let status = 200

  const { endCursor = '', hasNextPage = false, q = '' } = req.query

  console.log('EndCursor - HasNextPage - Q: ', endCursor, hasNextPage, q)

  try {
    const data = await getProducts(
      res.locals.shopify.session,
      endCursor,
      hasNextPage,
      q
    )

    return res.status(200).json({ data })
  } catch (error) {
    console.log('Error: ', error)
    // console.log(`Failed to process get product tag: ${e.message}`)
    // error = e.message
    return res
      .status(500)
      .send({ success: status === 200, error, message: 'Error' })
  }
})

app.get('/api/collections', async (req, res) => {

  const { endCursor = '', hasNextPage = false, q = '' } = req.query

  try {
    const data = await getCollections(
      res.locals.shopify.session,
      endCursor,
      hasNextPage,
      q
    )

    console.log('GET COLLECTIONS')

    return res.status(200).json({ data })
  } catch (error) {
    console.log('Error: ', error)

    return res.status(500).send({ error, message: 'Error' })
  }
})

app.use(shopify.cspHeaders())
app.use(serveStatic(STATIC_PATH, { index: false }))

app.use('/*', shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set('Content-Type', 'text/html')
    .send(readFileSync(join(STATIC_PATH, 'index.html')))
})

app.listen(PORT)
