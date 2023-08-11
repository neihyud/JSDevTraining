import { GraphqlQueryError } from '@shopify/shopify-api'
import shopify from '../shopify.js'
import { ADDRESS_WEBHOOK } from '../frontend/constant/constant.js'

export const createWebHooks = async (session, topic) => {
  const client = new shopify.api.clients.Graphql({ session })

  const query = `
  mutation {
    webhookSubscriptionCreate(
      topic: ${topic}
      webhookSubscription: {
        format: JSON,
        callbackUrl: "${ADDRESS_WEBHOOK}"}
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

  const { body = {} } = await client.query({
    data: {
      query: query,
    },
  })

  return body.data.webhookSubscriptionCreate.userErrors
}
