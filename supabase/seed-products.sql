-- 매트리스 제품 시드 데이터 (20개)
-- 브랜드별 대표 제품 2-3개씩

-- 시몬스 (3개)
INSERT INTO mattress_products (brand_id, name, mattress_type, firmness, height_cm, price_msrp, price_street, coil_count, foam_density, cover_material, warranty_years, trial_days, sizes_available, best_for_positions, best_for_weights, pros, cons, rating_avg, review_count) VALUES
((SELECT id FROM brands WHERE name = 'Simmons'), '뷰티레스트 블랙', 'innerspring', 7, 33.0, 3500000, 2800000, 1000, NULL, '텐셀', 10, 100, ARRAY['queen','king'], ARRAY['back','side'], ARRAY['average','heavy'], ARRAY['탁월한 허리 지지력','흔들림 차단 우수','고급스러운 마감'], ARRAY['무거움 (배송 설치 필수)','가격대 높음'], 4.5, 128),
((SELECT id FROM brands WHERE name = 'Simmons'), '딥슬립 3', 'innerspring', 5, 28.0, 2200000, 1850000, 800, NULL, '면 혼방', 10, 100, ARRAY['queen','king','single'], ARRAY['side','back'], ARRAY['light','average'], ARRAY['중저가 시몬스 라인','쿠셔닝 부드러움','브랜드 신뢰도'], ARRAY['장기 사용 시 처짐','가격 대비 평범'], 4.1, 92),
((SELECT id FROM brands WHERE name = 'Simmons'), '포켓스프링 컬렉션', 'innerspring', 6, 30.0, 2800000, 2350000, 950, NULL, '폴리에스터', 10, 100, ARRAY['queen','king'], ARRAY['back','side'], ARRAY['average','heavy'], ARRAY['독립 포켓 스프링','움직임 전달 적음','고급 원단'], ARRAY['단단한 편','초기 냄새'], 4.3, 75);

-- 에이스침대 (2개)
INSERT INTO mattress_products (brand_id, name, mattress_type, firmness, height_cm, price_msrp, price_street, coil_count, foam_density, cover_material, warranty_years, trial_days, sizes_available, best_for_positions, best_for_weights, pros, cons, rating_avg, review_count) VALUES
((SELECT id FROM brands WHERE name = 'ACE Bed'), 'BMA 1132-T', 'innerspring', 8, 32.0, 4200000, 3500000, 1200, NULL, '실크 혼방', 15, 100, ARRAY['queen','king'], ARRAY['back','stomach'], ARRAY['average','heavy'], ARRAY['국내 최고급 스프링','단단한 지지력','AS 편리'], ARRAY['매우 비쌈','부드러움 부족'], 4.6, 156),
((SELECT id FROM brands WHERE name = 'ACE Bed'), '마스터 프리미엄', 'innerspring', 7, 30.0, 3200000, 2700000, 1000, NULL, '면 100%', 15, 100, ARRAY['queen','king','single'], ARRAY['back','side'], ARRAY['average','heavy'], ARRAY['균형 잡힌 편안함','내구성 우수','브랜드 인지도'], ARRAY['가격 부담','무거움'], 4.4, 103);

-- 씰리 (2개)
INSERT INTO mattress_products (brand_id, name, mattress_type, firmness, height_cm, price_msrp, price_street, coil_count, foam_density, cover_material, warranty_years, trial_days, sizes_available, best_for_positions, best_for_weights, pros, cons, rating_avg, review_count) VALUES
((SELECT id FROM brands WHERE name = 'Sealy'), '포스처피딕 플러스', 'innerspring', 6, 29.0, 2500000, 2100000, 900, NULL, '쿨텍스', 10, 100, ARRAY['queen','king'], ARRAY['back','side'], ARRAY['average','heavy'], ARRAY['포스처피딕 기술','허리 중심 지지','통기성 좋음'], ARRAY['가격대 다소 높음','초기 적응 필요'], 4.3, 88),
((SELECT id FROM brands WHERE name = 'Sealy'), '하이브리드 에센스', 'hybrid', 5, 31.0, 3000000, 2550000, 800, '60D', '면 혼방', 10, 100, ARRAY['queen','king'], ARRAY['side','back'], ARRAY['light','average'], ARRAY['스프링+메모리폼','균형 잡힌 쿠셔닝','압력 분산 우수'], ARRAY['무거움','가격 부담'], 4.4, 67);

