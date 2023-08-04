import axios from "axios";

export async function callShopifyGraphQL(query) {
  const endpoint = "https://spfy8.myshopify.com/admin/api/2023-07/graphql.json";
  const apiKey = "21e70e1c0db438b03bf85dafbc7b9e85";
  const accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczpcL1wvc3BmeTgubXlzaG9waWZ5LmNvbVwvYWRtaW4iLCJkZXN0IjoiaHR0cHM6XC9cL3NwZnk4Lm15c2hvcGlmeS5jb20iLCJhdWQiOiIyMWU3MGUxYzBkYjQzOGIwM2JmODVkYWZiYzdiOWU4NSIsInN1YiI6IjEwMTg3MTEyNDc3OCIsImV4cCI6MTY5MTA3NzUyMiwibmJmIjoxNjkxMDc3NDYyLCJpYXQiOjE2OTEwNzc0NjIsImp0aSI6IjEzZmYxOGQ2LWQ0NGMtNGFmZi04ZWZkLTYwMzhhZDBmYzliYiIsInNpZCI6IjUwZWM2YTc2MjQ3ZTA4ZjA2YTdmMzlhODc5ZDExZTY4YTczZWY2YjgyMDE1NjY4N2Q3MzFjYWIzZjRlOTY4YmMifQ.eTeq1dr-GTkYOGL2QLy4y3g3aqm2vveVMDOwaRfdZ18";
  const headers = {
    "X-Shopify-Access-Token": accessToken,
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(endpoint, { query }, { headers });
    console.log("RESTPONSE: ", response);

    return response.data.data; // Trả về dữ liệu từ phản hồi GraphQL
  } catch (error) {
    console.error("Error calling Shopify GraphQL API:", error);
    throw error;
  }
}
