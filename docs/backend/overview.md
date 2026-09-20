# KNOT 백엔드 아키텍처 및 개요 가이드

본 문서는 **KNOT (공동 목표 빌드 플랫폼)** 백엔드(Spring Boot)의 아키텍처 개요, 데이터베이스 ERD 구조 및 API 연동 계획을 정리한 문서입니다.

---

## 1. 기술 스택 (Tech Stack)

- **Framework**: Spring Boot 4.x / Java 17
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA / Hibernate
- **Security**: Spring Security (JWT / OAuth2 소셜 로그인 연동 예정)
- **Build Tool**: Gradle

---

## 2. 데이터베이스 설계 (ERD)

백엔드 데이터 모델 설계도는 [ERD.png](./ERD.png)를 참조합니다.

### 핵심 엔티티 구조
1. **User (사용자)**:
   - `id`, `email`, `nickname`, `profile_image`, `role`, `status`, `created_at`
2. **Team (공동 팀)**:
   - `id`, `name`, `invite_code` (6자리 고유 난수), `created_at`
3. **TeamMember (팀-사용자 매핑)**:
   - `id`, `team_id`, `user_id`, `role` (팀장/팀원), `joined_at`
4. **Goal (공동 목표)**:
   - `id`, `team_id`, `title`, `target_amount`, `current_balance`, `due_date`, `created_at`
5. **TimelineEvent (타임라인 노드)**:
   - `id`, `team_id`, `title`, `event_type` (`MILESTONE` / `DATE` / `EXPENSE`), `event_date`, `amount`, `location`, `description`, `datt_shared`, `is_completed`
6. **Quest (퀘스트)**:
   - `id`, `team_id`, `title`, `description`, `quest_type`, `due_date`, `status`
7. **Task (세부 체크리스트)**:
   - `id`, `quest_id`, `content`, `assignee` (`ME` / `PARTNER` / `BOTH`), `status` (`PENDING` / `DONE`), `completed_at`

---

## 3. 프론트엔드(`next-js-app`)와의 API 연동 계획

현재 프론트엔드는 `infrastructure/storage/`의 `LocalStorageRepository`를 통해 브라우저 로컬 저장소를 활용하고 있으며, 향후 백엔드 API 배포 시 다음과 같이 1:1 대응됩니다:

| 도메인 | 프론트엔드 리포지토리 인터페이스 | 백엔드 REST API 엔드포인트 (예정) |
| :--- | :--- | :--- |
| **Auth / User** | `ITeamRepository.getCurrentUser()` | `GET /api/v1/users/me` |
| **Team** | `ITeamRepository.createTeam()` | `POST /api/v1/teams` |
| **Team Join** | `ITeamRepository.joinTeam()` | `POST /api/v1/teams/join` |
| **Goal** | `IGoalRepository.saveGoal()` | `POST /api/v1/goals`, `PUT /api/v1/goals/{id}` |
| **Balance** | `IGoalRepository.saveBalance()` | `PATCH /api/v1/goals/{id}/balance` |
| **Timeline** | `ITimelineRepository.saveTimelineEvents()` | `POST /api/v1/timelines`, `GET /api/v1/timelines` |
| **Quest** | `IQuestRepository.saveQuests()` | `POST /api/v1/quests`, `PATCH /api/v1/tasks/{id}/toggle` |

프론트엔드의 `infrastructure/http/httpClient.ts`가 준비되어 있으므로, 리포지토리 구현체만 LocalStorage에서 HTTP API로 교체하면 상위 비즈니스 로직 및 UI 수정 없이 완벽하게 백엔드 연동으로 전환할 수 있습니다.
