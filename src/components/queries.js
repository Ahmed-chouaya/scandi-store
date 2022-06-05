import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';  

const client = new ApolloClient({
    uri:'http://localhost:4000',
    cache: new InMemoryCache()
  })


  const Fetch_CURRENCY = client.query({
    query: gql`
    {
       currencies {
          label
           symbol
          }
        }
    `
})


  const Fetch_CATEGORIES = (cat) => {
    return (
      client.query({
        query: gql`
        {
          category(input: { title: "${cat}"}) {
            name
            products {
              id
              name
              inStock
              brand
              description
              gallery
              category
              attributes {
                name
                items {
                  displayValue
                }
              }
              prices {
                amount
                currency {
                  label
                  symbol
                }
              }
            }
        
          }
        }
        `
      })
  )
  }
  
  const Fetch_CATEGORIES_LINKS  = client.query({
      query: gql`
      {
        categories {
        name
      }
    }
      `
    })
  
        
  export {Fetch_CATEGORIES, Fetch_CATEGORIES_LINKS, Fetch_CURRENCY };