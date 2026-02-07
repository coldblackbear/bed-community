"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { SLEEP_POSITIONS, BODY_WEIGHTS, type SleepPosition, type BodyWeight, type MattressType } from "@/types"
import { ArrowLeft, Check, RotateCcw, Moon, Sparkles, Shield, Wind } from "lucide-react"
import Link from "next/link"

type Firmness = 'soft' | 'medium' | 'hard'
type Budget = 'under50' | '50to100' | '100to200' | 'over200'

interface QuizState {
  sleepPosition: SleepPosition | null
  bodyWeight: BodyWeight | null
  firmness: Firmness | null
  budget: Budget | null
  specialNeeds: string[]
}

interface SleepProfile {
  title: string
  emoji: string
  type: string
  description: string
  mattressTypes: { type: MattressType; label: string }[]
  firmnessRange: { min: number; max: number }
  traits: string[]
  advice: string
  budgetTip: string
  specialTips: string[]
}

const FIRMNESS_OPTIONS = [
  { value: 'soft' as const, label: '소프트', description: '구름 위에 눕는 느낌', emoji: '☁️' },
  { value: 'medium' as const, label: '미디엄', description: '적당히 탄탄하게', emoji: '⚖️' },
  { value: 'hard' as const, label: '하드', description: '단단하게 받쳐주는', emoji: '🪨' },
]

const BUDGET_OPTIONS = [
  { value: 'under50' as const, label: '50만원 이하', emoji: '💰' },
  { value: '50to100' as const, label: '50~100만원', emoji: '💳' },
  { value: '100to200' as const, label: '100~200만원', emoji: '💎' },
  { value: 'over200' as const, label: '200만원 이상', emoji: '👑' },
]

const SPECIAL_NEEDS = [
  { value: 'back_pain', label: '허리/목 통증 있음', emoji: '🏥' },
  { value: 'hot_sleeper', label: '더위를 많이 탐', emoji: '🔥' },
  { value: 'allergies', label: '알레르기 있음', emoji: '🤧' },
  { value: 'partner', label: '파트너와 함께 사용', emoji: '👫' },
]

