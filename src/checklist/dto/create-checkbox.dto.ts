export class CreateCheckboxDto {
    checklistId: string;  // 체크리스트 ID
    label: string;        // 체크박스의 라벨(내용)
    userId: string;       // 체크박스를 생성한 사용자 ID
  }