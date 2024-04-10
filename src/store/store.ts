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
  apiUrl: 'http://study-mate.kro.kr:8080/api',
  // apiUrl: 'https://study-mate.kro.kr/api',
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