function getSleepProfile(state: QuizState): SleepProfile {
  const { sleepPosition, bodyWeight, firmness, budget, specialNeeds } = state

  // Determine base firmness range
  let fMin = 5, fMax = 7
  let types: { type: MattressType; label: string }[] = [{ type: 'hybrid', label: '하이브리드' }]
  let profileTitle = ''
  let profileEmoji = ''
  let profileType = ''
  let description = ''
  let traits: string[] = []
  let advice = ''

  if (sleepPosition === 'side') {
    if (bodyWeight === 'light') {
      fMin = 3; fMax = 5
      types = [{ type: 'memory_foam', label: '메모리폼' }, { type: 'hybrid', label: '하이브리드' }]
      profileTitle = '구름 위의 새우잠러'
      profileEmoji = '🦐☁️'
      profileType = 'Cloud Shrimp Sleeper'
      description = '새우처럼 옆으로 웅크리고, 구름처럼 폭신한 잠자리를 사랑하는 당신! 부드러운 매트리스가 어깨와 골반을 감싸줘야 꿀잠을 잘 수 있어요.'
      traits = ['압점에 민감한 예민파', '포근한 감싸는 느낌 선호', '가벼운 체중의 축복']
      advice = '메모리폼이 어깨·골반 압점을 부드럽게 감싸줍니다. 너무 단단하면 어깨가 뻐근할 수 있으니 소프트~미디엄 소프트를 추천해요.'
    } else if (bodyWeight === 'average') {
      fMin = 4; fMax = 6
      types = [{ type: 'memory_foam', label: '메모리폼' }, { type: 'hybrid', label: '하이브리드' }]
      profileTitle = '완벽주의 옆잠러'
      profileEmoji = '😴✨'
      profileType = 'Perfect Side Sleeper'
      description = '옆으로 자는 자세의 정석! 척추 정렬이 핵심이에요. 어깨는 살짝 가라앉고, 허리는 받쳐주는 밸런스가 중요합니다.'
      traits = ['척추 정렬의 달인', '어깨 압점 관리 필수', '적절한 탄력감 추구']
      advice = '하이브리드 매트리스가 최적! 위쪽 폼이 어깨를 감싸고, 아래 스프링이 허리를 받쳐줍니다. 미디엄 소프트가 황금 구간이에요.'
    } else {
      fMin = 5; fMax = 7
      types = [{ type: 'hybrid', label: '하이브리드' }]
      profileTitle = '육중한 옆잠 곰'
      profileEmoji = '🐻😴'
      profileType = 'Heavy Side Bear'
      description = '체중이 있으면 매트리스가 많이 눌리기 때문에, 충분한 지지력이 필수! 너무 부드러우면 허리가 처질 수 있어요.'
      traits = ['강한 지지력 필수', '내구성이 생명', '포켓스프링이 친구']
      advice = '하이브리드 매트리스의 포켓스프링이 체중을 분산하면서도 어깨 압점을 관리해줍니다. 미디엄~미디엄 펌 구간을 추천해요.'
    }
  } else if (sleepPosition === 'back') {
    if (bodyWeight === 'light') {
      fMin = 4; fMax = 6
      types = [{ type: 'memory_foam', label: '메모리폼' }, { type: 'latex', label: '라텍스' }]
      profileTitle = '우아한 왕자/공주잠'
      profileEmoji = '👑🛌'
      profileType = 'Royal Back Sleeper'
      description = '가장 이상적인 수면 자세의 소유자! 척추가 자연스러운 S자를 유지하도록 적당한 지지력만 있으면 됩니다.'
      traits = ['이상적 수면 자세', '허리 곡선 유지가 핵심', '대부분의 매트리스와 궁합 좋음']
      advice = '라텍스의 탄력감이 허리를 자연스럽게 받쳐줍니다. 메모리폼도 좋지만, 가벼운 체중이면 너무 깊이 빠지지 않는 라텍스가 더 쾌적해요.'
    } else if (bodyWeight === 'average') {
      fMin = 5; fMax = 7
      types = [{ type: 'hybrid', label: '하이브리드' }, { type: 'latex', label: '라텍스' }]
      profileTitle = '정석파 숙면러'
      profileEmoji = '🧘‍♂️💤'
      profileType = 'Textbook Sleeper'
      description = '교과서적인 수면! 바른 자세에 적당한 체중, 매트리스 선택지가 가장 넓은 축복받은 타입입니다.'
      traits = ['매트리스 선택 폭 넓음', '미디엄 펌이 최적', '대부분 만족도 높음']
      advice = '미디엄 펌(5~7점)이 황금 구간! 하이브리드면 탄력과 지지력을 동시에, 라텍스면 쾌적한 반발력을 느낄 수 있어요.'
    } else {
      fMin = 6; fMax = 8
      types = [{ type: 'innerspring', label: '스프링' }, { type: 'hybrid', label: '하이브리드' }]
      profileTitle = '대지의 수호자'
      profileEmoji = '🏔️😤'
      profileType = 'Earth Guardian Sleeper'
      description = '단단한 지지력 없이는 허리가 처지는 타입! 스프링의 강한 반발력이 필수입니다.'
      traits = ['단단한 지지력 필수', '매트리스 수명에 민감', '쿨링 기능 보너스']
      advice = '포켓스프링 기반 하이브리드가 최고! 코일 수가 많을수록 체중 분산이 좋아요. 펌~하드(6~8점) 구간이 적합합니다.'
    }
  } else if (sleepPosition === 'stomach') {
    if (bodyWeight === 'light') {
      fMin = 5; fMax = 7
      types = [{ type: 'hybrid', label: '하이브리드' }, { type: 'latex', label: '라텍스' }]
    } else {
      fMin = 7; fMax = 9
      types = [{ type: 'innerspring', label: '스프링' }, { type: 'hybrid', label: '하이브리드' }]
    }
    profileTitle = '엎드림 스나이퍼'
    profileEmoji = '🤿💥'
    profileType = 'Prone Position Sniper'
    description = '엎드려 자는 건 사실 척추에 가장 위험한 자세! 허리가 과도하게 꺾이지 않도록 단단한 매트리스가 생명입니다.'
    traits = ['척추 과신전 주의', '단단할수록 안전', '얇은 베개 또는 노베개 추천']
    advice = '엎드려 잘 때는 매트리스가 단단해야 배가 눌리면서 허리가 꺾이는 걸 방지해요. 베개도 얇게! 가능하면 옆으로 자는 습관을 들여보세요.'
  } else {
    fMin = 5; fMax = 7
    types = [{ type: 'hybrid', label: '하이브리드' }]
    profileTitle = '360도 회전 잠꾸러기'
    profileEmoji = '🔄🌀'
    profileType = 'Tornado Sleeper'
    description = '잠들 때와 깰 때의 위치가 완전 다른 당신! 어떤 자세에서도 편안한 만능 매트리스가 필요해요.'
    traits = ['자세 변경이 잦음', '소음/진동 민감', '반발력 중요 (자세 전환 용이)']
    advice = '하이브리드가 정답! 스프링의 반발력 덕에 뒤척일 때 에너지를 덜 쓰고, 위쪽 폼이 각 자세에 맞게 적응해요. 미디엄이 가장 범용적이에요.'
  }

  // Firmness preference adjustment
  if (firmness === 'soft') {
    fMin = Math.max(1, fMin - 1)
    fMax = Math.max(fMin + 1, fMax - 1)
  } else if (firmness === 'hard') {
    fMin = Math.min(9, fMin + 1)
    fMax = Math.min(10, fMax + 1)
  }

  // Budget tip
  let budgetTip = ''
  if (budget === 'under50') {
    budgetTip = '50만원 이하에서도 좋은 매트리스가 있어요! 국내 브랜드의 하이브리드나 고밀도 폼 매트리스를 살펴보세요. 체험 기간이 있는 제품을 선택하면 안심이에요.'
  } else if (budget === '50to100') {
    budgetTip = '가성비 최강 구간! 이 예산이면 대부분의 추천 타입을 선택할 수 있어요. 시몬스/에이스 중급라인, 직수입 브랜드 등 선택지가 다양합니다.'
  } else if (budget === '100to200') {
    budgetTip = '프리미엄 구간에서는 소재 품질과 내구성이 확실히 달라져요. 텐바이텐, 씰리, 시몬스 상위 라인을 추천합니다.'
  } else {
    budgetTip = '최고급 매트리스의 세계에 오신 걸 환영합니다! 해스텐스, 템퍼 프리미엄 라인 등 10년 이상 사용할 투자형 제품을 고려해보세요.'
  }

  // Special needs tips
  const specialTips: string[] = []
  if (specialNeeds.includes('back_pain')) {
    specialTips.push('🏥 허리 통증이 있다면 미디엄 펌(5~7점)이 대부분의 연구에서 가장 효과적이었어요. 너무 부드럽거나 단단하면 오히려 악화될 수 있습니다. 전문의 상담을 병행하세요!')
  }
  if (specialNeeds.includes('hot_sleeper')) {
    specialTips.push('🔥 더위를 탄다면 메모리폼보다는 라텍스나 스프링 코어 매트리스가 통기성이 좋아요. 쿨링 젤 폼이나 코퍼 인퓨즈드 폼도 도움이 됩니다.')
  }
  if (specialNeeds.includes('allergies')) {
    specialTips.push('🤧 알레르기가 있다면 라텍스(천연)가 항균·방진드기 효과가 있어요. 항균 커버가 포함된 제품을 선택하고, 매트리스 커버를 정기적으로 세탁하세요.')
  }
  if (specialNeeds.includes('partner')) {
    specialTips.push('👫 2인 사용 시 진동 차단이 중요! 메모리폼이나 포켓스프링(코일 수 1000개 이상)이 파트너의 뒤척임을 차단해줍니다. 킹사이즈 이상을 추천해요.')
  }

  return {
    title: profileTitle,
    emoji: profileEmoji,
    type: profileType,
    description,
    mattressTypes: types,
    firmnessRange: { min: fMin, max: fMax },
    traits,
    advice,
    budgetTip,
    specialTips,
  }
}

