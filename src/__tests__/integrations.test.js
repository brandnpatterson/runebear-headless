import React from 'react';
import App from '../App';
import WeeklyPosts from '../components/weekly/WeeklyPosts';
import { MemoryRouter, Route } from 'react-router';
import { mount, render, shallow } from 'enzyme';
import mockAxios from 'axios';
import {
  categories,
  pages,
  post_author,
  tags,
  weekly_posts
} from '../__mockData__';
import { fetchAll } from '../api';

const fetchMock = mockData => {
  mockAxios.get.mockImplementationOnce(() => {
    return Promise.resolve({ data: mockData });
  });
};

let wrapper;
beforeEach(() => {
  wrapper = mount(
    <MemoryRouter initialEntries={['/weekly']} initialIndex={0}>
      <App>
        <Route path="/weekly" render={() => <WeeklyPosts />} />
      </App>
    </MemoryRouter>
  );
});

it('fetches all http requests', async () => {
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

  expect(wrapper.length).toBeGreaterThan(0);
});

afterEach(() => {
  wrapper.unmount();
});
