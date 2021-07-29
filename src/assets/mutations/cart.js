///////////////////
//// Mutations ////
///////////////////

export const getCheckoutUrl = `query checkoutURL {
  cart(id: "Z2lkOi8vc2hvcGlmeS9DYXJ0LzI5ZDQyNWZhMTQ1YTQ0ZWQ5ZGUyOTQ3YWMxMjhiMGM1") {
    checkoutUrl
  }
}`;

export const createCart = `mutation createCart($cartInput: CartInput) {
  cartCreate(input: $cartInput) {
    cart {
      id
      createdAt
      updatedAt
      lines(first:10) {
        edges {
          node {
            id
            merchandise {
              ... on ProductVariant {
                id
              }
            }
          }
        }

      }
      attributes {
        key
        value
      }
      estimatedCost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
      }
    }
  }
}`;

export const addToCart = `mutation cartLinesAdd($lines: [CartLineInput!]!, $cartId: ID!) {
  cartLinesAdd(lines: $lines, cartId: $cartId) {
    cart {
      id
    }
    userErrors {
      code
      field
      message
    }
  }
}`;

///////////////////
///// Queries /////
///////////////////

export const getCart = `cart(id:"Z2lkOi8vc2hvcGlmeS9DYXJ0L2QzNTNhODQxYjQ1Y2VmYjY3ZTQ1NjdiZGUzMzU4MjFh") {
  id
  createdAt
  updatedAt
  lines(first:10) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
          }
        }
        attributes {
          key
          value
        }
      }
    }
  }
  attributes {
    key
    value
  }
  estimatedCost {
    totalAmount {
      amount
      currencyCode
    }
    subtotalAmount {
      amount
      currencyCode
    }
    totalTaxAmount {
      amount
      currencyCode
    }
    totalDutyAmount {
      amount
      currencyCode
    }
  }
  buyerIdentity {
    email
    phone
    customer {
      id
    }
    countryCode
  }
}`;

export const updateCart = `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
  cartLinesUpdate(cartId: $cartId, lines: $lines) {
    cart {
      id
      lines(first:10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
              }
            }
          }
        }
      }
      estimatedCost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
        totalTaxAmount {
          amount
          currencyCode
        }
        totalDutyAmount {
          amount
          currencyCode
        }
      }
    }
  }
}`;

export const getCartUrl = `query checkoutURL($cartId: ID!) {
  cart(id: $cartId) {
    checkoutUrl
  }
}`;
