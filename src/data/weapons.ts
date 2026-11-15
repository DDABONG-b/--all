export type WeaponCategory =
  | '롤러'
  | '머누버'
  | '버킷'
  | '붓'
  | '블래스터'
  | '셸터'
  | '슈터'
  | '스피너'
  | '와이퍼'
  | '차저'
  | '활';

export const WEAPON_CATEGORIES: readonly WeaponCategory[] = [
  '롤러',
  '머누버',
  '버킷',
  '붓',
  '블래스터',
  '셸터',
  '슈터',
  '스피너',
  '와이퍼',
  '차저',
  '활',
] as const;

export const SUB_WEAPONS = [
  '삼각밤',
  '빨판밤',
  '퀵밤',
  '컬링밤',
  '로봇밤',
  '탄산밤',
  '토피도',
  '트랩',
  '스프링클러',
  '스플래시 실드',
  '포인트 센서',
  '포이즌 미스트',
  '점프 비컨',
  '라인 마커',
] as const;

export type SubWeapon = (typeof SUB_WEAPONS)[number];

export const SPECIAL_WEAPONS = [
  '울트라 샷',
  '그레이트 배리어',
  '쇼크 원더',
  '멀티 미사일',
  '먹구름',
  '나이스옥',
  '홉소나',
  '흡입기',
  '메가폰 레이저',
  '제트팩',
  '울트라 스탬프',
  '크랩 탱크',
  '샤크 라이드',
  '트리플 토네이도',
  '에너지 스탠드',
  '디코이 캐넌',
  '로열 크라켄',
  '울트라 착지',
  '스플래터컬러 스크린',
] as const;

export type SpecialWeapon = (typeof SPECIAL_WEAPONS)[number];

export interface Weapon {
  imageName: string;
  name: string;
  category: WeaponCategory;
  sub: SubWeapon;
  special: SpecialWeapon;
}

