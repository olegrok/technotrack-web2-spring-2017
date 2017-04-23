import React from 'react';
import { Route } from 'react-router';

import LayoutComponent from './components/layout';
import PostListLayoutComponent from './components/postListLayout';
import FriendListLayout from './components/friendList';
import UserPage from './components/userPage';
import ChatsListComponent from './components/chatsList';
import PeopleSearchComponent from './components/peopleSearch';

const routes = (
  <Route path="/" component={LayoutComponent}>
    <Route path="/news" component={PostListLayoutComponent} />
    <Route path="/wall" component={UserPage} />
    <Route path="/friends" component={FriendListLayout} />
    <Route path="/chats" component={ChatsListComponent} />
    <Route path="/people" component={PeopleSearchComponent} />
  </Route>
);

export default routes;
