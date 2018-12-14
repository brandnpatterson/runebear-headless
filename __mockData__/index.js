const pages = [
  {
    id: 2,
    date: '2018-05-19T13:20:33',
    date_gmt: '2018-05-19T13:20:33',
    guid: {
      rendered: 'https://admin.runebear.com/?page_id=2'
    },
    modified: '2018-06-02T03:55:12',
    modified_gmt: '2018-06-02T03:55:12',
    slug: 'home',
    status: 'publish',
    type: 'page',
    link: 'https://admin.runebear.com/home/',
    title: {
      rendered: 'Home'
    },
    content: {
      rendered: 'test page',
      protected: false
    },
    excerpt: {
      rendered:
        '<p>Rune Bear is a digital literary magazine dedicated to the Strange, Surreal, Supernatural, and Speculative.</p>\n',
      protected: false
    },
    author: 3,
    featured_media: 0,
    parent: 0,
    menu_order: 0,
    comment_status: 'closed',
    ping_status: 'open',
    template: '',
    meta: [],
    acf: [],
    _links: {
      self: [
        {
          href: 'https://admin.runebear.com/wp-json/wp/v2/pages/2'
        }
      ],
      collection: [
        {
          href: 'https://admin.runebear.com/wp-json/wp/v2/pages'
        }
      ],
      about: [
        {
          href: 'https://admin.runebear.com/wp-json/wp/v2/types/page'
        }
      ],
      author: [
        {
          embeddable: true,
          href: 'https://admin.runebear.com/wp-json/wp/v2/users/3'
        }
      ],
      replies: [
        {
          embeddable: true,
          href: 'https://admin.runebear.com/wp-json/wp/v2/comments?post=2'
        }
      ],
      'version-history': [
        {
          count: 5,
          href: 'https://admin.runebear.com/wp-json/wp/v2/pages/2/revisions'
        }
      ],
      'predecessor-version': [
        {
          id: 93,
          href: 'https://admin.runebear.com/wp-json/wp/v2/pages/2/revisions/93'
        }
      ],
      'wp:attachment': [
        {
          href: 'https://admin.runebear.com/wp-json/wp/v2/media?parent=2'
        }
      ],
      curies: [
        {
          name: 'wp',
          href: 'https://api.w.org/{rel}',
          templated: true
        }
      ]
    },
    _embedded: {
      author: [
        {
          id: 3,
          name: 'brandon',
          url: '',
          description: '',
          link: 'https://admin.runebear.com/author/brandon/',
          slug: 'brandon',
          avatar_urls: {
            '24':
              'https://secure.gravatar.com/avatar/02a25706946c36f27fa7270fa3bfbd90?s=24&d=mm&r=g',
            '48':
              'https://secure.gravatar.com/avatar/02a25706946c36f27fa7270fa3bfbd90?s=48&d=mm&r=g',
            '96':
              'https://secure.gravatar.com/avatar/02a25706946c36f27fa7270fa3bfbd90?s=96&d=mm&r=g'
          },
          acf: [],
          _links: {
            self: [
              {
                href: 'https://admin.runebear.com/wp-json/wp/v2/users/3'
              }
            ],
            collection: [
              {
                href: 'https://admin.runebear.com/wp-json/wp/v2/users'
              }
            ]
          }
        }
      ]
    }
  }
];

