export interface postsTypes {
  description: string,
  image: string,
  tag: string,
  user: {
      imgProfile: string,
      name: string
  },
  comment: Array<comment>
  id: string

}

export interface comment {
  id: number,
  name: string,
  photo: string,
  texts: string
}