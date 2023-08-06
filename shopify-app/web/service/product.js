import { GraphqlQueryError } from '@shopify/shopify-api'
import shopify from '../shopify.js'

export async function getProductTags(session) {
  const client = new shopify.api.clients.Graphql({ session })

  const query = `{ shop { productTags(first: 25) { edges { node } } } }`
  try {
    const { body = {} } = await client.query({
      data: {
        query: query,
      },
    })

    const edges = body.data.shop.productTags.edges

    return edges.map((edge) => ({
      name: edge.node,
    }))
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      )
    } else {
      throw error
    }
  }
}

export const getDataTable = async (session, query) => {
  const client = new shopify.api.clients.Graphql({ session })
  try {
    const {
      body: {},
    } = await client.query({
      data: {
        query: query,
      },
    })

    const edges = body.data.shop
    return edges
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      )
    } else {
      throw error
    }
  }
}