const posts = [
  {
    id: 317,
    date: '2018-12-06T06:00:08',
    date_gmt: '2018-12-06T06:00:08',
    guid: {
      rendered: 'https://admin.runebear.com/?post_type=weekly&#038;p=317'
    },
    modified: '2018-12-05T04:30:43',
    modified_gmt: '2018-12-05T04:30:43',
    slug: 'a-zelzer-stiff',
    status: 'publish',
    type: 'weekly',
    link: 'https://admin.runebear.com/weekly/a-zelzer-stiff/',
    title: {
      rendered: 'A Zelzer Stiff'
    },
    content: {
      rendered: 'test post',
      protected: false
    },
    excerpt: {
      rendered:
        '<p>The android was making them all uncomfortable with its Zelzer Stiff eyeing them from its hip.</p>\n',
      protected: false
    },
    template: '',
    categories: [6],
    tags: [54],
    post_author: [5],
    acf: [],
    _links: {
      self: [
        {
          href: 'https://admin.runebear.com/wp-json/wp/v2/weekly_posts/317'
        }
      ],
      collection: [
        {
          href: 'https://admin.runebear.com/wp-json/wp/v2/weekly_posts'
        }
      ],
      about: [
        {
          href: 'https://admin.runebear.com/wp-json/wp/v2/types/weekly'
        }
      ],
      'version-history': [
        {
          count: 1,
          href:
            'https://admin.runebear.com/wp-json/wp/v2/weekly_posts/317/revisions'
        }
      ],
      'predecessor-version': [
        {
          id: 318,
          href:
            'https://admin.runebear.com/wp-json/wp/v2/weekly_posts/317/revisions/318'
        }
      ],
      'wp:attachment': [
        {
          href: 'https://admin.runebear.com/wp-json/wp/v2/media?parent=317'
        }
      ],
      'wp:term': [
        {
          taxonomy: 'category',
          embeddable: true,
          href: 'https://admin.runebear.com/wp-json/wp/v2/categories?post=317'
        },
        {
          taxonomy: 'post_tag',
          embeddable: true,
          href: 'https://admin.runebear.com/wp-json/wp/v2/tags?post=317'
        },
        {
          taxonomy: 'post_author',
          embeddable: true,
          href: 'https://admin.runebear.com/wp-json/wp/v2/post_author?post=317'
        }
      ],
      curies: [
        {
          name: 'wp',
          href: 'https://api.w.org/{rel}',
          templated: true
        }
      ]
    },
    _embedded: {
      'wp:term': [
        [
          {
            id: 6,
            link: 'https://admin.runebear.com/category/speculative/',
            name: 'Speculative',
            slug: 'speculative',
            taxonomy: 'category',
            acf: [],
            _links: {
              self: [
                {
                  href: 'https://admin.runebear.com/wp-json/wp/v2/categories/6'
                }
              ],
              collection: [
                {
                  href: 'https://admin.runebear.com/wp-json/wp/v2/categories'
                }
              ],
              about: [
                {
                  href:
                    'https://admin.runebear.com/wp-json/wp/v2/taxonomies/category'
                }
              ],
              'wp:post_type': [
                {
                  href:
                    'https://admin.runebear.com/wp-json/wp/v2/posts?categories=6'
                },
                {
                  href:
                    'https://admin.runebear.com/wp-json/wp/v2/weekly_posts?categories=6'
                },
                {
                  href:
                    'https://admin.runebear.com/wp-json/wp/v2/quarterly_posts?categories=6'
                }
              ],
              curies: [
                {
                  name: 'wp',
                  href: 'https://api.w.org/{rel}',
                  templated: true
                }
              ]
            }
          }
        ],
        [
          {
            id: 54,
            link: 'https://admin.runebear.com/tag/near-future/',
            name: 'Near-Future',
            slug: 'near-future',
            taxonomy: 'post_tag',
            _links: {
              self: [
                {
                  href: 'https://admin.runebear.com/wp-json/wp/v2/tags/54'
                }
              ],
              collection: [
                {
                  href: 'https://admin.runebear.com/wp-json/wp/v2/tags'
                }
              ],
              about: [
                {
                  href:
                    'https://admin.runebear.com/wp-json/wp/v2/taxonomies/post_tag'
                }
              ],
              'wp:post_type': [
                {
                  href: 'https://admin.runebear.com/wp-json/wp/v2/posts?tags=54'
                },
                {
                  href:
                    'https://admin.runebear.com/wp-json/wp/v2/weekly_posts?tags=54'
                },
                {
                  href:
                    'https://admin.runebear.com/wp-json/wp/v2/quarterly_posts?tags=54'
                }
              ],
              curies: [
                {
                  name: 'wp',
                  href: 'https://api.w.org/{rel}',
                  templated: true
                }
              ]
            }
          }
        ],
        [
          {
            id: 5,
            link: 'https://admin.runebear.com/post_author/desmond-white/',
            name: 'Desmond White',
            slug: 'desmond-white',
            taxonomy: 'post_author',
            acf: [],
            _links: {
              self: [
                {
                  href: 'https://admin.runebear.com/wp-json/wp/v2/post_author/5'
                }
              ],
              collection: [
                {
                  href: 'https://admin.runebear.com/wp-json/wp/v2/post_author'
                }
              ],
              about: [
                {
                  href:
                    'https://admin.runebear.com/wp-json/wp/v2/taxonomies/post_author'
                }
              ],
              'wp:post_type': [
                {
                  href:
                    'https://admin.runebear.com/wp-json/wp/v2/weekly_posts?post_author=5'
                },
                {
                  href:
                    'https://admin.runebear.com/wp-json/wp/v2/quarterly_posts?post_author=5'
                }
              ],
              curies: [
                {
                  name: 'wp',
                  href: 'https://api.w.org/{rel}',
                  templated: true
                }
              ]
            }
          }
        ]
      ]
    }
  }
];

