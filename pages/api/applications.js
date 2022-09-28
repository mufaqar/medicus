import { GraphQLClient, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

/** *************************************************************
 * Any file inside the folder pages/api is mapped to /api/* and  *
 * will be treated as an API endpoint instead of a page.         *
 *************************************************************** */

// export a default function for API route to work
export default async function asynchandler(req, res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`
    }
  })

  const query = gql`
    mutation CreateApplication(
      $univercity: String!
      $occupation: String!
      $education: String!
      $experience: String!
      $email: String!
      $languageLevel: String!
      $firstName: String!
      $lastName: String!
      $contactNumber: String!
    ) {
      createApplication(
        data: {
          univercity: $univercity
          occupation: $occupation
          education: $education
          experience: $experience
          languageLevel: $languageLevel
          firstName: $firstName
          lastName: $lastName
          contactNumber: $contactNumber
          email: $email
        }
      ) {
        id
      }
    }
  `

  const result = await graphQLClient.request(query, {
    univercity: req.body.univercity,
    occupation: req.body.occupation,
    education: req.body.education,
    experience: req.body.experience,
    languageLevel: req.body.languageLevel,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    contactNumber: req.body.contactNumber,
    email: req.body.email
  })

  return res.status(200).send(result)
}
