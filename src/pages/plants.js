import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

import Bio from '../components/Bio'
import { rhythm, scale } from '../utils/typography'

const Styles = {}

Styles.gridWrapper = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridGap: '10px',
  marginTop: '20px',
}

Styles.image = {
  marginBottom: '0px',
  maxWidth: '100%',
}

class PlantsTemplate extends React.Component {
  render() {
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <div>
        <Helmet title={siteTitle} />
        <h1>Plant Grid</h1>
        <div className="c-photo-grid-container">
          {posts.map(post => {
            if (
              post.node.path !== '/404/' &&
              get(post, 'node.frontmatter.coverImage.childImageSharp.responsiveSizes.src')
            ) {
              const title =
                get(post, 'node.frontmatter.title') || post.node.path
              return (
                <Link key={`${post.node.frontmatter.path}-post`} className="c-photo-grid-container__grid-item" to={post.node.frontmatter.path}>
                  <img style={Styles.image} src={post.node.frontmatter.coverImage.childImageSharp.responsiveSizes.src} />
                </Link>
              )
            }
          })}
        </div>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <Bio />
      </div>
    )
  }
}

export default PlantsTemplate

export const pageQuery = graphql`
  query PlantsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, limit: 20, filter: {frontmatter: {plants: {eq: true}}}) {
      edges {
        node {
          excerpt
          frontmatter {
            path
            date(formatString: "DD MMMM, YYYY")
            title
            coverImage {
              childImageSharp {
                responsiveSizes(maxWidth: 640) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`
