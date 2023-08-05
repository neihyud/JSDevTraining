// import { GraphqlQueryError } from '@shopify/shopify-api'
// import shopify from './shopify.js'

// export async function getProductTags(session) {
//   const client = new shopify.api.clients.Graphql({ session })

//   const query = `{
//     shop {
//       productTags {
//         edges {
//           node
//         }
//       }
//     }
//   }`
//   try {
//     await client.query({
//       data: {
//         query: query,
//       },
//     })
//   } catch (error) {
//     if (error instanceof GraphqlQueryError) {
//       throw new Error(
//         `${error.message}\n${JSON.stringify(error.response, null, 2)}`
//       )
//     } else {
//       throw error
//     }
//   }
// }
