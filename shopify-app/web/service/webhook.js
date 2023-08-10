import { GraphqlQueryError } from '@shopify/shopify-api'
import shopify from '../shopify.js'
import { ADDRESS_WEBHOOK } from '../frontend/constant/constant.js'

export const createWebHooks = async (session, topic) => {
  const client = new shopify.api.clients.Graphql({ session })

  const query = `
  mutation {
    webhookSubscriptionCreate(
      topic: ORDERS_CREATE
      webhookSubscription: {
        format: JSON,
        callbackUrl: ${ADDRESS_WEBHOOK}}
    ) {
      userErrors {
        field
        message
      }
      webhookSubscription {
        id
      }
    }
  }`

  console.log('Query: ', query)

  const { body = {} } = await client.query({
    data: {
      query: query,
    },
  })

  console.log('UserError: ', body.data.webhookSubscriptionCreate.userErrors)

  return body.data.webhookSubscriptionCreate.userErrors
}
