import React from 'react';
import App from '../../App';
import { shallow } from 'enzyme';
import mockAxios from 'axios';
import {
  categories,
  pages,
  post_author,
  tags,
  weekly_posts
} from '../__mockData__';
import { fetchAll } from '../';

const fetchMock = mockData => {
  mockAxios.get.mockImplementationOnce(() => {
    return Promise.resolve({ data: mockData });
  });
};

it('fetches all http requests', async () => {
  const wrapper = shallow(<App />);

  fetchMock(categories);
  fetchMock(pages);
  fetchMock(post_author);
  fetchMock(tags);
  fetchMock(weekly_posts);

  const data = await Promise.all([
    fetchAll('categories'),
    fetchAll('pages'),
    fetchAll('post_author'),
    fetchAll('tags'),
    fetchAll('weekly_posts')
  ]);

  wrapper.setState({
    categories: data[0],
    pages: data[1],
    post_author: data[2],
    tags: data[3],
    weekly_posts: data[4],
    loading: false
  });

  console.log(wrapper.find('.header'));
});
