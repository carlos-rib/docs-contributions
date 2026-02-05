import React, {useId, useMemo} from 'react';
import clsx from 'clsx';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import styles from './Authors.module.css';

function isMissingDocContextError(error) {
  return (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string' &&
    error.message.includes('DocProvider')
  );
}

function useDocFrontMatter() {
  try {
    const doc = useDoc();
    return doc?.frontMatter ?? doc?.metadata?.frontMatter ?? null;
  } catch (error) {
    if (isMissingDocContextError(error)) {
      return null;
    }
    throw error;
  }
}

function ensureArray(value) {
  if (!value) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

function normalizeLinks(rawLinks = []) {
  return ensureArray(rawLinks)
    .map((link) => {
      if (!link) {
        return null;
      }
      if (typeof link === 'string') {
        const trimmed = link.trim();
        if (!trimmed) {
          return null;
        }
        return {label: trimmed, url: trimmed};
      }
      if (typeof link === 'object' && link.url) {
        const url = typeof link.url === 'string' ? link.url.trim() : '';
        if (!url) {
          return null;
        }
        return {
          label: link.label ?? link.title ?? url,
          url,
        };
      }
      return null;
    })
    .filter(Boolean);
}

function ensureProtocol(url) {
  if (!url) {
    return undefined;
  }
  const trimmed = url.trim();
  if (trimmed === '') {
    return undefined;
  }
  if (/^[a-z]+:/i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

function normalizeOrcid(orcid) {
  if (!orcid) {
    return undefined;
  }
  const trimmed = orcid.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  const withoutProtocol = trimmed.replace(/^https?:\/\//i, '');
  const withoutDomain = withoutProtocol.replace(/^orcid\.org\//i, '');
  return `https://orcid.org/${withoutDomain}`;
}

function normalizeAuthor(rawAuthor, index) {
  if (!rawAuthor) {
    return null;
  }

  if (typeof rawAuthor === 'string') {
    const name = rawAuthor.trim();
    if (!name) {
      return null;
    }
    return {
      key: `author-${index}-${name}`,
      name,
      roles: [],
      links: [],
    };
  }

  if (typeof rawAuthor !== 'object') {
    return null;
  }

  const name =
    rawAuthor.name ??
    rawAuthor.fullName ??
    rawAuthor.full_name ??
    rawAuthor.displayName ??
    '';

  if (!name) {
    return null;
  }

  const primaryRole = rawAuthor.role ?? rawAuthor.title;
  const roles = ensureArray(rawAuthor.roles ?? rawAuthor.titles ?? primaryRole).filter(
    Boolean,
  );

  const links = normalizeLinks(rawAuthor.links);

  const website = ensureProtocol(rawAuthor.url ?? rawAuthor.website ?? rawAuthor.homepage);
  const orcid = normalizeOrcid(rawAuthor.orcid);
  const email = rawAuthor.email ? rawAuthor.email.trim() : undefined;

  if (email) {
    links.unshift({
      label: rawAuthor.emailLabel ?? 'Email',
      url: `mailto:${email}`,
    });
  }

  if (orcid) {
    links.push({
      label: 'ORCID',
      url: orcid,
    });
  }

  if (website) {
    links.push({
      label: rawAuthor.websiteLabel ?? 'Website',
      url: website,
    });
  }

  const uniqueLinks = [];
  const seenLinks = new Set();
  for (const link of links) {
    if (!link) {
      continue;
    }
    const key = `${link.label}-${link.url}`;
    if (seenLinks.has(key)) {
      continue;
    }
    seenLinks.add(key);
    uniqueLinks.push(link);
  }

  return {
    key: rawAuthor.id ?? rawAuthor.key ?? `author-${index}-${name}`,
    name,
    pronouns: rawAuthor.pronouns,
    roles,
    affiliation:
      rawAuthor.affiliation ??
      rawAuthor.institution ??
      rawAuthor.organization ??
      rawAuthor.organisation,
    location: rawAuthor.location,
    contribution: rawAuthor.contribution ?? rawAuthor.summary ?? rawAuthor.description,
    links: uniqueLinks,
  };
}

function normalizeAuthors(authors) {
  return ensureArray(authors)
    .map(normalizeAuthor)
    .filter(Boolean);
}

function Authors({
  authors: authorsProp,
  heading = 'Authors',
  showHeading = true,
  className,
}) {
  const headingId = useId();
  const frontMatter = useDocFrontMatter();

  const authors = useMemo(() => {
    const sourceAuthors =
      authorsProp ??
      (frontMatter
        ? frontMatter.authors ?? frontMatter.author
        : undefined);
    return normalizeAuthors(sourceAuthors);
  }, [authorsProp, frontMatter]);

  if (authors.length === 0) {
    return null;
  }

  return (
    <section
      className={clsx(styles.container, className)}
      aria-labelledby={showHeading ? headingId : undefined}>
      {showHeading && (
        <h2 id={headingId} className={styles.heading}>
          {heading}
        </h2>
      )}
      <div className={styles.list}>
        {authors.map((author) => (
          <article className={styles.card} key={author.key}>
            <div className={styles.content}>
              <div className={styles.nameRow}>
                <h3 className={styles.name}>{author.name}</h3>
                {author.pronouns && (
                  <span className={styles.pronouns}>({author.pronouns})</span>
                )}
              </div>
              {author.roles.length > 0 && (
                <p className={styles.metaText}>{author.roles.join(' · ')}</p>
              )}
              {author.affiliation && (
                <p className={styles.metaText}>{author.affiliation}</p>
              )}
              {author.location && (
                <p className={styles.metaText}>{author.location}</p>
              )}
              {author.contribution && (
                <p className={styles.contribution}>{author.contribution}</p>
              )}
              {author.links.length > 0 && (
                <div className={styles.links}>
                  {author.links.map((link) => {
                    const isExternal = /^https?:\/\//i.test(link.url);
                    return (
                      <a
                        key={`${author.key}-${link.label}-${link.url}`}
                        href={link.url}
                        className={styles.link}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}>
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Authors;