-- 템퍼 (2개)
INSERT INTO mattress_products (brand_id, name, mattress_type, firmness, height_cm, price_msrp, price_street, coil_count, foam_density, cover_material, warranty_years, trial_days, sizes_available, best_for_positions, best_for_weights, pros, cons, rating_avg, review_count) VALUES
((SELECT id FROM brands WHERE name = 'Tempur'), '오리지널 럭스', 'memory_foam', 8, 30.0, 5800000, 4900000, NULL, '85D', '쿨투더터치', 10, 100, ARRAY['queen','king'], ARRAY['back','side'], ARRAY['average','heavy'], ARRAY['NASA 기술 메모리폼','압력 분산 최고','움직임 전달 제로'], ARRAY['매우 비쌈','무거움','온도 민감'], 4.7, 203),
((SELECT id FROM brands WHERE name = 'Tempur'), '클라우드 프리마', 'memory_foam', 5, 27.0, 4200000, 3600000, NULL, '70D', '쿨투더터치', 10, 100, ARRAY['queen','king'], ARRAY['side','back'], ARRAY['light','average'], ARRAY['부드러운 감촉','압력 분산','조용함'], ARRAY['가격 부담','온열감','무거움'], 4.5, 134);

-- 지누스 (2개)
INSERT INTO mattress_products (brand_id, name, mattress_type, firmness, height_cm, price_msrp, price_street, coil_count, foam_density, cover_material, warranty_years, trial_days, sizes_available, best_for_positions, best_for_weights, pros, cons, rating_avg, review_count) VALUES
((SELECT id FROM brands WHERE name = 'Zinus'), '클라우드 메모리폼', 'memory_foam', 5, 25.0, 450000, 420000, NULL, '50D', '자카드 니트', 10, 100, ARRAY['queen','king','single'], ARRAY['side','back'], ARRAY['light','average'], ARRAY['가성비 최고','압축 배송','냄새 빠름'], ARRAY['내구성 약함','포장 냄새'], 4.2, 412),
((SELECT id FROM brands WHERE name = 'Zinus'), '그린티 하이브리드', 'hybrid', 6, 28.0, 680000, 650000, 600, '55D', '자카드 니트', 10, 100, ARRAY['queen','king','single'], ARRAY['back','side'], ARRAY['average'], ARRAY['스프링+메모리폼','저렴한 가격','압축 배송'], ARRAY['단순한 구조','가장자리 약함'], 4.0, 287);

-- 삼분의일 (2개)
INSERT INTO mattress_products (brand_id, name, mattress_type, firmness, height_cm, price_msrp, price_street, coil_count, foam_density, cover_material, warranty_years, trial_days, sizes_available, best_for_positions, best_for_weights, pros, cons, rating_avg, review_count) VALUES
((SELECT id FROM brands WHERE name = '1/3'), '미드나잇 시그니처', 'hybrid', 6, 29.0, 980000, 980000, 700, '60D', '3D 에어 메쉬', 10, 120, ARRAY['queen','king','single'], ARRAY['back','side'], ARRAY['average'], ARRAY['가성비 우수','120일 체험','압축 배송'], ARRAY['브랜드 인지도 낮음','매장 체험 불가'], 4.4, 341),
((SELECT id FROM brands WHERE name = '1/3'), '오로라 프리미엄', 'hybrid', 7, 31.0, 1280000, 1280000, 850, '65D', '텐셀 커버', 10, 120, ARRAY['queen','king'], ARRAY['back','stomach'], ARRAY['average','heavy'], ARRAY['단단한 지지력','냉감 원단','D2C 가성비'], ARRAY['초기 적응 필요','오프라인 매장 없음'], 4.3, 198);

