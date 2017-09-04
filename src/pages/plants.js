import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

import Bio from '../components/Bio'
import { rhythm, scale } from '../utils/typography'
import Styles from './plants.styles'

class PlantsTemplate extends React.Component {
  render() {
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <div>
        <Helmet title={siteTitle} />
        <p
          style={{
            ...scale(-1 / 5),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-1),
          }}
        />
        <div style={Styles.gridWrapper}>
          {posts.map(post => {
            if (
              post.node.path !== '/404/' &&
              get(post, 'node.frontmatter.img.childImageSharp.responsiveSizes.src')
            ) {
              const title =
                get(post, 'node.frontmatter.title') || post.node.path
              return (
                <Link style={Styles.gridItem} to={post.node.frontmatter.path}>
                  <img style={Styles.image} src={post.node.frontmatter.img.childImageSharp.responsiveSizes.src} />
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
            img {
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
