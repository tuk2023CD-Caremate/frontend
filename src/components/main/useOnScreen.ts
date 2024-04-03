import { useEffect, useState } from 'react'

// 요소가 화면에 보일 때 콜백 함수를 실행할 수 있도록 해주는 커스텀 훅
function useOnScreen(ref: { current: Element | null }) {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)
      },
      { threshold: 0.3 }, // 화면의 30%가 보일경우
    )

    observer.observe(ref.current)

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref])

  return isIntersecting
}

export default useOnScreen
