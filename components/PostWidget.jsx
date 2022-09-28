/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';
import 'moment/locale/tr'

import { grpahCMSImageLoader } from '../util';
import { getSimilarPosts, getRecentPosts } from '../services';

const PostWidget = ({ categories, slug }) => {
  const [relatedPosts, setRelatedPosts] = useState([]);
  moment.locale('tr')
  useEffect(() => {
    if (slug) {
      getSimilarPosts(categories, slug).then((result) => {
        setRelatedPosts(result);
      });
    } else {
      getRecentPosts().then((result) => {
        setRelatedPosts(result);
      });
    }
  }, [slug, categories]);

  return (
    <div className="bg-white shadow-md rounded-md p-6 pb-12 mb-8">
      <h3 className="text-teal-600 text-l mb-8 font-semibold border-b pb-4">
        {slug ? 'İlgili Mesajlar' : 'Son Eklenenler'}
      </h3>
      {relatedPosts.map((post) => (
        <div key={post.slug} className="flex items-center w-full mb-4 text-medicus">
          <div className="w-16 flex-none">
            <Image
              loader={grpahCMSImageLoader}
              alt={post.title}
              height="60px"
              width="60px"
              quality={50}
              loading="lazy"
              unoptimized
              className="align-middle rounded-full"
              src={post.featuredImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs text-sm">
              {moment(post.createdAt).format('DD MMM YYYY')}
            </p>
            <Link href={`/blog/${post.slug}`} key={post.slug}>
              <a className="text-sm hover:text-sky-700">
                {post.title}
              </a>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
