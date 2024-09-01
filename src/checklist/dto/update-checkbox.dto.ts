export class UpdateCheckboxDto {
    id: string;           // 체크박스의 ID
    label: string;        // 체크박스의 라벨
    isCompleted?: number; // 완료 상태 (1: 완료, 0: 미완료, 선택적)
    isMain?: number;      // 메인 설정 (1: True, 0: False, 선택적)
    orderNo?: number;     // 정렬 순서 (선택적)
  }