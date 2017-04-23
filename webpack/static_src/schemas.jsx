import { schema } from 'normalizr';

export const userSchema = new schema.Entity('users');
export const postSchema = new schema.Entity('posts', {
  author: userSchema,
});
export const userPostSchema = new schema.Entity('userPosts', {
  author: userSchema,
});
