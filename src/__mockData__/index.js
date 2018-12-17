const categories = [
  {
    id: 6,
    count: 8,
    name: 'Speculative',
    slug: 'speculative',
    taxonomy: 'category'
  }
];

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
      rendered: 'home',
      protected: false
    },
    excerpt: {
      rendered: 'home',
      protected: false
    },
    author: 3,
    featured_media: 0,
    parent: 0,
    menu_order: 0,
    comment_status: 'closed'
  }
];

const post_author = [
  {
    id: 5,
    count: 3,
    description: 'desmond white',
    name: 'Desmond White',
    slug: 'desmond-white',
    taxonomy: 'post_author'
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
    taxonomy: 'post_tag'
  }
];

const weekly_posts = [
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
      rendered: 'a zelzer stiff',
      protected: false
    },
    excerpt: {
      rendered: 'a zelzer stiff',
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
  },
  {
    id: 300,
    date: '2018-12-06T06:00:08',
    date_gmt: '2018-12-06T06:00:08',
    guid: {
      rendered: 'https://admin.runebear.com/?post_type=weekly&#038;p=317'
    },
    modified: '2018-12-05T04:30:43',
    modified_gmt: '2018-12-05T04:30:43',
    slug: 'test-2',
    status: 'publish',
    type: 'weekly',
    link: 'https://admin.runebear.com/weekly/test-2/',
    title: {
      rendered: 'Test 2'
    },
    content: {
      rendered: 'Test 2',
      protected: false
    },
    excerpt: {
      rendered: 'Test 2',
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

export { categories, pages, post_author, tags, weekly_posts };
