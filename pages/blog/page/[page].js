import { fetchAPI } from '../../../lib/api';
import styles from '../../../styles/Blog.module.css';
import Card from '../../../components/Card';
import Footer from '../../../components/Footer';
import SEO from '../../../components/SEO';
import Pagination from '../../../components/Pagination';
import { useRouter } from 'next/router';

export default function Blog({posts,pagination}) {
  const router = useRouter();
  const curPage = parseInt(router.query.page || 0);


  
  return (
    <div className="container">

      <SEO
        title={`Blog | page ${curPage}`}
        description="main blog page"
        ogImage=""
        ogType="website"
      />
    

      <main className="main">
        <h1 className="title">Blog</h1>

        <section className={styles.grid}>
          {posts && posts.data.map(({id, title, excerpt, claps_count, comments_count, slug})=>
            <Card
              key={id}
              title={title}
              description={excerpt}
              clapsCount = {claps_count}
              commentsCount = {comments_count}
              href={`/blog/${id}`}
            />
          )}

        </section>
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />

      </main>

      <Footer/>

    </div>
  );
}

export async function getStaticPaths() {
  // const totalPosts = await getAllFilesFrontMatter('blog/pages-count')
  const totalPages = 10
  
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i).toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({params}) {
  const page = parseInt(params ? params.page : 0);

  const [posts] = await Promise.all([
    fetchAPI(`/article/scopes/lat/get/${page}`)
  ]);

  const pagination = {
    currentPage: page,
    totalPages: 10
  };

  return {
    props: {
      posts,
      pagination
    },
    revalidate: 180
  };
}