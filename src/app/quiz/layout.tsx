import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '매트리스 추천 퀴즈 | 침대 커뮤니티',
  description: '수면 자세, 체형, 선호도에 맞는 매트리스를 찾아드립니다',
}

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
