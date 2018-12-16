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

describe('Render Weekly Post', () => {
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

  it('contains a weekly post', () => {
    const weeklyPost = shallow(
      <WeeklyPost
        authors={weekly_posts[0]._embedded['wp:term'][2]}
        categories={weekly_posts[0]._embedded['wp:term'][0]}
        changePage={() => console.log('change page')}
        content={weekly_posts[0].excerpt.rendered}
        key={weekly_posts[0].id}
        post={weekly_posts[0]}
        tags={weekly_posts[0]._embedded['wp:term'][1]}
      />
    );

    expect(weeklyPost.length).toEqual(1);
  });

  afterEach(() => {
    wrapper.unmount();
  });
});
