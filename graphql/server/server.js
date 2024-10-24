const { gql, ApolloServer } = require("apollo-server");
const heros = [
  {
    id: 1,
    name: "Ironman",
    movies: [1, 2],
  },
  {
    id: 2,
    name: "Captain America",
    movies: [2],
  },
];

const movies = [
  {
    id: 1,
    title: "Ironman",
    superheros: [1],
  },
  {
    id: 1,
    title: "Avenger",
    superheros: [1, 2],
  },
  {
    id: 2,
    title: "Captain America",
    superheros: [2],
  },
];
//schema
const typeDefs = gql(`
    type Hero{
        id:ID,
        name:String,
        movies:[Movie]
    }
    type Movie{
        id:ID,
        title:String,
        superheros:[Hero]
    }
    type Query{
        heros:[Hero],
        movies:[Movie]
    }
 `);

//resolver
const resolvers = {
  Query: {
    heros: () => {
      return heros;
    },
    movies: () => {
      return movies;
    }
  },
  Hero: {
    movies: (hero) => {
      return movies.filter((movie) => {
        return movie.superheros.includes(hero.id);
      });
    },
  },
  Movie: {
    superheros: (movie) => {
      return heros.filter((hero) => {
        return hero.movies.includes(movie.id);
      });
    },
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(4001).then(({ url }) => {
  console.log(`GraphQL started on ${url}`);
});
