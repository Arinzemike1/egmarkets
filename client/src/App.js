import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Home from './pages/home';
import NotFound from "./pages/notFound";
import BlogDetail from "./pages/blogDetail";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        blogs: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  }
})

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  // link: createUploadLink(),
  cache
})

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className="hero-image">
            <h1>Egmarkets Blog</h1>
          </div>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>

  );
}

export default App;
