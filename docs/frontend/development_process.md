# KNOT 프론트엔드 기능 개발 프로세스 및 표준 가이드

본 문서는 **KNOT (공동 목표 빌드 플랫폼)** 프론트엔드에서 신규 기능(CRUD, UI 인터랙션, 모달 등)을 개발할 때 준수해야 하는 **표준 개발 프로세스**와 **아키텍처 가이드라인**을 정리한 문서입니다.

---

## 1. 아키텍처 원칙 (Core Principles)

KNOT 프론트엔드는 **3계층 클린 아키텍처(Layered Clean Architecture)**와 **MVVM(Model-View-ViewModel)** 패턴을 기반으로 합니다.

```
[UI 이벤트 발생]
       │
       ▼
1. View (*View.tsx) ─────────► 순수 마크업 표기 (상태·함수 선언 0개)
       │ (handlers 호출)
       ▼
2. ViewModel (use*.ts) ──────► 폼 상태, UI 제어 로직, 유효성 검증
       │ (Action 호출)
       ▼
3. Application Hook ─────────► 전역 상태 동기화 & 오케스트레이션
       │ (순수 연산 위임)
       ▼
4. Domain Service ───────────► 프레임워크 독립적 순수 비즈니스 규칙
       │ (데이터 영속화 위임)
       ▼
5. Repository & Storage ─────► LocalStorage / HTTP API 저장
```

### 핵심 원칙
1. **단방향 데이터 흐름 (Unidirectional Data Flow)**: 데이터는 위에서 아래로 흐르고, 이벤트는 아래에서 위로 전달됩니다.
2. **뷰의 순수성 (Pure Views)**: `*View.tsx` 내부에는 `useState`, `useEffect`, `Math.*`, `navigator.*` 등을 절대 작성하지 않습니다. 모든 상태와 동작은 Props(`state`, `handlers`)로 주입받습니다.
3. **서비스의 독립성 (Pure Services)**: `*Service.ts`는 React 훅이나 브라우저 DOM API에 의존하지 않는 순수 함수(Pure Function)로만 작성하여 100% 독립적 단위 테스트가 가능해야 합니다.

---

## 2. 표준 기능 개발 5단계 프로세스 (Step-by-Step)

새로운 기능을 추가할 때는 아래 **5단계 워크플로우**를 순서대로 따릅니다.

### Step 1: 타입 정의 (`presentation/types/index.ts`)
기능에 필요한 엔티티, DTO, 액션 파라미터 타입을 먼저 선언합니다.
```typescript
// 예: 타임라인 수정용 파라미터 타입
export interface UpdateTimelineEventParams {
  title?: string;
  date?: string;
  amount?: number;
  description?: string;
  location?: string;
  dattShared?: boolean;
}
```

---

### Step 2: 순수 도메인 서비스 로직 작성 (`application/services/`)
데이터 변환, 배열 갱신, 계산 등의 비즈니스 규칙을 순수 함수로 작성합니다.
- **타임라인 관련**: `application/services/timelineService.ts`
- **퀘스트 관련**: `application/services/questService.ts`
- **목표/자산 관련**: `application/services/goalService.ts`
- **팀/멤버 관련**: `application/services/teamService.ts`

```typescript
// 예시: timelineService.ts에 수정 함수 추가
export const TimelineService = {
  // ... 기존 함수들 ...
  updateEvent(
    events: TimelineEvent[],
    id: number,
    updateData: UpdateTimelineEventParams
  ): TimelineEvent[] {
    return events.map((event) =>
      event.id === id ? { ...event, ...updateData } : event
    );
  },
};
```

---

### Step 3: 상태 갱신 및 스토리지 연동 (`application/hooks/`)
도메인 훅에서 서비스 함수를 호출하여 리액트 `state`를 갱신하고, `Repository`를 통해 영속화합니다.

1. **개별 도메인 훅 수정 (예: `useTimeline.ts`)**:
   ```typescript
   export function useTimeline() {
     // ...
     const updateTimelineEvent = (id: number, data: UpdateTimelineEventParams) => {
       const updated = TimelineService.updateEvent(timelineEvents, id, data);
       setTimelineEvents(updated);
       TimelineLocalStorageRepository.saveTimelineEvents(updated);
     };

     return {
       // ...
       updateTimelineEvent,
     };
   }
   ```
2. **통합 오케스트레이션 훅 노출 (`useKnotApp.ts`)**:
   ```typescript
   export function useKnotApp() {
     // ...
     return {
       // ...
       updateTimelineEvent: timelineState.updateTimelineEvent,
     };
   }
   ```

---

