import React from 'react';
import ErrorPage from 'next/error';
import { useRouter } from 'next/router';
import { fetchAPI } from '../../lib/api';
import Comments from '../../components/comments';
import Footer from '../../components/Footer';
import SEO from '../../components/seo';

function Post({currentPost,comments}) {
  const router = useRouter()
  const paragraphs = currentPost.data.content.blocks.filter((block)=>block.type == 'paragraph');
  
  if (!router.isFallback && !currentPost.data?.id) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <div className="container">

      <SEO
		  title={currentPost.data.title}
		  description={currentPost.data.meta_description}
		  ogImage={currentPost.data.image}
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

export async function getStaticPaths() {
  const posts = await fetchAPI('/article/scopes/lat/get/0');

  // Get the paths we want to pre-render based on posts
  const paths = posts.data.map((post) => ({
    params: { id: post.id.toString() }
  }));

  return { paths, fallback: 'blocking' };
}

export const getStaticProps = async ({params}) => {
  const ArticleId = parseInt(params ? params.id : 0);

  //we can use "Useeffect" didMount to load comments
  const [currentPost, comments] = await Promise.all([
    fetchAPI(`/article/${ArticleId}`),
    fetchAPI(`/article/${ArticleId}/comments/0`,false)
  ]);

  if(currentPost && currentPost.data)
    return{
      props: {
        currentPost: currentPost,
        comments: comments
      },
      revalidate: 180
    };

  return{
    props: {},
    notFound: true
  };
};


// If you use getServerSideProps thin No Static Generation
// serversideprops are running on a backend only. Useeffect hook for a clientside only.
// export const getServerSideProps = async ({params}) => {
// };
