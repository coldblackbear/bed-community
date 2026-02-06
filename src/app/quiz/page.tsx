"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SLEEP_POSITIONS, BODY_WEIGHTS, type SleepPosition, type BodyWeight, type MattressType } from "@/types"
import { ArrowLeft, Check } from "lucide-react"

type Firmness = 'soft' | 'medium' | 'hard'
type Budget = 'under50' | '50to100' | '100to200' | 'over200'

interface QuizState {
  sleepPosition: SleepPosition | null
  bodyWeight: BodyWeight | null
  firmness: Firmness | null
  budget: Budget | null
  specialNeeds: string[]
}

interface RecommendationResult {
  mattressTypes: MattressType[]
  firmnessRange: { min: number; max: number }
  advice: string
}

const FIRMNESS_OPTIONS = [
  { value: 'soft' as const, label: '소프트', description: '구름 위 같은' },
  { value: 'medium' as const, label: '미디엄', description: '적당히 탄탄한' },
  { value: 'hard' as const, label: '하드', description: '단단하게 지지하는' },
]

const BUDGET_OPTIONS = [
  { value: 'under50' as const, label: '50만원 이하' },
  { value: '50to100' as const, label: '50~100만원' },
  { value: '100to200' as const, label: '100~200만원' },
  { value: 'over200' as const, label: '200만원 이상' },
]

const SPECIAL_NEEDS = [
  { value: 'back_pain', label: '허리/목 통증 있음' },
  { value: 'hot_sleeper', label: '더위를 많이 탐' },
  { value: 'allergies', label: '알레르기 있음' },
  { value: 'partner', label: '파트너와 함께 사용' },
]

function getRecommendation(state: QuizState): RecommendationResult {
  const { sleepPosition, bodyWeight } = state

  // Basic recommendation logic
  let firmnessRange = { min: 5, max: 7 }
  let mattressTypes: MattressType[] = ['hybrid']
  let advice = ''

  if (sleepPosition === 'side') {
    if (bodyWeight === 'light') {
      firmnessRange = { min: 3, max: 5 }
      mattressTypes = ['memory_foam', 'hybrid']
      advice = '옆으로 자는 분은 어깨 압점 해소를 위해 중간~소프트 매트리스가 좋습니다. 가벼운 체중이시므로 메모리폼이나 부드러운 하이브리드를 추천합니다.'
    } else if (bodyWeight === 'average') {
      firmnessRange = { min: 4, max: 6 }
      mattressTypes = ['memory_foam', 'hybrid']
      advice = '옆으로 자는 분은 어깨와 골반의 압력 분산이 중요합니다. 메모리폼이나 하이브리드 매트리스가 적합합니다.'
    } else {
      firmnessRange = { min: 5, max: 7 }
      mattressTypes = ['hybrid']
      advice = '옆으로 자면서 체중이 있으신 분은 충분한 지지력이 필요합니다. 하이브리드 매트리스를 추천합니다.'
    }
  } else if (sleepPosition === 'back') {
    if (bodyWeight === 'light') {
      firmnessRange = { min: 4, max: 6 }
      mattressTypes = ['memory_foam', 'latex']
      advice = '바로 누워 자는 자세는 척추 정렬이 중요합니다. 메모리폼이나 라텍스 매트리스가 좋습니다.'
    } else if (bodyWeight === 'average') {
      firmnessRange = { min: 5, max: 7 }
      mattressTypes = ['hybrid', 'innerspring']
      advice = '바로 누워 자는 자세에는 적당한 지지력과 탄력이 필요합니다. 하이브리드나 스프링 매트리스를 추천합니다.'
    } else {
      firmnessRange = { min: 6, max: 8 }
      mattressTypes = ['innerspring', 'hybrid']
      advice = '바로 누워 자면서 체중이 있으신 분은 단단한 지지력이 필요합니다. 스프링이나 하이브리드 매트리스가 적합합니다.'
    }
  } else if (sleepPosition === 'stomach') {
    firmnessRange = { min: 6, max: 9 }
    mattressTypes = ['innerspring', 'hybrid']
    advice = '엎드려 자는 자세는 척추가 과도하게 휘지 않도록 단단한 매트리스가 필요합니다. 스프링이나 하이브리드 매트리스를 추천합니다.'
  } else if (sleepPosition === 'combination') {
    firmnessRange = { min: 5, max: 7 }
    mattressTypes = ['hybrid']
    advice = '자세를 자주 바꾸시는 분은 다양한 자세에 대응할 수 있는 균형잡힌 매트리스가 좋습니다. 하이브리드 매트리스를 추천합니다.'
  }

  return { mattressTypes, firmnessRange, advice }
}