export default function QuizPage() {
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

  const handleSelect = (key: keyof QuizState, value: any) => {
    setState({ ...state, [key]: value })
    if (step < totalSteps) setStep(step + 1)
  }

  const toggleSpecialNeed = (value: string) => {
    setState({
      ...state,
      specialNeeds: state.specialNeeds.includes(value)
        ? state.specialNeeds.filter((n) => n !== value)
        : [...state.specialNeeds, value],
    })
  }

  const handleBack = () => {
    if (showResult) { setShowResult(false); return }
    if (step > 1) setStep(step - 1)
  }

  const handleReset = () => {
    setState({ sleepPosition: null, bodyWeight: null, firmness: null, budget: null, specialNeeds: [] })
    setStep(1)
    setShowResult(false)
  }

  // Result page
  if (showResult) {
    const profile = getSleepProfile(state)
    const firmnessPercent = ((profile.firmnessRange.min + profile.firmnessRange.max) / 2) * 10

    return (
      <div className="container max-w-2xl py-8 px-4">
        <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          뒤로
        </Button>

        <div className="space-y-6">
          {/* Profile header */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="pt-8 pb-6 text-center">
              <div className="text-5xl mb-4">{profile.emoji}</div>
              <p className="text-sm text-muted-foreground mb-1">{profile.type}</p>
              <h1 className="text-3xl font-bold mb-3">{profile.title}</h1>
              <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
                {profile.description}
              </p>
            </CardContent>
          </Card>

          {/* Traits */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                당신의 수면 특성
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {profile.traits.map((trait, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 shrink-0" />
                    <span>{trait}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendation */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Moon className="h-5 w-5 text-blue-500" />
                매트리스 추천
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div>
                <p className="text-sm text-muted-foreground mb-2">추천 타입</p>
                <div className="flex gap-2">
                  {profile.mattressTypes.map((mt) => (
                    <span
                      key={mt.type}
                      className="px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm"
                    >
                      {mt.label}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-muted-foreground">추천 단단함</p>
                  <span className="text-sm font-bold text-primary">
                    {profile.firmnessRange.min}~{profile.firmnessRange.max}점 / 10
                  </span>
                </div>
                <div className="relative h-6 bg-gradient-to-r from-blue-200 via-green-200 to-orange-200 dark:from-blue-900 dark:via-green-900 dark:to-orange-900 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 h-full bg-primary/30 border-x-2 border-primary rounded-sm"
                    style={{
                      left: `${profile.firmnessRange.min * 10}%`,
                      width: `${(profile.firmnessRange.max - profile.firmnessRange.min) * 10}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1 px-1">
                  <span>소프트</span>
                  <span>미디엄</span>
                  <span>하드</span>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm leading-relaxed">{profile.advice}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Budget tip */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Wind className="h-5 w-5 text-green-500" />
                예산 가이드
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{profile.budgetTip}</p>
            </CardContent>
          </Card>

          {/* Special tips */}
          {profile.specialTips.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">참고사항</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {profile.specialTips.map((tip, i) => (
                  <p key={i} className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            <Button className="flex-1" size="lg" asChild>
              <Link href="/posts">
                커뮤니티에서 추천 받기
              </Link>
            </Button>
            <Button variant="outline" size="lg" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              다시 하기
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Quiz steps
  return (
    <div className="container max-w-2xl py-8 px-4">
      {step > 1 && (
        <Button variant="ghost" size="sm" onClick={handleBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          이전
        </Button>
      )}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{step} / {totalSteps}</span>
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">주로 어떤 자세로 주무시나요?</CardTitle>
            <CardDescription>가장 많이 취하는 수면 자세를 선택해주세요</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {SLEEP_POSITIONS.map((pos) => {
              const emojis: Record<SleepPosition, string> = { back: '🛌', side: '😴', stomach: '🤿', combination: '🔄' }
              return (
                <Button
                  key={pos.value}
                  variant="outline"
                  className="h-auto py-5 justify-start text-left gap-4"
                  onClick={() => handleSelect('sleepPosition', pos.value)}
                >
                  <span className="text-2xl">{emojis[pos.value]}</span>
                  <span className="text-lg">{pos.label}</span>
                </Button>
              )
            })}
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">체중대를 알려주세요</CardTitle>
            <CardDescription>매트리스 지지력 결정에 중요한 요소입니다</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {BODY_WEIGHTS.map((w) => {
              const emojis: Record<BodyWeight, string> = { light: '🪶', average: '🧍', heavy: '🏋️' }
              return (
                <Button
                  key={w.value}
                  variant="outline"
                  className="h-auto py-5 justify-start text-left gap-4"
                  onClick={() => handleSelect('bodyWeight', w.value)}
                >
                  <span className="text-2xl">{emojis[w.value]}</span>
                  <div>
                    <span className="text-lg font-semibold">{w.label}</span>
                    <span className="text-sm text-muted-foreground ml-2">{w.range}</span>
                  </div>
                </Button>
              )
            })}
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">어떤 느낌을 선호하세요?</CardTitle>
            <CardDescription>매트리스에 누웠을 때 원하는 느낌을 골라주세요</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {FIRMNESS_OPTIONS.map((opt) => (
              <Button
                key={opt.value}
                variant="outline"
                className="h-auto py-5 justify-start text-left gap-4"
                onClick={() => handleSelect('firmness', opt.value)}
              >
                <span className="text-2xl">{opt.emoji}</span>
                <div>
                  <span className="text-lg font-semibold">{opt.label}</span>
                  <span className="text-sm text-muted-foreground ml-2">{opt.description}</span>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">예산 범위를 알려주세요</CardTitle>
            <CardDescription>퀸 사이즈 기준 구매 가능 예산을 선택해주세요</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {BUDGET_OPTIONS.map((opt) => (
              <Button
                key={opt.value}
                variant="outline"
                className="h-auto py-5 justify-start text-left gap-4"
                onClick={() => handleSelect('budget', opt.value)}
              >
                <span className="text-2xl">{opt.emoji}</span>
                <span className="text-lg">{opt.label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}

      {step === 5 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">해당되는 항목을 모두 선택하세요</CardTitle>
            <CardDescription>특별히 고려할 사항이 있다면 알려주세요 (선택사항)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3">
              {SPECIAL_NEEDS.map((need) => (
                <Button
                  key={need.value}
                  variant={state.specialNeeds.includes(need.value) ? 'default' : 'outline'}
                  className="h-auto py-4 justify-start text-left gap-3"
                  onClick={() => toggleSpecialNeed(need.value)}
                >
                  <span className="text-xl">{need.emoji}</span>
                  <span>{need.label}</span>
                  {state.specialNeeds.includes(need.value) && (
                    <Check className="h-4 w-4 ml-auto" />
                  )}
                </Button>
              ))}
            </div>
            <Button className="w-full" size="lg" onClick={() => setShowResult(true)}>
              결과 보기 ✨
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
