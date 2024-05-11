import { create } from 'zustand'

// interface SelectContentState { //ts를 사용하기때문에 타입지정이 필요.js사용시 미사용 코드
//   selectContent: number;
//   setSelectContent: (select: number) => void;
// }

// // create를 이용해서 store을 생상헐 수 있으며, 다수의 store도 생성 가능하다.
// export const useStore = create<SelectContentState>((set) => ({
//   // create 함수의 매개변수로 콜백함수를 받는데 이 콜백함수의  return객체에 state,
//   // setState를 넣는다.
//   selectContent: window.localStorage.getItem('select') ?
//   	Number(window.localStorage.getItem('select')) : 0,
//   setSelectContent: (select) => {
//     set((state) => ({ ...state, selectContent: select }));
//   },
// }));

/* api */
interface ApiUrlState {
  apiUrl: string
  setApiUrl: (url: string) => void
}
export const useApiUrlStore = create<ApiUrlState>((set) => ({
  apiUrl: 'https://studymate154.com/api',
  // apiUrl: 'http://studymate154.com:8080/api',
  // apiUrl: 'http://localhost:8080/api',
  setApiUrl: (url: string) => set((state) => ({ ...state, apiUrl: url })),
}))

/* 유저 리스트 */
interface UserListState {
  userList: UserList[]
  setUserList: (userList: UserList[]) => void
}

interface UserList {
  id: number
  name: string
  nickname: string
  part: string
  email: string
  tel: number
  expertiseField: string
  interests: string
  blogUrl: string
  publicRelations: string
  job: string
  heart: number
  starAverage: number
  solved: number
  matchingCount: number
}

export const useUserListStore = create<UserListState>((set) => ({
  userList: [],
  setUserList: (userList) => set({ userList }),
}))

/* 게시글 배열 데이터*/
interface PostListState {
  postsList: PostsList[]
  setPostList: (postsList: PostsList[]) => void
}

export interface PostsList {
  post_id: number
  title: string
  content: string
  nickname: string
  createdAt: string
  likeCount: number
  commentCount: number
  interests: string
  category: string
  recruitmentStatus: boolean
}

export const usePostListStore = create<PostListState>((set) => ({
  postsList: [],
  setPostList: (postsList) => set({ postsList }),
}))

/* 상세 게시글 객체 데이터*/
interface PostState {
  postData: PostsList
  setPostData: (postData: PostsList) => void
}

export const usePostStore = create<PostState>((set) => ({
  postData: {
    post_id: 0,
    title: '',
    content: '',
    nickname: '',
    createdAt: '',
    likeCount: 0,
    commentCount: 0,
    interests: '',
    category: '',
    recruitmentStatus: false,
  },
  setPostData: (postData) => set({ postData: postData }),
}))

/* 좋아요게시글 데이터*/
interface LikeState {
  likeList: PostsList[]
  setLikedList: (likeList: PostsList[]) => void
}

export const useLikeDataStore = create<LikeState>((set) => ({
  likeList: [],
  setLikedList: (likeList) => set({ likeList }),
}))

/* 필터링게시글 데이터*/
interface FilterState {
  filterList: PostsList[]
  setFilterList: (filterList: PostsList[]) => void
}

export const useFilterListStore = create<FilterState>((set) => ({
  filterList: [],
  setFilterList: (filterList) => set({ filterList }),
}))

/* 댓글 데이터*/
interface CommentDataState {
  commentData: CommentData[]
  setCommentData: (commentData: CommentData[]) => void
}

interface CommentData {
  post_id: number
  nickname: string
  content: string
  comment_id: number
  createdAt: string
}

export const useCommentDataStore = create<CommentDataState>((set) => ({
  commentData: [],
  setCommentData: (commentData) => set({ commentData }),
}))

/* 리뷰 리스트 */
interface ReviewListState {
  reviewList: ReviewList[]
  setReviewList: (reviewList: ReviewList[]) => void
}

interface ReviewList {
  reviewId: number
  title: string
  content: string
  writer: string
  mentor: string
  star: number
  isSolved: boolean
  heart: boolean
  createAt: string
}

export const useReviewListStore = create<ReviewListState>((set) => ({
  reviewList: [],
  setReviewList: (reviewList) => set({ reviewList }),
}))

/* 멘토 찾기 구분 */
interface IsAiBasedState {
  isAiBased: boolean
  setIsAiBased: (isAiBased: boolean) => void
}

export const useIsAiBasedStore = create<IsAiBasedState>((set) => ({
  isAiBased: false,
  setIsAiBased: (isAiBased: boolean) => set({ isAiBased }),
}))

/* 채팅 리스트 */
interface ChatRoomMember {
  id: number
  name: string
  nickname: string
  expertiseField: string
  interests: string[]
  login: boolean
}

interface ChatRoom {
  chatRoomId: number
  chatRoomName: string
  members: ChatRoomMember[]
}

interface ChatListState {
  chatList: ChatRoom[]
  setChatList: (chatList: ChatRoom[]) => void
}

export const useChatListStore = create<ChatListState>((set) => ({
  chatList: [],
  setChatList: (chatList) => set({ chatList }),
}))
