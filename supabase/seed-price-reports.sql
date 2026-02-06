-- 실거래가 제보 시드 데이터 (10개)
-- 실제 한국 매트리스 시장 구매 가격 기반

INSERT INTO price_reports (product_id, reporter_id, purchase_price, purchase_date, purchase_location, is_online, discount_info, created_at) VALUES
-- 1. 시몬스 뷰티레스트 블랙
((SELECT id FROM mattress_products WHERE name LIKE '%뷰티레스트 블랙%' LIMIT 1),
(SELECT id FROM profiles LIMIT 1),
2800000,
'2026-01-18',
'시몬스 직영점 논현 전시장',
false,
'설날 특가 (-300만원) + 다른 매장 가격 맞춤 (-200만원) + 현금 할인 (-200만원). 사은품: 템퍼 베개 2개, 방수 커버',
NOW() - INTERVAL '20 days'),

-- 2. 시몬스 뷰티레스트 블랙 (온라인)
((SELECT id FROM mattress_products WHERE name LIKE '%뷰티레스트 블랙%' LIMIT 1),
(SELECT id FROM profiles LIMIT 1),
3200000,
'2026-01-05',
'시몬스 공식몰',
true,
'신년 특가 행사 (-300만원). 사은품: 베개 2개, 무료 배송',
NOW() - INTERVAL '33 days'),

-- 3. 에이스 BMA 1132-T
((SELECT id FROM mattress_products WHERE name LIKE '%BMA 1132-T%' LIMIT 1),
(SELECT id FROM profiles LIMIT 1),
3400000,
'2026-01-22',
'에이스침대 직영점 강남점',
false,
'설 명절 프로모션 (-600만원) + 부모님 선물 추가 할인 (-200만원). 사은품: 베개 2개, 토퍼 (30만원 상당)',
NOW() - INTERVAL '16 days'),

-- 4. 에이스 마스터 프리미엄
((SELECT id FROM mattress_products WHERE name LIKE '%마스터 프리미엄%' LIMIT 1),
(SELECT id FROM profiles LIMIT 1),
2650000,
'2025-12-28',
'에이스침대 잠실점',
false,
'연말 재고 정리 (-550만원). 구형 모델 할인',
NOW() - INTERVAL '41 days'),

-- 5. 템퍼 오리지널 럭스
((SELECT id FROM mattress_products WHERE name LIKE '%오리지널 럭스%' LIMIT 1),
(SELECT id FROM profiles LIMIT 1),
4900000,
'2025-11-28',
'템퍼 공식몰',
true,
'블랙프라이데이 특가 (-900만원) + 쿠폰 중복 사용. 무료 배송',
NOW() - INTERVAL '71 days'),

-- 6. 지누스 클라우드 메모리폼
((SELECT id FROM mattress_products WHERE name LIKE '%클라우드 메모리폼%' LIMIT 1),
(SELECT id FROM profiles LIMIT 1),
420000,
'2026-01-12',
'쿠팡 (로켓배송)',
true,
'로켓와우 쿠폰 (-30,000원). 다음날 도착',
NOW() - INTERVAL '26 days'),

-- 7. 지누스 그린티 하이브리드
((SELECT id FROM mattress_products WHERE name LIKE '%그린티 하이브리드%' LIMIT 1),
(SELECT id FROM profiles LIMIT 1),
650000,
'2025-12-20',
'지누스 공식몰',
true,
'연말 세일 (-30,000원). 100일 무료 체험',
NOW() - INTERVAL '49 days'),

-- 8. 삼분의일 미드나잇 시그니처
((SELECT id FROM mattress_products WHERE name LIKE '%미드나잇 시그니처%' LIMIT 1),
(SELECT id FROM profiles LIMIT 1),
980000,
'2026-01-15',
'삼분의일 공식몰',
true,
'정가 판매 (할인 없음). 120일 체험 기간',
NOW() - INTERVAL '23 days'),

-- 9. 씰리 포스처피딕 플러스
((SELECT id FROM mattress_products WHERE name LIKE '%포스처피딕 플러스%' LIMIT 1),
(SELECT id FROM profiles LIMIT 1),
2100000,
'2025-11-22',
'씰리 직영점 분당점',
false,
'블랙프라이데이 사전 행사 (-400만원). 사은품: 베개 2개',
NOW() - INTERVAL '77 days'),

-- 10. 이케아 호발그
((SELECT id FROM mattress_products WHERE name LIKE '%호발그%' LIMIT 1),
(SELECT id FROM profiles LIMIT 1),
399000,
'2026-01-25',
'이케아 광명점',
false,
'정가 판매 (할인 없음). 365일 반품 가능, 25년 품질 보증',
NOW() - INTERVAL '13 days');
