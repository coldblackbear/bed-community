import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "이용약관 - 침대 커뮤니티",
}

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">이용약관</h1>
        <p className="text-sm text-muted-foreground">
          최종 수정일: 2026년 2월 6일
        </p>
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제1조 (목적)</h2>
          <p className="mb-4 leading-relaxed">
            본 약관은 침대 커뮤니티(이하 "서비스")가 제공하는 온라인 커뮤니티 서비스의 이용과 관련하여 서비스와 이용자의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제2조 (정의)</h2>
          <p className="mb-4 leading-relaxed">
            본 약관에서 사용하는 용어의 정의는 다음과 같습니다:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>"서비스"라 함은 침대, 매트리스, 침구류 등에 관한 정보를 공유하고 소통하는 온라인 커뮤니티 플랫폼을 의미합니다.</li>
            <li>"회원"이라 함은 본 약관에 동의하고 서비스에 가입하여 서비스를 이용하는 자를 의미합니다.</li>
            <li>"게시물"이라 함은 회원이 서비스에 게시한 문자, 이미지, 링크 등 모든 형태의 콘텐츠를 의미합니다.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제3조 (약관의 효력 및 변경)</h2>
          <p className="mb-4 leading-relaxed">
            본 약관은 서비스 화면에 게시하거나 기타의 방법으로 회원에게 공지함으로써 효력이 발생합니다. 서비스는 합리적인 사유가 발생할 경우 본 약관을 변경할 수 있으며, 약관이 변경되는 경우 적용일자 및 변경사유를 명시하여 최소 7일 전에 공지합니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제4조 (회원가입 및 탈퇴)</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">1. 회원가입</h3>
              <p className="leading-relaxed">
                서비스 이용을 희망하는 자는 서비스가 정한 가입 양식에 따라 회원정보를 기입한 후 본 약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">2. 회원탈퇴</h3>
              <p className="leading-relaxed">
                회원은 언제든지 서비스를 통해 이용계약 해지 신청을 할 수 있으며, 서비스는 관련법 등이 정하는 바에 따라 이를 즉시 처리합니다. 회원 탈퇴 시 작성한 게시물은 삭제되지 않으며, 닉네임은 "탈퇴한 회원"으로 표시됩니다.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제5조 (게시물의 관리)</h2>
          <div className="space-y-4">
            <p className="leading-relaxed">
              회원이 작성한 게시물에 대한 권리와 책임은 게시자에게 있습니다. 단, 서비스는 다음 각 호에 해당하는 게시물을 사전 통지 없이 삭제하거나 이동 또는 등록을 거부할 수 있습니다:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>다른 회원 또는 제3자를 비방하거나 명예를 손상시키는 내용</li>
              <li>공공질서 및 미풍양속에 위반되는 내용</li>
              <li>범죄적 행위에 결부된다고 인정되는 내용</li>
              <li>타인의 저작권 등 기타 권리를 침해하는 내용</li>
              <li>서비스에서 규정한 게시기간을 초과한 내용</li>
              <li>정치적 목적이나 상업적 광고 내용</li>
              <li>기타 관계 법령에 위배된다고 판단되는 경우</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제6조 (금지행위)</h2>
          <p className="mb-4 leading-relaxed">
            회원은 다음 각 호에 해당하는 행위를 해서는 안 됩니다:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>회원가입 신청 또는 변경 시 허위내용을 등록하는 행위</li>
            <li>타인의 정보를 도용하는 행위</li>
            <li>서비스의 운영을 고의로 방해하는 행위</li>
            <li>음란물을 게재하거나 음란사이트를 연결(링크)하는 행위</li>
            <li>서비스의 공식적인 허용 이외의 방법으로 서비스에 접근하는 행위</li>
            <li>기타 불법적이거나 부당한 행위</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제7조 (저작권의 귀속 및 이용제한)</h2>
          <div className="space-y-4">
            <p className="leading-relaxed">
              서비스가 작성한 저작물에 대한 저작권 기타 지적재산권은 서비스에 귀속합니다. 회원이 서비스 내에 게시한 게시물의 저작권은 게시한 회원에게 귀속됩니다. 단, 서비스는 서비스의 운영, 전시, 전송, 배포, 홍보 등의 목적으로 회원의 별도 허락 없이 무상으로 게시물을 사용할 수 있습니다.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제8조 (면책조항)</h2>
          <div className="space-y-4">
            <p className="leading-relaxed">
              서비스는 다음 각 호의 경우로 서비스를 제공할 수 없는 경우 이로 인하여 회원에게 발생한 손해에 대해서는 책임을 지지 않습니다:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>천재지변 또는 이에 준하는 불가항력의 상태가 있는 경우</li>
              <li>서비스를 위하여 서비스가 제휴 계약을 체결한 제3자의 고의적인 서비스 방해가 있는 경우</li>
              <li>회원의 귀책사유로 서비스 이용에 장애가 있는 경우</li>
            </ul>
            <p className="leading-relaxed">
              서비스는 회원이 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않으며, 회원 상호간 및 회원과 제3자 상호간에 서비스를 매개로 발생한 분쟁에 대해서는 개입할 의무가 없고 이로 인한 손해를 배상할 책임도 없습니다.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">제9조 (분쟁해결)</h2>
          <p className="leading-relaxed">
            서비스와 회원 간에 발생한 분쟁에 관한 소송은 민사소송법상의 관할법원에 제소합니다.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">부칙</h2>
          <p className="leading-relaxed">
            본 약관은 2026년 2월 6일부터 적용됩니다.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-6 border-t">
        <Button variant="outline" asChild>
          <Link href="/">홈으로 돌아가기</Link>
        </Button>
      </div>
    </div>
  )
}
