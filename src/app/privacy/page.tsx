import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "개인정보처리방침 - 침대 커뮤니티",
}

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">개인정보처리방침</h1>
        <p className="text-sm text-muted-foreground">
          최종 수정일: 2026년 2월 6일
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <section className="mb-8">
          <p className="leading-relaxed mb-4">
            침대 커뮤니티(이하 "서비스")는 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제1조 (개인정보의 처리 목적)</h2>
          <p className="mb-4 leading-relaxed">
            서비스는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>회원 가입 및 관리: 회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지</li>
            <li>서비스 제공: 커뮤니티 게시판 서비스 제공, 콘텐츠 제공, 본인인증</li>
            <li>서비스 개선: 서비스 이용 통계 분석, 신규 서비스 개발 및 기존 서비스 개선</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제2조 (수집하는 개인정보의 항목)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">1. 필수항목</h3>
              <p className="leading-relaxed">
                서비스는 Google OAuth 2.0을 통한 소셜 로그인을 지원하며, 다음의 정보를 수집합니다:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Google 계정 정보: 이메일 주소, 프로필 사진</li>
                <li>회원이 입력한 정보: 닉네임</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">2. 자동 수집 정보</h3>
              <p className="leading-relaxed">
                서비스 이용과정에서 다음의 정보가 자동으로 생성되어 수집될 수 있습니다:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>접속 로그, 쿠키, 접속 IP 정보</li>
                <li>서비스 이용 기록, 방문 일시</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제3조 (개인정보의 처리 및 보유기간)</h2>
          <p className="mb-4 leading-relaxed">
            서비스는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>회원 가입 및 관리: 회원 탈퇴 시까지. 다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지 보유합니다.
              <ul className="list-circle pl-6 mt-2 space-y-1">
                <li>관계 법령 위반에 따른 수사·조사 등이 진행중인 경우: 해당 수사·조사 종료 시까지</li>
                <li>서비스 이용에 따른 채권·채무관계 잔존 시: 해당 채권·채무관계 정산 시까지</li>
              </ul>
            </li>
            <li>서비스 제공: 서비스 제공기간 종료 시까지</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제4조 (개인정보의 제3자 제공)</h2>
          <p className="mb-4 leading-relaxed">
            서비스는 원칙적으로 이용자의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
          </p>
          <p className="leading-relaxed">
            현재 서비스는 제3자에게 개인정보를 제공하지 않습니다. 단, 서비스 제공을 위해 Google OAuth 2.0을 통해 Google로부터 사용자의 기본 프로필 정보(이메일, 프로필 사진)를 제공받습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제5조 (개인정보처리의 위탁)</h2>
          <p className="mb-4 leading-relaxed">
            서비스는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:
          </p>
          <div className="border rounded-lg p-4 mb-4">
            <ul className="space-y-2">
              <li><strong>위탁받는 자:</strong> Supabase Inc.</li>
              <li><strong>위탁하는 업무의 내용:</strong> 회원 데이터베이스 관리 및 저장</li>
            </ul>
          </div>
          <p className="leading-relaxed">
            서비스는 위탁계약 체결 시 「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제6조 (정보주체의 권리·의무 및 행사방법)</h2>
          <p className="mb-4 leading-relaxed">
            정보주체는 서비스에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>개인정보 열람 요구</li>
            <li>오류 등이 있을 경우 정정 요구</li>
            <li>삭제 요구</li>
            <li>처리정지 요구</li>
          </ul>
          <p className="leading-relaxed">
            위 권리 행사는 서비스에 대해 서면, 전화, 전자우편 등을 통하여 하실 수 있으며, 서비스는 이에 대해 지체 없이 조치하겠습니다. 정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 서비스는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제7조 (개인정보의 파기)</h2>
          <p className="mb-4 leading-relaxed">
            서비스는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">파기절차</h3>
              <p className="leading-relaxed">
                이용자가 입력한 정보는 목적 달성 후 별도의 DB에 옮겨져(종이의 경우 별도의 서류) 내부 방침 및 기타 관련 법령에 따라 일정기간 저장된 후 혹은 즉시 파기됩니다.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">파기방법</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.</li>
                <li>종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제8조 (쿠키의 운용)</h2>
          <p className="mb-4 leading-relaxed">
            서비스는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">쿠키의 사용 목적</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>회원 로그인 상태 유지</li>
                <li>서비스 이용 형태 분석</li>
                <li>이용자의 관심 분야에 따른 차별화된 정보 제공</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">쿠키의 설치·운영 및 거부</h3>
              <p className="leading-relaxed">
                이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 웹브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다. 다만, 쿠키 설치를 거부할 경우 서비스 이용에 어려움이 있을 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제9조 (개인정보 보호책임자)</h2>
          <p className="mb-4 leading-relaxed">
            서비스는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <div className="border rounded-lg p-4 mb-4">
            <ul className="space-y-2">
              <li><strong>개인정보 보호책임자</strong></li>
              <li>서비스명: 침대 커뮤니티</li>
              <li>문의: 서비스 내 문의하기 기능 이용</li>
            </ul>
          </div>
          <p className="leading-relaxed">
            정보주체는 서비스의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자에게 문의하실 수 있습니다. 서비스는 정보주체의 문의에 대해 지체 없이 답변 및 처리해드릴 것입니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제10조 (개인정보 처리방침 변경)</h2>
          <p className="leading-relaxed">
            이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">부칙</h2>
          <p className="leading-relaxed">
            본 방침은 2026년 2월 6일부터 시행됩니다.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-6 border-t">
        <Link href="/">
          <Button variant="outline">홈으로 돌아가기</Button>
        </Link>
      </div>
    </div>
  )
}
