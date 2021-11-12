import Head from 'next/head';
import React from 'react';
import { fetchAPI } from '../../lib/api';
import Comments from '../../components/comments';
import Footer from '../../components/Footer';
import SEO from '../../components/seo';

function Post({currentPost,comments}) {


	const paragraphs = currentPost.data.content.blocks.filter((block)=>block.type == "paragraph");

	return (
		<div className="container">

		<SEO
		  title="Blog"
		  description="main blog page"
		  ogImage=""
		  ogType="website"
		/>
	  
  
		<main className="main">
			<h1 className="title">{currentPost.data.title}</h1>
			<article className="content">
				{paragraphs.map((paragraph, i)=>
					<p key={i}>{paragraph.data.text}</p>
				)}
			</article>
			
			<div>
				claps &hearts; : {currentPost.data.claps_count} <br/>
				comments : {currentPost.data.comments_count}
			</div>

			<Comments comments={comments} ArticleId={currentPost.data.id}/>

		</main>
  
		<Footer/>
  
	  </div>
	);
}

export default Post;


export const getStaticProps = async ({params}) => {
	const ArticleId = parseInt(params ? params.id : 0);

    const [currentPost, comments] = await Promise.all([
        fetchAPI(`/article/${ArticleId}`),
		fetchAPI(`/article/${ArticleId}/comments/0`,false)
    ]);

	if(currentPost && currentPost.data)
		return{
				props: {
					currentPost: currentPost,
					comments: comments
				}
			};
	else
		return{
			props: {},
			notFound: true
		}
}


export async function getStaticPaths() {
	const posts = await fetchAPI("/article/scopes/lat/get/0");

	// Get the paths we want to pre-render based on posts
	const paths = posts.data.map((post) => ({
		params: { id: post.id.toString()  },
	}))

	return { paths, fallback: 'blocking' }
}

