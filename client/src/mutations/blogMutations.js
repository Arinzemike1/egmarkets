import { gql } from '@apollo/client';

const ADD_BLOG = gql`
    mutation AddBlog($name: String!, $description: String!, $body: String!) {
        addBlog(name: $name, description: $description, body: $body) {
            id
            name
            description
            body
        }
    } 
`;

const UPDATE_BLOG = gql`
    mutation UpdateBlog($id: ID!, $name: String!, $description: String!, $body: String!) {
        updateBlog(id: $id, name: $name, description: $description, body: $body) {
            id
            name
            description
            body
        }
    } 
`; 

const DELETE_BLOG = gql`
    mutation DeleteBlog($id: ID!) {
        deleteBlog(id: $id) {
            id
        }
    }
`

export { ADD_BLOG, UPDATE_BLOG, DELETE_BLOG }