-- 써타 (2개)
INSERT INTO mattress_products (brand_id, name, mattress_type, firmness, height_cm, price_msrp, price_street, coil_count, foam_density, cover_material, warranty_years, trial_days, sizes_available, best_for_positions, best_for_weights, pros, cons, rating_avg, review_count) VALUES
((SELECT id FROM brands WHERE name = 'Serta'), '퍼펙트 슬리퍼', 'innerspring', 7, 32.0, 3200000, 2750000, 950, NULL, '면 혼방', 10, 100, ARRAY['queen','king'], ARRAY['back','side'], ARRAY['average','heavy'], ARRAY['허리 지지력','내구성 우수','호텔 납품 많음'], ARRAY['가격대 높음','무거움'], 4.5, 112),
((SELECT id FROM brands WHERE name = 'Serta'), '아이컴포트 하이브리드', 'hybrid', 6, 30.0, 3800000, 3250000, 800, '70D', '쿨액션 젤', 10, 100, ARRAY['queen','king'], ARRAY['side','back'], ARRAY['average'], ARRAY['젤 메모리폼','냉감 효과','흔들림 적음'], ARRAY['비쌈','초기 냄새'], 4.4, 89);

-- 드림베드 (2개)
INSERT INTO mattress_products (brand_id, name, mattress_type, firmness, height_cm, price_msrp, price_street, coil_count, foam_density, cover_material, warranty_years, trial_days, sizes_available, best_for_positions, best_for_weights, pros, cons, rating_avg, review_count) VALUES
((SELECT id FROM brands WHERE name = 'Dreambed'), '사일런스 프리미엄', 'innerspring', 6, 28.0, 2900000, 2450000, 880, NULL, '면 100%', 10, 100, ARRAY['queen','king'], ARRAY['back','side'], ARRAY['average'], ARRAY['조용한 스프링','일본 제조 품질','균형 잡힌 지지력'], ARRAY['가격대 높음','국내 AS 한정'], 4.3, 64),
((SELECT id FROM brands WHERE name = 'Dreambed'), '라텍스 내추럴', 'latex', 5, 25.0, 3500000, 3000000, NULL, NULL, '오가닉 코튼', 15, 100, ARRAY['queen','king'], ARRAY['side','back'], ARRAY['light','average'], ARRAY['천연 라텍스 100%','통기성 우수','친환경'], ARRAY['매우 비쌈','무거움','초기 냄새'], 4.6, 52);

-- 코웨이 (1개)
INSERT INTO mattress_products (brand_id, name, mattress_type, firmness, height_cm, price_msrp, price_street, coil_count, foam_density, cover_material, warranty_years, trial_days, sizes_available, best_for_positions, best_for_weights, pros, cons, rating_avg, review_count) VALUES
((SELECT id FROM brands WHERE name = 'Coway'), '렌탈 매트리스 프리미엄', 'memory_foam', 6, 27.0, 1800000, NULL, NULL, '60D', '항균 패브릭', 3, 30, ARRAY['queen','king','single'], ARRAY['back','side'], ARRAY['average'], ARRAY['렌탈 가능 (월 5만원대)','정기 관리 서비스','초기 비용 부담 적음'], ARRAY['소유 불가','장기 사용 시 총비용 높음'], 4.1, 178);

-- 이케아 (2개)
INSERT INTO mattress_products (brand_id, name, mattress_type, firmness, height_cm, price_msrp, price_street, coil_count, foam_density, cover_material, warranty_years, trial_days, sizes_available, best_for_positions, best_for_weights, pros, cons, rating_avg, review_count) VALUES
((SELECT id FROM brands WHERE name = 'IKEA'), '호발그', 'innerspring', 7, 24.0, 399000, 399000, 600, NULL, '폴리에스터', 25, 365, ARRAY['queen','single'], ARRAY['back','stomach'], ARRAY['average'], ARRAY['초저가','365일 반품 가능','단단한 지지력'], ARRAY['쿠셔닝 부족','내구성 낮음','퀸/킹 사이즈 한정'], 3.8, 523),
((SELECT id FROM brands WHERE name = 'IKEA'), '모룸', 'latex', 5, 18.0, 799000, 799000, NULL, NULL, '면 혼방', 25, 365, ARRAY['queen','king','single'], ARRAY['side','back'], ARRAY['light','average'], ARRAY['천연 라텍스','저렴한 가격','365일 반품'], ARRAY['얇음 (토퍼처럼 사용)','지지력 약함'], 3.9, 287);
