# KNOT (낫) 프로젝트 통합 문서 (Documentation)

KNOT 플랫폼의 전체 기획, 아키텍처 및 개발 프로세스 문서 인덱스입니다.

---

## 📁 문서 디렉터리 구성

```
docs/
├── README.md                      # [통합 문서 인덱스 (현재 파일)]
├── PRD.md                         # 제품 요구사항 정의서 (Product Requirement Document)
├── functional_specification.md    # 상세 기능 명세서
│
├── frontend/                      # [프론트엔드 (Next.js 16) 문서]
│   ├── architecture.md            # 화면 전환 흐름 및 3계층 Clean MVVM 아키텍처 가이드
│   └── development_process.md     # 신규 기능 개발 5단계 표준 프로세스 및 예제 가이드
│
└── backend/                       # [백엔드 (Spring Boot) 문서]
    ├── overview.md                # 백엔드 기술 스택, 엔티티 설계 및 API 연동 계획
    └── ERD.png                    # 데이터베이스 설계 다이어그램
```

---

## 🔗 주요 문서 바로가기

1. **공통 기획 및 명세**
   - [PRD.md](./PRD.md): 제품 비전, 타깃 유저, 핵심 가치 제안
   - [functional_specification.md](./functional_specification.md): 기능 요구사항 명세

2. **프론트엔드 (Frontend)**
   - [frontend/architecture.md](./frontend/architecture.md): 화면 전환 다이어그램, 계층별 책임, 디렉터리 분리 가이드
   - [frontend/development_process.md](./frontend/development_process.md): 신규 기능(수정, 추가 등) 개발 시 준수해야 할 5단계 가이드

3. **백엔드 (Backend)**
   - [backend/overview.md](./backend/overview.md): Spring Boot 아키텍처 및 프론트엔드와의 REST API 연동 계획
   - [backend/ERD.png](./backend/ERD.png): 데이터베이스 관계도 (Entity Relationship Diagram)
