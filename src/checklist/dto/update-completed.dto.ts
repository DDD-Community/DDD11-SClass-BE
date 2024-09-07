export class UpdateCompletedDto {
  id: string // 체크박스의 고유 ID
  checklistId: string // 이 체크박스가 속한 체크리스트의 ID
  completed: number // 완료 상태 (1: 완료, 0: 미완료)
}
