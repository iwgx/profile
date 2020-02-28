import React from 'react';
import { graphql } from 'gatsby';

import { SEO } from '../components/seo';

import { renderRichText } from '../utils/blog/renderRichText';
import { renderTopics } from '../utils/blog/renderTopics';
import { renderDate } from '../utils/blog/renderDate';

const BlogPost = ({ data }) => {
  const { title, topics, createdAt, updatedAt, banner, content } = data.contentfulBlog;

  return (
    <main className="bg-blue-700 text-white min-h-screen py-8 px-12 flex flex-col">
      <SEO title={title} />
      <div className="blogpost">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-base">
          <span>created: {renderDate(createdAt)} </span>
          <span>last update: {renderDate(updatedAt)}</span>
        </p>
        <p className="text-base">{renderTopics(topics)}</p>
        <img src={banner.file.url} alt="banner" className="w-1/3" />
        <div className="my-4">{renderRichText(content.json)}</div>
      </div>
    </main>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query($id: String!) {
    contentfulBlog(id: { eq: $id }) {
      title
      topics
      createdAt
      updatedAt
      banner {
        file {
          url
        }
      }
      content {
        json
      }
    }
  }
`;