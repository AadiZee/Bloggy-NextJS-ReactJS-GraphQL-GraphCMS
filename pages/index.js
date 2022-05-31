import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { GraphQLClient, gql } from "graphql-request";
import BlogCard from "../components/BlogCard";

const graphCMSAPI = process.env.REACT_APP_GRAPH_CMS_API;
const graphcms = new GraphQLClient(
  "https://api-ap-south-1.graphcms.com/v2/cl3rcu7hu8vww01xi8qyd1y93/master"
);

const QUERY = gql`
  {
    blogPosts {
      id
      title
      datePublished
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      coverPhoto {
        url
      }
    }
  }
`;

export async function getStaticProps() {
  const { blogPosts } = await graphcms.request(QUERY);
  return {
    props: {
      blogPosts,
    },
    revalidate: 10,
  };
}

export default function Home({ blogPosts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {blogPosts.map((post, index) => {
          return (
            <BlogCard
              title={post.title}
              author={post.author}
              coverPhoto={post.coverPhoto}
              key={post.id}
              datePublished={post.datePublished}
              slug={post.slug}
            />
          );
        })}
      </main>
    </div>
  );
}
