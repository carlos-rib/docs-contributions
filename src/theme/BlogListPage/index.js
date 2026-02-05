import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import BlogListPaginator from '@theme/BlogListPaginator';
import SearchMetadata from '@theme/SearchMetadata';
import BlogPostItems from '@theme/BlogPostItems';
import BlogListPageStructuredData from '@theme/BlogListPage/StructuredData';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@site/src/components/Accordion/Accordion.jsx';

import './index.css';

function BlogListPageMetadata(props) {
  const { metadata } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag='blog_posts_list' />
    </>
  );
}

function BlogListPageContent(props) {
  const { metadata, items, sidebar } = props;

  const sortedLogs = React.useMemo(
    () =>
      [...items].sort((a, b) => {
        const da = new Date(a.content.metadata.date).getTime();
        const db = new Date(b.content.metadata.date).getTime();
        return db - da;
      }),
    [items]
  );

  return (
    <BlogLayout sidebar={sidebar}>
      <div className='margin-bottom--lg'>
        <h1 className='margin-vert--sm'>Changelog</h1>
        {metadata?.blogDescription ? (
          <p className='subtitle'>{metadata.blogDescription}</p>
        ) : null}
      </div>
      {/* temporary placeholder for empty changelog */}
      {sortedLogs.length === 1 &&
      sortedLogs[0].content.metadata.slug === '__placeholder' ? (
        <div className='empty-state'>
          <h3>No changes yet</h3>
          <p>We’ll publish our first release notes here soon.</p>
        </div>
      ) : (
        <div className='timeline-root'>
          {sortedLogs.map(({ content }) => {
            const Post = content;
            const fm = content.frontMatter;
            const md = content.metadata;

            const features = fm.features;
            const bugFixes = fm.bugFixes;
            const dateStr = new Date(md.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            const version = fm?.version;

            return (
              <div key={md.permalink} className='timeline-item'>
                <div className='row'>
                  {/* Left column -- date + version */}
                  <div className='col col--3 col--md-3'>
                    <div className='timeline-left'>
                      <time className='timeline-date'>{dateStr}</time>
                      {version ? (
                        <div className='timeline-version badge badge--primary'>
                          {version}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Right column: line + dot + content */}
                  <div className='col col--9 col--md-9 timeline-right'>
                    <div className='timeline-line' />
                    <div className='timeline-dot' />

                    <article className='timeline-content'>
                      <h2 className='margin-bottom--sm'>
                        <a
                          href={md.permalink}
                          className='clean-link timeline-title'
                        >
                          {md.title}
                        </a>
                      </h2>
                      {/* Tags  */}
                      {md.tags?.length ? (
                        <div className='margin-bottom--sm tags-container'>
                          {md.tags.map((t) => (
                            <span
                              key={t.permalink}
                              className='tags margin-right--sm'
                            >
                              {t.label}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      <div className='changelog-post'>
                        <Post />
                      </div>

                      {(features || bugFixes) && (
                        <Accordion
                          type='multiple'
                          className='w-full not-prose margin-top--md changelog-accordion'
                        >
                          {features?.length ? (
                            <AccordionItem value='features'>
                              <AccordionTrigger>Features</AccordionTrigger>
                              <AccordionContent>
                                <ul className='list-disc pl-4'>
                                  {features.map((f, i) => (
                                    <li key={i}>{f}</li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          ) : null}

                          {bugFixes?.length ? (
                            <AccordionItem value='bug-fixes'>
                              <AccordionTrigger>Bug Fixes</AccordionTrigger>
                              <AccordionContent>
                                <ul className='list-disc pl-4'>
                                  {bugFixes.map((b, i) => (
                                    <li key={i}>{b}</li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          ) : null}
                        </Accordion>
                      )}
                    </article>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {metadata && <BlogListPaginator metadata={metadata} />}
    </BlogLayout>
  );
}

export default function BlogListPage(props) {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage
      )}
    >
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
