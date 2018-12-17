import React from 'react';
import App from '../App';
import WeeklyPost from '../components/weekly/WeeklyPost';
import WeeklyPosts from '../components/weekly/WeeklyPosts';
import { MemoryRouter, Route } from 'react-router';
import { mount, shallow } from 'enzyme';
import mockAxios from 'axios';
import {
  categories,
  pages,
  post_author,
  tags,
  weekly_posts
} from '../__mockData__';
import { fetchAll } from '../api';

describe('Render Weekly Posts', () => {
  let wrapper;
  const fetchMock = mockData => {
    mockAxios.get.mockImplementationOnce(() => {
      return Promise.resolve({ data: mockData });
    });
  };

  beforeEach(async () => {
    fetchMock(categories);
    fetchMock(pages);
    fetchMock(post_author);
    fetchMock(tags);
    fetchMock(weekly_posts);

    await Promise.all([
      fetchAll('categories'),
      fetchAll('pages'),
      fetchAll('post_author'),
      fetchAll('tags'),
      fetchAll('weekly_posts')
    ]);

    wrapper = mount(
      <MemoryRouter initialEntries={['/weekly']} initialIndex={0}>
        <App>
          <Route path="/weekly" render={() => <WeeklyPosts />} />
        </App>
      </MemoryRouter>
    );
  });

  it('renderd two weekly posts', () => {
    const weeklyPost = weekly_posts.map(post => {
      return shallow(
        <WeeklyPost
          authors={post._embedded['wp:term'][2]}
          categories={post._embedded['wp:term'][0]}
          changePage={() => console.log('change page')}
          content={post.excerpt.rendered}
          key={post.id}
          post={post}
          tags={post._embedded['wp:term'][1]}
        />
      );
    });

    expect(weeklyPost.length).toEqual(2);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
