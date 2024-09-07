export class UpdateIsMainDto {
  id: string // 체크박스의 고유 ID
  checklistId: string // 이 체크박스가 속한 체크리스트의 ID
  isMain: number // 메인 설정 (1: True, 0: False)
}
