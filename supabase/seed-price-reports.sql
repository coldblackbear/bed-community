-- 실거래가 제보 시드 데이터 (10개)
-- 다양한 제품에 대한 실제 구매 후기

INSERT INTO price_reports (product_id, reporter_id, purchase_price, purchase_date, purchase_location, is_online, discount_info) VALUES
-- 시몬스 뷰티레스트 블랙
((SELECT id FROM mattress_products WHERE name = '뷰티레스트 블랙' LIMIT 1), NULL, 2650000, '2025-01-15', '시몬스 직영점 강남', false, '설날 특가 이벤트 + 현금 할인 (-850,000원)'),

-- 시몬스 딥슬립 3
((SELECT id FROM mattress_products WHERE name = '딥슬립 3' LIMIT 1), NULL, 1750000, '2024-12-28', '시몬스 팩토리 아울렛', false, '연말 재고 정리 (-450,000원)'),

-- 에이스침대 BMA 1132-T
((SELECT id FROM mattress_products WHERE name = 'BMA 1132-T' LIMIT 1), NULL, 3400000, '2025-01-20', '에이스침대 직영점 잠실', false, '설 명절 프로모션 + 부모님 선물 할인 (-800,000원)'),

-- 템퍼 오리지널 럭스
((SELECT id FROM mattress_products WHERE name = '오리지널 럭스' LIMIT 1), NULL, 4900000, '2024-11-25', '템퍼 공식몰', true, '블랙프라이데이 특가 (-900,000원)'),

-- 지누스 클라우드 메모리폼
((SELECT id FROM mattress_products WHERE name = '클라우드 메모리폼' LIMIT 1), NULL, 420000, '2025-01-05', '쿠팡', true, '쿠팡 로켓배송 쿠폰 (-30,000원)'),

-- 지누스 그린티 하이브리드
((SELECT id FROM mattress_products WHERE name = '그린티 하이브리드' LIMIT 1), NULL, 580000, '2024-12-15', '지누스 공식몰', true, '연말 세일 + 첫 구매 할인 (-70,000원)'),

-- 삼분의일 미드나잇 시그니처
((SELECT id FROM mattress_products WHERE name = '미드나잇 시그니처' LIMIT 1), NULL, 980000, '2025-01-10', '삼분의일 공식몰', true, '정가 판매 (할인 없음)'),

-- 씰리 포스처피딕 플러스
((SELECT id FROM mattress_products WHERE name = '포스처피딕 플러스' LIMIT 1), NULL, 2050000, '2024-11-20', '씰리 직영점 분당', false, '블랙프라이데이 사전 할인 (-450,000원)'),

-- 이케아 호발그
((SELECT id FROM mattress_products WHERE name = '호발그' LIMIT 1), NULL, 399000, '2025-01-08', '이케아 광명점', false, '정가 판매 (할인 없음)'),

-- 코웨이 렌탈 매트리스 프리미엄
((SELECT id FROM mattress_products WHERE name = '렌탈 매트리스 프리미엄' LIMIT 1), NULL, 1650000, '2024-12-01', '코웨이 방문 상담', false, '렌탈 전환 시 추가 할인 (월 52,000원 x 36개월, 등록비 면제)');
