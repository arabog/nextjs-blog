// The component can have any name, 
// but you must export it as a default export.

import Link from "next/link"
import Head from "next/head"

import Layout from "../../components/layout"


export default function FirstPost() {

          
          return (
                    <Layout>
                              <Head>
                                        <title>First Post</title>
                              </Head>

                              <h1>First Post</h1>

                              <h2>
                                        <Link href = "/">
                                                  <a> Back to home </a>
                                        </Link>
                              </h2>
                    </Layout>
          )
}

/*
Two Forms of Pre-rendering: 
Static Generation is the pre-rendering method that generates 
the HTML at build time. The pre-rendered HTML is then 
reused on each request.

Server-side Rendering is the pre-rendering method that 
generates the HTML on each request.

You can use Static Generation for many types of pages, including:
          Marketing pages
          Blog posts
          E-commerce product listings
          Help and documentation


You should ask yourself: "Can I pre-render this page ahead of a 
user's request?" If the answer is yes, then you should choose 
Static Generation.

On the other hand, Static Generation is not a good idea if you 
cannot pre-render a page ahead of a user's request. Maybe 
your page shows frequently updated data, and the page 
content changes on every request.

In that case, you can use Server-side Rendering. It will be 
slower, but the pre-rendered page will always be up-to-date. 
Or you can skip pre-rendering and use client-side JavaScript 
to populate frequently updated data.




export async function getStaticProps() {
          // Get external data from the file system, API, DB, etc.
          const data = ...

          // The value of the `props` key will be
          //  passed to the `Home` component
          return {
                    props: ...
          }
}

Essentially, getStaticProps allows you to tell Next.js: “Hey, 
this page has some data dependencies — so when you pre-render 
this page at build time, make sure to resolve them first!”



Implement getStaticProps
First, install gray-matter which lets us parse the metadata 
in each markdown file.

npm install gray-matter



Fetch External API or Query Database
In lib/posts.js, we’ve implemented getSortedPostsData 
which fetches data from the file system. But you can fetch 
the data from other sources, like an external API endpoint, 
and it’ll work just fine:


export async function getSortedPostsData() {
          // Instead of the file system,
          // fetch post data from an external API endpoint
          const res = await fetch('..')
          return res.json()
}

Note: Next.js polyfills fetch() on both the client and server. You don't need to import it.


You can also query the database directly:
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
          // Instead of the file system,
          // fetch post data from a database
          return databaseClient.query('SELECT posts...')
}


This is possible because getStaticProps only runs on the 
server-side. It will never run on the client-side. It won’t 
even be included in the JS bundle for the browser. That 
means you can write code such as direct database queries 
without them being sent to browsers.

Where does getStaticProps run? Server-side

Fetching Data at Request Time

If you need to fetch data at request time instead of at 
build time, you can try Server-side Rendering:

To use Server-side Rendering, you need to export 
getServerSideProps instead of getStaticProps from 
your page.


Using getServerSideProps
Here’s the starter code for getServerSideProps. 
It’s not necessary for our blog example, so we 
won’t be implementing it.

export async function getServerSideProps(context) {
          return {
                    props: {
                              // props for your component
                    }
          }
}

Because getServerSideProps is called at request time, 
its parameter (context) contains request specific parameters.

You should use getServerSideProps only if you need to 
pre-render a page whose data must be fetched at request 
time. Time to first byte (TTFB) will be slower than getStatic
Props because the server must compute the result on every 
request, and the result cannot be cached by a CDN without 
extra configuration.



Client-side Rendering
If you do not need to pre-render the data, you can also use 
the following strategy (called Client-side Rendering):

Statically generate (pre-render) parts of the page that 
do not require external data.
When the page loads, fetch external data from the client 
using JavaScript and populate the remaining parts.


you can also pre-render without data and then load
the data on the client-side

This approach works well for user dashboard pages, 
for example. Because a dashboard is a private, 
user-specific page, SEO is not relevant, and the 
page doesn’t need to be pre-rendered. The data 
is frequently updated, which requires 
request-time data fetching.



SWR
The team behind Next.js has created a React hook for 
data fetching called SWR. We highly recommend it if 
you’re fetching data on the client side. It handles 
caching, revalidation, focus tracking, refetching 
on interval, and more. 


import useSWR from 'swr'

function Profile() {
          const { data, error } = useSWR('/api/user', fetch)

          if (error) return <div>failed to load</div>

          if (!data) return <div>loading...</div>

          return <div>hello {data.name}!</div>
}


When should you use Client-side rendering?
Private, user-specific pages where SEO is not relevant 

*/ 