import { GraphqlQueryError } from '@shopify/shopify-api'
import shopify from '../shopify.js'
import { PAGE_SIZE } from '../frontend/constant/constant.js'

export const getDataTable = async (session, query, type) => {
  const client = new shopify.api.clients.Graphql({ session })
  try {
    const { body = {} } = await client.query({
      data: {
        query: query,
      },
    })

    let data = []

    switch (type) {
      case '1':
      case '2':
      case '4':
        data = body.data.products.edges.map((edge) => {
          const price = edge.node.variants.edges[0].node.price
          return { title: edge.node.title, price: price }
        })
        break
      // case '2':
      //   data = body.data.products.edges.map((edge, index) => {
      //     const price = edge.node.variants.edges[0].node.price
      //     return { title: edge.node.title, price: price }
      //   })
      //   break
      case '3':
        const dataTemp = body.data.collections.edges.map((edges) => {
          return edges.node.products.edges.map((edge) => {
            const price = edge.node.variants.edges[0].node.price
            return { title: edge.node.title, price: price }
          })
        })
        data = dataTemp.flat(Infinity)
        break
      // case '4':
      //   data = body.data.products.edges.map((edge) => {
      //     const price = edge.node.variants.edges[0].node.price
      //     return { title: edge.node.title, price: price }
      //   })
      //   break
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
    throw error
    // }
  }
}

export async function getProductTags(session) {
  const client = new shopify.api.clients.Graphql({ session })

  const query = `{
    shop {
      productTags(first: 250) {
        edges {
          node
        }
        pageInfo {
          hasNextPage
          endCursor
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

    const edges = body.data.shop.productTags.edges

    const tags = edges.map((edge) => ({
      title: edge.node,
    }))

    return {
      tags,
      pageInfo: body.data.shop.productTags.pageInfo,
    }
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

export const getProducts = async (session, endCursor, hasNextPage, q) => {
  const client = new shopify.api.clients.Graphql({ session })

  console.log('Type: ', typeof hasNextPage)

  const query = `{
    products (first: ${PAGE_SIZE} ${q ? `, query:"title:${q}*"` : ''} ${
    hasNextPage == 'true' ? `, after:"${endCursor}"` : ''
  }) {
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
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }`

  console.log('Query: ', query)

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
      return { title: edge.node.title, url, id: edge.node.id }
    })

    return {
      products,
      pageInfo: body.data.products.pageInfo,
    }
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

export const getCollections = async (session, endCursor, hasNextPage, q) => {
  const client = new shopify.api.clients.Graphql({ session })
  const query = `{
                    collections (first: ${PAGE_SIZE} ${
    q ? `, query:"title:${q}*"` : ''
  } ${hasNextPage == 'true' ? `, after:"${endCursor}"` : ''}) {
                      edges {
                        node {
                          title
                          id
                          image {
                            url
                          }
                        }
                      }
                      pageInfo {
                        hasNextPage
                        endCursor
                      }
                    }
                  }`

  console.log('Query Collection: ', query)
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

    console.log('DATA COLLECTIONS: ', collections)
    return {
      collections,
      pageInfo: body.data.collections.pageInfo,
    }
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

export const getCurrencyCode = async (session) => {
  const client = new shopify.api.clients.Graphql({ session })

  const query = `{shop { currencyCode} }`
  try {
    const { body = {} } = await client.query({
      data: {
        query: query,
      },
    })

    return body.data.shop.currencyCode
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

/* 

 for async id-c -> ids-c[]
    const 
    call -> api - 1 collection
      5 products
      dispatch( -> update table)
      if ()
      return 

    function* foo(index) {
      while (index < 2) {
        yield index;
        index++;
      }
}


*/
