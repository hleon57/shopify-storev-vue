export const getProductByHandle = `query ($handle: String!) {
  productByHandle(handle: $handle) {
    id
    handle
    title
    description
    images(first: 5) {
      edges {
        node {
          altText
          originalSrc
        }
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          price
          quantityAvailable
        }
      }
    }
  }
}`;

export const allProductsQuery = `query {
  shop {
    name
    description
    products(first:20) {
      edges {
        node {
          id
          handle
          title
          description
          availableForSale
          options {
            name
            values
          }
          variants(first: 250) {
            edges {
              node {
                id
                title
                selectedOptions {
                  name
                  value
                }
                image {
                  src
                }
                price
              }
            }
          }
          images(first: 250) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                src
              }
            }
          }
        }
      }
    }
  }
}`;
