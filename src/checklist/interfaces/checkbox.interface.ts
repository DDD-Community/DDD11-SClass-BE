import { Types } from 'mongoose'

export interface Checkbox {
  id: string // 체크박스의 고유 식별자
  checklistId: Types.ObjectId // 이 체크박스가 속한 체크리스트의 ID
  label: string // 체크박스의 라벨(내용)
  isCompleted: number // 완료 상태 (1: 완료, 0: 미완료)
  isMain: number // 메인 노출 여부 (1: 노출, 0: 노출 안 함)
  orderNo: number // 정렬 순서
  createdAt: Date // 체크박스의 생성일
}
export interface Res {
  title: string,
  checklistId: Types.ObjectId, // 이 체크박스가 속한 체크리스트의 ID
  checkboxes: Checkbox[],
}
