import Head from "next/head"

import Layout from "../../components/layout"
import Date from "../../components/date"

// import { getAllPostIds,  } from "../../lib/posts"
import { getAllPostIds, getPostData } from '../../lib/posts'

import utilStyles from "../../styles/utils.module.css"


export default function Post({ postData }) {
          return (
                    <Layout>
                              <Head>
                                        <title> {postData.title} </title>                                        
                              </Head>

                              <article>
                                        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                                        
                                        <div className={utilStyles.lightText}>
                                                  <Date dateString={postData.date} />
                                        </div>
                                        
                                        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                              </article>
                    </Layout>
          )
}


export async function getStaticPaths () {
          const paths = getAllPostIds()

          return {
                    paths,

                    fallback: false
          }
}

/*
Fallback
Recall that we returned fallback: false from getStaticPaths. 
What does this mean?

If fallback is false, then any paths not returned by 
getStaticPaths will result in a 404 page.

If fallback is true, then the behavior of getStaticProps changes:

The paths returned from getStaticPaths will be rendered to 
HTML at build time.
The paths that have not been generated at build time will 
not result in a 404 page. Instead, Next.js will serve a 
“fallback” version of the page on the first request to 
such a path.
In the background, Next.js will statically generate the 
requested path. Subsequent requests to the same path 
will serve the generated page, just like other pages 
pre-rendered at build time.
*/ 


export async function getStaticProps({ params }) {
          const postData = await getPostData(params.id)

          return {
                    props: {
                              postData
                    }
          }
}