### Step 4: 뷰모델(ViewModel) 훅 작성 (`presentation/view-models/`)
화면 또는 컴포넌트 단위에서 필요한 입력 폼 상태(`useState`), 모달 열림/닫힘 여부, 이벤트 핸들러를 정의합니다.
- **페이지 단위**: `presentation/view-models/pages/use*ViewModel.ts`
- **컴포넌트 단위**: `presentation/view-models/<domain>/use*.ts`

```typescript
// 예시: useEditTimelineModal.ts
export function useEditTimelineModal({ event, isOpen, onClose, onSave }: Props) {
  const [title, setTitle] = useState(event.title);
  const [amount, setAmount] = useState(event.amount?.toString() || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(event.id, {
      title: title.trim(),
      amount: amount ? parseInt(amount, 10) : undefined,
    });
    onClose();
  };

  return {
    state: { title, amount },
    handlers: { setTitle, setAmount, handleSubmit, onClose },
  };
}
```

---

### Step 5: 순수 뷰 마크업 및 어댑터 작성 (`presentation/views/`, `presentation/components/`)
뷰모델에서 가공한 데이터와 핸들러를 Props로 전달받아 화면을 렌더링합니다.

1. **순수 뷰 작성 (`presentation/views/<domain>/*View.tsx`)**:
   ```tsx
   export const EditTimelineModalView: React.FC<EditTimelineModalProps> = ({ state, handlers }) => {
     return (
       <Modal isOpen={true} onClose={handlers.onClose} title="일정 수정">
         <form onSubmit={handlers.handleSubmit}>
           <Input value={state.title} onChange={(e) => handlers.setTitle(e.target.value)} />
           <Button type="submit">저장하기</Button>
         </form>
       </Modal>
     );
   };
   ```
2. **컴포넌트 어댑터 작성 (`presentation/components/<domain>/*.tsx`)**:
   외부에서 단 1줄로 호출할 수 있도록 깔끔한 어댑터를 제공합니다.
   ```tsx
   export const EditTimelineModal: React.FC<Props> = (props) => {
     const viewModel = useEditTimelineModal(props);
     return <EditTimelineModalView {...viewModel} />;
   };
   ```

---

## 3. 실전 예제: 타임라인 노드 수정 기능 구현

기존 프로젝트에 타임라인 노드 수정 기능을 추가하는 구체적인 파일 변경 체크리스트입니다.

| 순서 | 파일 경로 | 변경 내용 |
| :---: | :--- | :--- |
| 1 | `application/services/timelineService.ts` | `updateEvent(events, id, data)` 순수 함수 추가 |
| 2 | `application/hooks/useTimeline.ts` | `updateTimelineEvent` 액션 추가 및 스토리지 저장 연동 |
| 3 | `application/hooks/useKnotApp.ts` | `updateTimelineEvent` Context 반환값에 추가 |
| 4 | `presentation/views/timeline/TimelineNodeItemView.tsx` | 삭제 아이콘 옆에 **수정 (`Edit3`)** 버튼 추가 및 `onEdit` 바인딩 |
| 5 | `presentation/view-models/pages/useTimelineViewModel.ts` | `editingEvent` 상태 및 `handleSaveEdit` 구현 |
| 6 | `presentation/views/timeline/AddTimelineNodeModalView.tsx` | 신규 등록/수정 모드 겸용 혹은 수정 전용 뷰 구성 |

---

## 4. 품질 관리 및 검증 체크리스트 (Do's & Don'ts)

새 기능을 개발한 후에는 반드시 다음 3가지 검증을 실행합니다:

```bash
# 1. 타입 안정성 검사 (TypeScript Type-Check)
$ npx tsc --noEmit

# 2. 코드 스타일 및 린트 검사
$ npm run lint

# 3. Next.js 프로덕션 정적 빌드 검증
$ npm run build
```

### ✅ Do's
- 모든 비즈니스 로직과 데이터 가공은 `application/services/`에 순수 함수로 작성합니다.
- 복잡한 컴포넌트는 `use*.ts`(뷰모델)와 `*View.tsx`(뷰)로 분리합니다.
- 기존 컴포넌트 호출부와의 하위 호환성을 위해 `presentation/components/<domain>/`에 어댑터를 유지합니다.

### ❌ Don'ts
- `*View.tsx` 파일 내에 `useState`, `useEffect`를 추가하지 않습니다.
- 컴포넌트 내부에서 `localStorage.setItem`을 직접 호출하지 않습니다 (반드시 `Repository` 경유).
- 도메인 서비스(`*Service.ts`)에 React 훅이나 DOM 관련 객체를 import하지 않습니다.
