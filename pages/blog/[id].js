import Head from 'next/head';
import React from 'react';
import { fetchAPI } from '../../lib/api';
import Footer from '../../components/Footer';
import SEO from '../../components/seo';

function Post({currentPost}) {


	return (
		<div className="container">

		<SEO
		  title="Blog"
		  description="main blog page"
		  ogImage=""
		  ogType="website"
		/>
	  
  
		<main className="main">
		  <h1 className="title">single page Blog</h1>
  

  
		</main>
  
		<Footer/>
  
	  </div>
	);
}

export default Post;


export const getStaticProps = async ({params}) => {
	const ArticleId = parseInt(params ? params.id : 0);
 
    const [currentPost] = await Promise.all([
        fetchAPI(`/article-as-visitor/${ArticleId}?include=clapsCount,commentsCount`),
		// fetchAPI(`/article/${ArticleId}/comments/0`)
    ]);
console.log('--------------------------------');
console.log(currentPost);
	if(currentPost && currentPost[0])
		return{
				props: {
					currentPost: currentPost[0],
				},
				revalidate: 1,
			};
	else
		return{
			props: {},
			notFound: true
		}
}


  
export async function getStaticPaths() {
	const posts = await fetchAPI("/posts");

	// Get the paths we want to pre-render based on posts
	const paths = posts.map((post) => ({
		params: { slug: post.slug },
	}))

	return { paths, fallback: false }
}