export default function QuizPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [state, setState] = useState<QuizState>({
    sleepPosition: null,
    bodyWeight: null,
    firmness: null,
    budget: null,
    specialNeeds: [],
  })
  const [showResult, setShowResult] = useState(false)

  const totalSteps = 5
  const progress = (step / totalSteps) * 100

  const handleSleepPosition = (value: SleepPosition) => {
    setState({ ...state, sleepPosition: value })
    setStep(2)
  }

  const handleBodyWeight = (value: BodyWeight) => {
    setState({ ...state, bodyWeight: value })
    setStep(3)
  }

  const handleFirmness = (value: Firmness) => {
    setState({ ...state, firmness: value })
    setStep(4)
  }

  const handleBudget = (value: Budget) => {
    setState({ ...state, budget: value })
    setStep(5)
  }

  const toggleSpecialNeed = (value: string) => {
    setState({
      ...state,
      specialNeeds: state.specialNeeds.includes(value)
        ? state.specialNeeds.filter((n) => n !== value)
        : [...state.specialNeeds, value],
    })
  }

  const handleComplete = () => {
    setShowResult(true)
  }

  const handleBack = () => {
    if (showResult) {
      setShowResult(false)
      return
    }
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleReset = () => {
    setState({
      sleepPosition: null,
      bodyWeight: null,
      firmness: null,
      budget: null,
      specialNeeds: [],
    })
    setStep(1)
    setShowResult(false)
  }

  const handleViewProducts = () => {
    const recommendation = getRecommendation(state)
    const params = new URLSearchParams({
      firmness_min: recommendation.firmnessRange.min.toString(),
      firmness_max: recommendation.firmnessRange.max.toString(),
      type: recommendation.mattressTypes[0],
    })
    router.push(`/products?${params.toString()}`)
  }

  if (showResult) {
    const recommendation = getRecommendation(state)
    const mattressTypeLabels = recommendation.mattressTypes
      .map((type) => {
        const labels: Record<MattressType, string> = {
          innerspring: '스프링',
          memory_foam: '메모리폼',
          latex: '라텍스',
          hybrid: '하이브리드',
          airbed: '에어베드',
          waterbed: '워터베드',
        }
        return labels[type]
      })
      .join(', ')

    return (
      <div className="container max-w-3xl py-8 px-4">
        <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          뒤로 가기
        </Button>

        <Card className="border-2">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl">당신에게 맞는 매트리스를 찾았습니다!</CardTitle>
            <CardDescription>분석 결과를 바탕으로 추천드립니다</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-muted p-6 space-y-4">
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-2">추천 매트리스 타입</h3>
                <p className="text-xl font-bold">{mattressTypeLabels}</p>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-2">추천 단단함 범위</h3>
                <p className="text-xl font-bold">
                  {recommendation.firmnessRange.min} - {recommendation.firmnessRange.max}점
                </p>
                <p className="text-sm text-muted-foreground mt-1">(1: 매우 부드러움 ~ 10: 매우 단단함)</p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">맞춤 조언</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{recommendation.advice}</p>
            </div>

            {state.specialNeeds.length > 0 && (
              <div className="space-y-2">
                <h3 className="font-semibold">참고사항</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {state.specialNeeds.includes('back_pain') && (
                    <li>• 허리/목 통증이 있으신 경우 정형외과 전문의와 상담 후 선택하시는 것을 권장합니다.</li>
                  )}
                  {state.specialNeeds.includes('hot_sleeper') && (
                    <li>• 더위를 많이 타시는 경우 통기성이 좋은 라텍스나 스프링 코어가 있는 제품을 추천합니다.</li>
                  )}
                  {state.specialNeeds.includes('allergies') && (
                    <li>• 알레르기가 있으신 경우 항균, 방진드기 커버가 있는 제품을 선택하시기 바랍니다.</li>
                  )}
                  {state.specialNeeds.includes('partner') && (
                    <li>• 2인 사용 시 진동 차단이 우수한 메모리폼이나 포켓 스프링 제품을 권장합니다.</li>
                  )}
                </ul>
              </div>
            )}

            <div className="flex gap-3">
              <Button className="flex-1" size="lg" onClick={handleViewProducts}>
                맞는 제품 보기
              </Button>
              <Button variant="outline" size="lg" onClick={handleReset}>
                다시 하기
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-3xl py-8 px-4">
      {step > 1 && (
        <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          이전
        </Button>
      )}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            {step} / {totalSteps}
          </span>
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>주로 어떤 자세로 주무시나요?</CardTitle>
            <CardDescription>가장 많이 취하는 수면 자세를 선택해주세요</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {SLEEP_POSITIONS.map((position) => (
              <Button
                key={position.value}
                variant="outline"
                className="h-auto py-6 justify-start text-left"
                onClick={() => handleSleepPosition(position.value)}
              >
                <div className="text-2xl mr-4">
                  {position.value === 'back' && '🛌'}
                  {position.value === 'side' && '😴'}
                  {position.value === 'stomach' && '🤿'}
                  {position.value === 'combination' && '🔄'}
                </div>
                <span className="text-lg">{position.label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>체중대를 알려주세요</CardTitle>
            <CardDescription>매트리스 지지력 결정에 중요한 요소입니다</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {BODY_WEIGHTS.map((weight) => (
              <Button
                key={weight.value}
                variant="outline"
                className="h-auto py-6 justify-start text-left flex-col items-start"
                onClick={() => handleBodyWeight(weight.value)}
              >
                <span className="text-lg font-semibold">{weight.label}</span>
                <span className="text-sm text-muted-foreground">{weight.range}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>어떤 느낌을 선호하세요?</CardTitle>
            <CardDescription>매트리스 단단함에 대한 선호도를 알려주세요</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {FIRMNESS_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                className="h-auto py-6 justify-start text-left flex-col items-start"
                onClick={() => handleFirmness(option.value)}
              >
                <span className="text-lg font-semibold">{option.label}</span>
                <span className="text-sm text-muted-foreground">{option.description}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>예산 범위를 알려주세요</CardTitle>
            <CardDescription>퀸 사이즈 기준 구매 가능 예산을 선택해주세요</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {BUDGET_OPTIONS.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                className="h-auto py-6 justify-start text-left"
                onClick={() => handleBudget(option.value)}
              >
                <span className="text-lg">{option.label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 5 && (
        <Card>
          <CardHeader>
            <CardTitle>해당되는 항목을 모두 선택하세요</CardTitle>
            <CardDescription>특별히 고려해야 할 사항이 있다면 알려주세요 (선택사항)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {SPECIAL_NEEDS.map((need) => (
                <Button
                  key={need.value}
                  variant={state.specialNeeds.includes(need.value) ? 'default' : 'outline'}
                  className="h-auto py-4 justify-start text-left"
                  onClick={() => toggleSpecialNeed(need.value)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-5 w-5 rounded border-2 flex items-center justify-center ${
                        state.specialNeeds.includes(need.value)
                          ? 'bg-primary border-primary'
                          : 'border-muted-foreground'
                      }`}
                    >
                      {state.specialNeeds.includes(need.value) && <Check className="h-3 w-3 text-primary-foreground" />}
                    </div>
                    <span>{need.label}</span>
                  </div>
                </Button>
              ))}
            </div>
            <Button className="w-full" size="lg" onClick={handleComplete}>
              결과 보기
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
