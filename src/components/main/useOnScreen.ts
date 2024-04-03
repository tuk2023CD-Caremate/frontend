import { useEffect, useState } from 'react'

// 요소가 화면에 보일 때 콜백 함수를 실행할 수 있도록 해주는 커스텀 훅
function useOnScreen(ref: { current: Element }) {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)
      },
      { threshold: 0.3 }, // 화면의 30%가 보일경우
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.unobserve(ref.current)
    }
  }, [])

  return isIntersecting
}

export default useOnScreen
