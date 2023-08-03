// import React, { useEffect, useState } from "react";
// import axios from "axios";
// const ShopifyAPIExample = () => {
//   const [data, setData] = useState(null);
//   useEffect(() => {
//     // Replace 'YOUR_SHOPIFY_STORE_URL' with your actual Shopify store URL
//     const shopifyStoreUrl = "YOUR_SHOPIFY_STORE_URL";
//     const accessToken = "YOUR_SHOPIFY_ACCESS_TOKEN";
//     const graphqlQuery = `
//       {
//         shop {
//           name
//           description
//         }
//       }
//     `;
//     axios
//       .post(
//         `https://${shopifyStoreUrl}/admin/api/2021-07/graphql.json`,
//         { query: graphqlQuery },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "X-Shopify-Access-Token": accessToken,
//           },
//         }
//       )
//       .then((response) => {
//         setData(response.data.data.shop);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);
//   return (
//     <div>
//       {data ? (
//         <>
//           <h2>Shop Name: {data.name}</h2>
//           <p>Shop Description: {data.description}</p>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };
// export default ShopifyAPIExample;
