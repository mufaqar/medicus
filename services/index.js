import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
const crmAPI = process.env.NEXT_PUBLIC_CRM_ENDPOINT
const crmToken = process.env.CRM_TOKEN

export const getPages = async () => {
  const query = gql`
    query MyQuery {
      pagesConnection {
        edges {
          node {
            slug
            title
            order
            content {
              raw
            }
            featuredImage {
              url
            }
            updatedAt
          }
        }
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.pagesConnection.edges
}

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.postsConnection.edges
}

export const getTestimonials = async () => {
  const query = gql`
    query GetTestimonials {
      testimonials {
        photo {
          url
        }
        author
        occupation
        quote
        linkedin
        school
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.testimonials
}

export const getCategories = async () => {
  const query = gql`
    query GetGategories {
      categories {
        name
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query)

  return result.categories
}

export const getGrids = async (slug) => {
  const query = gql`
    query GetGrids($slug: String!) {
      grids(where: { slug: $slug }) {
        title
        subtitle
        headline
        slug
        columns {
          ... on Faq {
            id
            title
            answer {
              raw
            }
            featuredQuestion
          }
          ... on How {
            id
            title
            content
            image {
              url
            }
          }
          ... on Why {
            id
            title
            content
            image {
              url
            }
          }
          ... on Team {
            id
            name
            position
            bio {
              raw
            }
            photo {
              url
            }
          }
        }
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug })

  return result.grids
}

export const getNavigations = async (slug) => {
  const query = gql`
    query GetNavigations($slug: String!) {
      navigations(where: { slug: $slug }) {
        id
        pages(orderBy: order_ASC) {
          id
          title
          order
          slug
        }
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug })

  return result.navigations
}

export const getPageDetails = async (slug) => {
  const query = gql`
    query GetPageDetails($slug: String!) {
      page(where: { slug: $slug }) {
        title
        seoTitle
        seoDescription
        excerpt
        featuredImage {
          url
        }
        socialPhoto {
          url
        }
        createdAt
        updatedAt
        slug
        content {
          raw
        }
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug })

  return result.page
}

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        seoTitle
        seoDescription
        excerpt
        featuredImage {
          url
        }
        socialPhoto {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug })

  return result.post
}

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query, { slug, categories })

  return result.posts
}

export const getAdjacentPosts = async (createdAt, slug) => {
  const query = gql`
    query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
      next: posts(
        first: 1
        orderBy: createdAt_ASC
        where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
      previous: posts(
        first: 1
        orderBy: createdAt_DESC
        where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug, createdAt })

  return { next: result.next[0], previous: result.previous[0] }
}

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const result = await request(graphqlAPI, query, { slug })

  return result.postsConnection.edges
}

export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `

  const result = await request(graphqlAPI, query)

  return result.posts
}

export const submitApplication = async (obj, form) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${crmToken}`
    },
    body: JSON.stringify(form)
  }

  fetch(crmAPI, config)
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })

  const result = await fetch('/api/applications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })

  return result.json()
}

export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails() {
      posts(
        orderBy: createdAt_ASC
        last: 3
      ) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `
  const result = await request(graphqlAPI, query)

  return result.posts
}