const post_author = [
  {
    id: 5,
    count: 3,
    description: 'test post_author',
    name: 'Desmond White',
    slug: 'desmond-white',
    taxonomy: 'post_author',
    meta: [],
    acf: [],
    _links: {
      self: [
        {
          href: 'https://admin.runebear.com/wp-json/wp/v2/post_author/5'
        }
      ],
      collection: [
        {
          href: 'https://admin.runebear.com/wp-json/wp/v2/post_author'
        }
      ],
      about: [
        {
          href:
            'https://admin.runebear.com/wp-json/wp/v2/taxonomies/post_author'
        }
      ],
      'wp:post_type': [
        {
          href:
            'https://admin.runebear.com/wp-json/wp/v2/weekly_posts?post_author=5'
        },
        {
          href:
            'https://admin.runebear.com/wp-json/wp/v2/quarterly_posts?post_author=5'
        }
      ],
      curies: [
        {
          name: 'wp',
          href: 'https://api.w.org/{rel}',
          templated: true
        }
      ]
    }
  }
];

const categories = [
  {
    id: 6,
    count: 8,
    description: '',
    link: 'https://admin.runebear.com/category/speculative/',
    name: 'Speculative',
    slug: 'speculative',
    taxonomy: 'category',
    parent: 0,
    meta: [],
    acf: [],
    _links: {
      self: [
        {
          href: 'https://admin.runebear.com/wp-json/wp/v2/categories/6'
        }
      ],
      collection: [
        {
          href: 'https://admin.runebear.com/wp-json/wp/v2/categories'
        }
      ],
      about: [
        {
          href: 'https://admin.runebear.com/wp-json/wp/v2/taxonomies/category'
        }
      ],
      'wp:post_type': [
        {
          href: 'https://admin.runebear.com/wp-json/wp/v2/posts?categories=6'
        },
        {
          href:
            'https://admin.runebear.com/wp-json/wp/v2/weekly_posts?categories=6'
        },
        {
          href:
            'https://admin.runebear.com/wp-json/wp/v2/quarterly_posts?categories=6'
        }
      ],
      curies: [
        {
          name: 'wp',
          href: 'https://api.w.org/{rel}',
          templated: true
        }
      ]
    }
  }
];

const tags = [
  {
    id: 54,
    count: 3,
    description: '',
    link: 'https://admin.runebear.com/tag/near-future/',
    name: 'Near-Future',
    slug: 'near-future',
    taxonomy: 'post_tag',
    meta: [],
    _links: {
      self: [
        {
          href: 'https://admin.runebear.com/wp-json/wp/v2/tags/54'
        }
      ],
      collection: [
        {
          href: 'https://admin.runebear.com/wp-json/wp/v2/tags'
        }
      ],
      about: [
        {
          href: 'https://admin.runebear.com/wp-json/wp/v2/taxonomies/post_tag'
        }
      ],
      'wp:post_type': [
        {
          href: 'https://admin.runebear.com/wp-json/wp/v2/posts?tags=54'
        },
        {
          href: 'https://admin.runebear.com/wp-json/wp/v2/weekly_posts?tags=54'
        },
        {
          href:
            'https://admin.runebear.com/wp-json/wp/v2/quarterly_posts?tags=54'
        }
      ],
      curies: [
        {
          name: 'wp',
          href: 'https://api.w.org/{rel}',
          templated: true
        }
      ]
    }
  }
];

export { posts, pages, post_author, categories, tags };
