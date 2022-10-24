import { gql } from '@apollo/client';

const GET_BLOGS = gql`
    query getBlogs {
        blogs {
            id
            name
            description
        }
    }
`;

const GET_BLOGPOSTS = gql`
    query getBlogPost($id: ID!) {
        blogPost(id: $id) {
            id
            name
            description
            body
        }
    }
`

export { GET_BLOGS, GET_BLOGPOSTS };