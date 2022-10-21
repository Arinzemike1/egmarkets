const Blog = require('../models/Blog');
// const { cloudinary } = require('./utils/cloudinary');

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull } = require('graphql');

const BlogType = new GraphQLObjectType({
    name: 'Blog',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        body: { type:  GraphQLString},
        // image: { type:  GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        blogPost: {
            type: BlogType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Blog.findById(args.id)
            }
        },
        blogs: {
            type: new GraphQLList(BlogType),
            resolve(parent, args) {
                return Blog.find();
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // //Add blog
        addBlog: {
            type: BlogType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                body: { type: new GraphQLNonNull(GraphQLString) },
                // image: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const blog = new Blog({
                    name: args.name,
                    description: args.description,
                    body: args.body,
                    // image: args.image
                });

                //save to database
                return blog.save();
            }
        },
        //delete blog
        deleteBlog: {
            type: BlogType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return Blog.findByIdAndRemove(args.id)
            }
        },
        //update blog
        updateBlog: {
            type: BlogType,
            args: { 
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString }, 
                body: { type: GraphQLString }
            },
            resolve(parent, args) {
                return Blog.findByIdAndUpdate(args.id, {
                    $set: {
                        name: args.name,
                        description: args.description,
                        body: args.body,
                    },
                }, { new: true })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})