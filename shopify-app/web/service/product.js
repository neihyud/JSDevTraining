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

export const getDataTable = async (session, query, type) => {
  const client = new shopify.api.clients.Graphql({ session })
  console.log('Query Validator: ', typeof query)
  try {
    const { body = {} } = await client.query({
      data: {
        query: query,
      },
    })

    let data = []

    switch (type) {
      case '1':
        data = body.data.products.edges.map((edge, index) => {
          const price = edge.node.variants.edges[0].node.price
          return { title: edge.node.title, price: price }
        })
        break
      case '2':
        data = body.data.products.edges.map((edge, index) => {
          const price = edge.node.variants.edges[0].node.price
          return { title: edge.node.title, price: price }
        })
        break
      case '3':
        const dataTemp = body.data.collections.edges.map((edges) => {
          return edges.node.products.edges.map((edge) => {
            const price = edge.node.variants.edges[0].node.price
            return { title: edge.node.title, price: price }
          })
        })
        data = dataTemp.flat(Infinity)
        break
      case '4':
        data = body.data.products.edges.map((edge) => {
          const price = edge.node.variants.edges[0].node.price
          return { title: edge.node.title, price: price }
        })
        break
      default:
        data = []
    }


    // const edges = body.data.shop
    return data
  } catch (error) {
    console.log('ERROR: ', error)
    // if (error instanceof GraphqlQueryError) {
    //   throw new Error(
    //     `${error.message}\n${JSON.stringify(error.response, null, 2)}`
    //   )
    // } else {
    //   throw error
    // }
  }
}
