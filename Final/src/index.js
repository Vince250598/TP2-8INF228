const {GraphQLServer} = require('graphql-yoga')

const mongoose = require('mongoose')
const db = mongoose.connect('mongodb+srv://username:<password>@cluster0-n4u4h.mongodb.net/test?retryWrites=true&w=majority')
const Schema = mongoose.Schema
const schemaLivre = new Schema({
    titre: {type :String}
})
const Livre = mongoose.model('livre', schemaLivre)

const resolvers = {
    Query: {
        info: () => `Ceci est l'API d'une bibliotheque`,
        bibliotheque: () => Livre.find({}),
    },
    Mutation: {
        ajouterLivre: async (parent, args) => {
            const livre = new Livre({
                titre: args.titre
            })
            const error = await livre.save()

            if(error) return error
            return livre
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})
server.start(() => console.log(`Le serveur fonctionne sur http://localhost:4000`))