export const WEAPONS: readonly Weapon[] = [
  // 슈터 (1 ~ 35)
  { imageName: '1', name: '52 갤런 데코', category: '슈터', sub: '컬링밤', special: '스플래터컬러 스크린' },
  { imageName: '2', name: '52 갤런', category: '슈터', sub: '스플래시 실드', special: '메가폰 레이저' },
  { imageName: '3', name: '글램 스플랫 슈터', category: '슈터', sub: '퀵밤', special: '로열 크라켄' },
  { imageName: '4', name: '스플랫 슈터 컬래버', category: '슈터', sub: '삼각밤', special: '트리플 토네이도' },
  { imageName: '5', name: '스플랫 슈터', category: '슈터', sub: '빨판밤', special: '울트라 샷' },
  { imageName: '6', name: '컬러 프로모델러', category: '슈터', sub: '퀵밤', special: '스플래터컬러 스크린' },
  { imageName: '7', name: '프로모델러 RG', category: '슈터', sub: '스프링클러', special: '나이스옥' },
  { imageName: '8', name: '프로모델러 MG', category: '슈터', sub: '탄산밤', special: '샤크 라이드' },
  { imageName: '9', name: '샤프 마커 GECK', category: '슈터', sub: '포이즌 미스트', special: '먹구름' },
  { imageName: '10', name: '네오 샤프 마커', category: '슈터', sub: '빨판밤', special: '트리플 토네이도' },
  { imageName: '11', name: '샤프 마커', category: '슈터', sub: '퀵밤', special: '크랩 탱크' },
  { imageName: '12', name: '단풍 슈터', category: '슈터', sub: '토피도', special: '홉소나' },
  { imageName: '13', name: '네오 볼드 마커', category: '슈터', sub: '점프 비컨', special: '메가폰 레이저' },
  { imageName: '14', name: '볼드 마커', category: '슈터', sub: '컬링밤', special: '울트라 스탬프' },
  { imageName: '15', name: '보틀 가이저', category: '슈터', sub: '스플래시 실드', special: '울트라 샷' },
  { imageName: '16', name: 'H3 릴 건 SNAK', category: '슈터', sub: '빨판밤', special: '트리플 토네이도' },
  { imageName: '17', name: 'H3 릴 건 D', category: '슈터', sub: '스플래시 실드', special: '그레이트 배리어' },
  { imageName: '18', name: 'H3 릴 건', category: '슈터', sub: '포인트 센서', special: '에너지 스탠드' },
  { imageName: '19', name: '글리터 L3 릴 건', category: '슈터', sub: '삼각밤', special: '제트팩' },
  { imageName: '20', name: 'L3 릴 건 D', category: '슈터', sub: '퀵밤', special: '울트라 스탬프' },
  { imageName: '21', name: 'L3 릴 건', category: '슈터', sub: '컬링밤', special: '크랩 탱크' },
  { imageName: '22', name: '스페이스 슈터 컬래버', category: '슈터', sub: '트랩', special: '제트팩' },
  { imageName: '23', name: '스페이스 슈터', category: '슈터', sub: '포인트 센서', special: '메가폰 레이저' },
  { imageName: '24', name: '제트 스위퍼 COBR', category: '슈터', sub: '퀵밤', special: '울트라 착지' },
  { imageName: '25', name: '커스텀 제트 스위퍼', category: '슈터', sub: '포이즌 미스트', special: '먹구름' },
  { imageName: '26', name: '제트 스위퍼', category: '슈터', sub: '라인 마커', special: '흡입기' },
  { imageName: '27', name: '클로. 96 갤런', category: '슈터', sub: '라인 마커', special: '에너지 스탠드' },
  { imageName: '28', name: '96 갤런 데코', category: '슈터', sub: '스플래시 실드', special: '로열 크라켄' },
  { imageName: '29', name: '96 갤런', category: '슈터', sub: '스프링클러', special: '흡입기' },
  { imageName: '30', name: '프라임 슈터 FRZN', category: '슈터', sub: '삼각밤', special: '멀티 미사일' },
  { imageName: '31', name: 'N-ZAP89', category: '슈터', sub: '로봇밤', special: '디코이 캐넌' },
  { imageName: '32', name: 'N-ZAP85', category: '슈터', sub: '빨판밤', special: '에너지 스탠드' },
  { imageName: '33', name: '포일 보틀 가이저', category: '슈터', sub: '로봇밤', special: '스플래터컬러 스크린' },
  { imageName: '34', name: '프라임 슈터', category: '슈터', sub: '라인 마커', special: '크랩 탱크' },
  { imageName: '35', name: '프라임 슈터 컬래버', category: '슈터', sub: '빨판밤', special: '나이스옥' },

  // 롤러 (36 ~ 48)
  { imageName: '36', name: '플래닛 와이드 롤러', category: '롤러', sub: '토피도', special: '울트라 착지' },
  { imageName: '37', name: '와이드 롤러 컬래버', category: '롤러', sub: '라인 마커', special: '먹구름' },
  { imageName: '38', name: '와이드 롤러', category: '롤러', sub: '스플래시 실드', special: '흡입기' },
  { imageName: '39', name: '포일 베이러블 롤러', category: '롤러', sub: '빨판밤', special: '스플래터컬러 스크린' },
  { imageName: '40', name: '베리어블 롤러', category: '롤러', sub: '트랩', special: '멀티 미사일' },
  { imageName: '41', name: '스타 다이너모 롤러', category: '롤러', sub: '포인트 센서', special: '메가폰 레이저' },
  { imageName: '42', name: '골드 다이너모 롤러', category: '롤러', sub: '삼각밤', special: '디코이 캐넌' },
  { imageName: '43', name: '다이너모 롤러', category: '롤러', sub: '스프링클러', special: '에너지 스탠드' },
  { imageName: '44', name: '스플랫 롤러 컬래버', category: '롤러', sub: '점프 비컨', special: '로열 크라켄' },
  { imageName: '45', name: '스플랫 롤러', category: '롤러', sub: '컬링밤', special: '그레이트 배리어' },
  { imageName: '46', name: '카본 롤러 ANGL', category: '롤러', sub: '탄산밤', special: '디코이 캐넌' },
  { imageName: '47', name: '카본 롤러 데코', category: '롤러', sub: '퀵밤', special: '울트라 샷' },
  { imageName: '48', name: '카본 롤러', category: '롤러', sub: '로봇밤', special: '쇼크 원더' },

  // 차저 (49 ~ 66)
  { imageName: '49', name: 'R-PEN/5B', category: '차저', sub: '스플래시 실드', special: '먹구름' },
  { imageName: '50', name: 'R-PEN/5H', category: '차저', sub: '스프링클러', special: '에너지 스탠드' },
  { imageName: '51', name: '커스텀 소이 튜버', category: '차저', sub: '탄산밤', special: '울트라 스탬프' },
  { imageName: '52', name: '소이 튜버', category: '차저', sub: '토피도', special: '멀티 미사일' },
  { imageName: '53', name: '14식 대나무 총 을', category: '차저', sub: '탄산밤', special: '디코이 캐넌' },
  { imageName: '54', name: '14식 대나무 총 갑', category: '차저', sub: '로봇밤', special: '메가폰 레이저' },
  { imageName: '55', name: '커스텀 4K 스코프', category: '차저', sub: '점프 비컨', special: '로열 크라켄' },
  { imageName: '56', name: '4K 스코프', category: '차저', sub: '트랩', special: '홉소나' },
  { imageName: '57', name: '커스텀 리터 4K', category: '차저', sub: '점프 비컨', special: '로열 크라켄' },
  { imageName: '58', name: '리터 4K', category: '차저', sub: '트랩', special: '홉소나' },
  { imageName: '59', name: '스플랫 스코프 FRST', category: '차저', sub: '스프링클러', special: '크랩 탱크' },
  { imageName: '60', name: '스플랫 스코프 컬래버', category: '차저', sub: '스플래시 실드', special: '트리플 토네이도' },
  { imageName: '61', name: '스플랫 스코프', category: '차저', sub: '삼각밤', special: '흡입기' },
  { imageName: '62', name: '스플랫 차저 FRST', category: '차저', sub: '스프링클러', special: '크랩 탱크' },
  { imageName: '63', name: '스플랫 차저 컬래버', category: '차저', sub: '스플래시 실드', special: '트리플 토네이도' },
  { imageName: '64', name: '스프랫 차저', category: '차저', sub: '삼각밤', special: '흡입기' },
  { imageName: '65', name: '스퀵 클린B', category: '차저', sub: '로봇밤', special: '쇼크 원더' },
  { imageName: '66', name: '스퀵 클린a', category: '차저', sub: '포인트 센서', special: '그레이트 배리어' },

  // 버킷 (67 ~ 80)
  { imageName: '67', name: '혼 몹링', category: '버킷', sub: '컬링밤', special: '크랩 탱크' },
  { imageName: '68', name: '몹링 D', category: '버킷', sub: '점프 비컨', special: '홉소나' },
  { imageName: '69', name: '몹링', category: '버킷', sub: '빨판밤', special: '샤크 라이드' },
  { imageName: '70', name: '커스텀 익스플로셔', category: '버킷', sub: '스플래시 실드', special: '울트라 착지' },
  { imageName: '71', name: '익스프로셔', category: '버킷', sub: '포인트 센서', special: '먹구름' },
  { imageName: '72', name: '오버플로셔 데코', category: '버킷', sub: '라인 마커', special: '로열 크라켄' },
  { imageName: '73', name: '오버플로셔', category: '버킷', sub: '스프링클러', special: '먹구름' },
  { imageName: '74', name: '네오 스크루 슬로셔', category: '버킷', sub: '포인트 센서', special: '울트라 샷' },
  { imageName: '75', name: '스크루 슬로셔', category: '버킷', sub: '탄산밤', special: '나이스옥' },
  { imageName: '76', name: '물통 ASH', category: '버킷', sub: '삼각밤', special: '스플래터컬러 스크린' },
  { imageName: '77', name: '물통 휴', category: '버킷', sub: '탄산밤', special: '에너지 스탠드' },
  { imageName: '78', name: '물통', category: '버킷', sub: '포이즌 미스트', special: '제트팩' },
  { imageName: '79', name: '버킷 슬로셔 데코', category: '버킷', sub: '라인 마커', special: '쇼크 원더' },
  { imageName: '80', name: '버킷 슬로셔', category: '버킷', sub: '삼각밤', special: '트리플 토네이도' },

  // 스피너 (81 ~ 94)
  { imageName: '81', name: '이그재미너 휴', category: '스피너', sub: '삼각밤', special: '크랩 탱크' },
  { imageName: '82', name: '이그재미너', category: '스피너', sub: '컬링밤', special: '에너지 스탠드' },
  { imageName: '83', name: '노틸러스 79', category: '스피너', sub: '빨판밤', special: '울트라 착지' },
  { imageName: '84', name: '노틸러스 47', category: '스피너', sub: '포인트 센서', special: '먹구름' },
  { imageName: '85', name: '쿠겔 슈라이버 휴', category: '스피너', sub: '트랩', special: '흡입기' },
  { imageName: '86', name: '쿠겔 슈라이버', category: '스피너', sub: '탄산밤', special: '제트팩' },
  { imageName: '87', name: '토렌트 하이드런트', category: '스피너', sub: '스프링클러', special: '그레이트 배리어' },
  { imageName: '88', name: '커스텀 하이드런트', category: '스피너', sub: '트랩', special: '스플래터컬러 스크린' },
  { imageName: '89', name: '하이드런트', category: '스피너', sub: '로봇밤', special: '나이스옥' },
  { imageName: '90', name: '배럴 스피너 데코', category: '스피너', sub: '포인트 센서', special: '로열 크라켄' },
  { imageName: '91', name: '배럴 스피너', category: '스피너', sub: '스프링클러', special: '홉소나' },
  { imageName: '92', name: '스플랫 스피너 PYTN', category: '스피너', sub: '점프 비컨', special: '울트라 샷' },
  { imageName: '93', name: '스플랫 스피너 컬래버', category: '스피너', sub: '포이즌 미스트', special: '그레이트 배리어' },
  { imageName: '94', name: '스플랫 스피너', category: '스피너', sub: '퀵밤', special: '울트라 스탬프' },

  // 머누버 (95 ~ 109)
  { imageName: '95', name: '커스텀 소방 FF', category: '머누버', sub: '퀵밤', special: '트리플 토네이도' },
  { imageName: '96', name: '소방 FF', category: '머누버', sub: '트랩', special: '메가폰 레이저' },
  { imageName: '97', name: '화이트 쿼드 호퍼', category: '머누버', sub: '스프링클러', special: '쇼크 원더' },
  { imageName: '98', name: '블랙 쿼드 호퍼', category: '머누버', sub: '로봇밤', special: '샤크 라이드' },
  { imageName: '99', name: '후프 듀얼 스위퍼', category: '머누버', sub: '포인트 센서', special: '스플래터컬러 스크린' },
  { imageName: '100', name: '커스텀 듀얼 스위퍼', category: '머누버', sub: '점프 비컨', special: '디코이 캐넌' },
  { imageName: '101', name: '듀얼 스위퍼', category: '머누버', sub: '삼각밤', special: '홉소나' },
  { imageName: '102', name: '켈빈 525 데코', category: '머누버', sub: '포인트 센서', special: '울트라 샷' },
  { imageName: '103', name: '켈빈 525', category: '머누버', sub: '스플래시 실드', special: '나이스옥' },
  { imageName: '104', name: '트윙클 스플랫 머누버', category: '머누버', sub: '탄산밤', special: '그레이트 배리어' },
  { imageName: '105', name: '스플랫 머누버 컬래버', category: '머누버', sub: '컬링밤', special: '울트라 착지' },
  { imageName: '106', name: '스퍼터리 OWL', category: '머누버', sub: '삼각밤', special: '메가폰 레이저' },
  { imageName: '107', name: '스퍼터리 휴', category: '머누버', sub: '토피도', special: '샤크 라이드' },
  { imageName: '108', name: '스퍼터리', category: '머누버', sub: '점프 비컨', special: '에너지 스탠드' },
  { imageName: '109', name: '스플랫 머누버', category: '머누버', sub: '빨판밤', special: '크랩 탱크' },

  // 셸터 (110 ~ 119)
  { imageName: '110', name: '24식 도돌이 우산 을', category: '셸터', sub: '포이즌 미스트', special: '울트라 착지' },
  { imageName: '111', name: '24식 도돌이 우산 갑', category: '셸터', sub: '라인 마커', special: '그레이트 배리어' },
  { imageName: '112', name: '패턴 스파이 가젯', category: '셸터', sub: '컬링밤', special: '메가폰 레이저' },
  { imageName: '113', name: '스파이 가젯 소렐라', category: '셸터', sub: '토피도', special: '스플래터컬러 스크린' },
  { imageName: '114', name: '스파이 가젯', category: '셸터', sub: '트랩', special: '샤크 라이드' },
  { imageName: '115', name: '캠핑 셸터 CREM', category: '셸터', sub: '포이즌 미스트', special: '디코이 캐넌' },
  { imageName: '116', name: '캠핑 셸터 소렐라', category: '셸터', sub: '트랩', special: '울트라 샷' },
  { imageName: '117', name: '캠핑 셸터', category: '셸터', sub: '점프 비컨', special: '흡입기' },
  { imageName: '118', name: '파라 셸터 소렐라', category: '셸터', sub: '로봇밤', special: '제트팩' },
  { imageName: '119', name: '파라 셸터', category: '셸터', sub: '스프링클러', special: '트리플 토네이도' },

  // 블래스터 (120 ~ 135)
  { imageName: '120', name: 'S-BLAST91', category: '블래스터', sub: '퀵밤', special: '나이스옥' },
  { imageName: '121', name: 'S-BLAST92', category: '블래스터', sub: '스프링클러', special: '샤크 라이드' },
  { imageName: '122', name: 'R 블래스터 엘리트 WNTR', category: '블래스터', sub: '빨판밤', special: '에너지 스탠드' },
  { imageName: '123', name: 'R 블래스터 엘리트 데코', category: '블래스터', sub: '라인 마커', special: '메가폰 레이저' },
  { imageName: '124', name: 'R 블래스터 엘리트', category: '블래스터', sub: '포이즌 미스트', special: '흡입기' },
  { imageName: '125', name: '래피드 블래스터 데코', category: '블래스터', sub: '토피도', special: '제트팩' },
  { imageName: '126', name: '래피드 블래스터', category: '블래스터', sub: '트랩', special: '트리플 토네이도' },
  { imageName: '127', name: '네오 크래시 블래스터', category: '블래스터', sub: '컬링밤', special: '디코이 캐넌' },
  { imageName: '128', name: '크래시 블래스터', category: '블래스터', sub: '삼각밤', special: '울트라 샷' },
  { imageName: '129', name: '커스텀 롱 블래스터', category: '블래스터', sub: '삼각밤', special: '로열 크라켄' },
  { imageName: '130', name: '글림 핫 블래스터', category: '블래스터', sub: '점프 비컨', special: '크랩 탱크' },
  { imageName: '131', name: '롱 블래스터', category: '블래스터', sub: '빨판밤', special: '홉소나' },
  { imageName: '132', name: '커스텀 핫 블래스터', category: '블래스터', sub: '포인트 센서', special: '울트라 착지' },
  { imageName: '133', name: '핫 블래스터', category: '블래스터', sub: '로봇밤', special: '그레이트 배리어' },
  { imageName: '134', name: '네오 노바 블래스터', category: '블래스터', sub: '탄산밤', special: '울트라 스탬프' },
  { imageName: '135', name: '노바 블래스터', category: '블래스터', sub: '삼각밤', special: '쇼크 원더' },

  // 활 (136 ~ 143)
  { imageName: '136', name: '커스텀 플루이드 V', category: '활', sub: '포인트 센서', special: '홉소나' },
  { imageName: '137', name: '플루이드 V', category: '활', sub: '로봇밤', special: '울트라 스탬프' },
  { imageName: '138', name: 'LACT-450 MILK', category: '활', sub: '토피도', special: '나이스옥' },
  { imageName: '139', name: 'LACT-450 데코', category: '활', sub: '스플래시 실드', special: '샤크 라이드' },
  { imageName: '140', name: 'LACT-450', category: '활', sub: '컬링밤', special: '멀티 미사일' },
  { imageName: '141', name: '벌브 트라이 스트링거', category: '활', sub: '라인 마커', special: '제트팩' },
  { imageName: '142', name: '트라이 스트링거 컬래버', category: '활', sub: '스프링클러', special: '디코이 캐넌' },
  { imageName: '143', name: '트라이 스트링거', category: '활', sub: '포이즌 미스트', special: '메가폰 레이저' },

  // 붓 (144 ~ 151)
  { imageName: '144', name: '빈센트 BRNZ', category: '붓', sub: '스플래시 실드', special: '울트라 샷' },
  { imageName: '145', name: '빈센트 휴', category: '붓', sub: '포인트 센서', special: '멀티 미사일' },
  { imageName: '146', name: '빈센트', category: '붓', sub: '컬링밤', special: '홉소나' },
  { imageName: '147', name: '코메트 호쿠사이', category: '붓', sub: '로봇밤', special: '로열 크라켄' },
  { imageName: '148', name: '호쿠사이 휴', category: '붓', sub: '점프 비컨', special: '먹구름' },
  { imageName: '149', name: '호쿠사이', category: '붓', sub: '빨판밤', special: '쇼크 원더' },
  { imageName: '150', name: '파블로 휴', category: '붓', sub: '트랩', special: '울트라 스탬프' },
  { imageName: '151', name: '파블로', category: '붓', sub: '삼각밤', special: '메가폰 레이저' },

  // 와이퍼 (152 ~ 159)
  { imageName: '152', name: '드라이브 와이퍼', category: '와이퍼', sub: '토피도', special: '울트라 스탬프' },
  { imageName: '153', name: '스티커 사무 와이퍼', category: '와이퍼', sub: '로봇밤', special: '나이스옥' },
  { imageName: '154', name: '사무 와이퍼 휴', category: '와이퍼', sub: '포이즌 미스트', special: '크랩 탱크' },
  { imageName: '155', name: '사무 와이퍼', category: '와이퍼', sub: '퀵밤', special: '쇼크 원더' },
  { imageName: '156', name: '잉크 덴탈 와이퍼', category: '와이퍼', sub: '스플래시 실드', special: '제트팩' },
  { imageName: '157', name: '민트 덴탈 와이퍼', category: '와이퍼', sub: '빨판밤', special: '그레이트 배리어' },
  { imageName: '158', name: '드라이브 와이퍼 RUST', category: '와이퍼', sub: '컬링밤', special: '울트라 샷' },
  { imageName: '159', name: '드라이브 와이퍼 데코', category: '와이퍼', sub: '점프 비컨', special: '멀티 미사일' },
];

export function shuffleArray<T>(items: readonly T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function buildChoiceOptions<T extends string>(
  correct: T,
  pool: readonly T[],
  count = 4
): T[] {
  const distractors = shuffleArray(pool.filter((item) => item !== correct)).slice(
    0,
    count - 1
  );
  return shuffleArray([correct, ...distractors]);
}

export function getCategoryCounts(): Record<WeaponCategory, number> {
  const counts = {} as Record<WeaponCategory, number>;
  for (const cat of WEAPON_CATEGORIES) {
    counts[cat] = 0;
  }
  for (const weapon of WEAPONS) {
    counts[weapon.category] += 1;
  }
  return counts;
}
