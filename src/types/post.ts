export interface postsTypes {
  description: string,
  id: string,
  image: string,
  tag: string,
  user: {
      imgProfile: string,
      name: string
  },
  comment: Array<comment>

}

export interface comment {
  id: number,
  name: string,
  photo: string,
  texts: string
}