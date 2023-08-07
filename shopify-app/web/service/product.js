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

export const getProducts = async (session) => {
  const client = new shopify.api.clients.Graphql({ session })

  const query = `{
    products (first: 35) {
      edges {
        node {
          title
          id
          images (first: 1) {
            edges {
              node {
                url
              }
            }
          }
        }
      }
    }
  }`

  try {
    const { body = {} } = await client.query({
      data: {
        query: query,
      },
    })

    const products = body.data.products.edges.map((edge) => {
      let url = ''
      const urlTemp = edge.node.images.edges
      if (urlTemp && urlTemp.length != 0) {
        url = urlTemp[0].node.url
      } else {
        url =
          'https://imgv3.fotor.com/images/blog-richtext-image/part-blurry-image.jpg'
      }
      // console.log("title: ", edge.node.title)
      return { title: edge.node.title, url, id: edge.node.id }
    })
    return products
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

export const getCollections = async (session) => {
  const client = new shopify.api.clients.Graphql({ session })
  console.log('SERVICE COLLECTION: ')
  const query = `{
                    collections (first: 25) {
                      edges {
                        node {
                          title
                          id
                          image {
                            url
                          }
                        }
                      }
                    }
                  }`

  try {
    const { body = {} } = await client.query({
      data: {
        query: query,
      },
    })

    const collections = body.data.collections.edges.map((edge) => {
      const url =
        edge.node.image?.url ||
        'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
      return { title: edge.node.title, url, id: edge.node.id }
    })

    return collections
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
