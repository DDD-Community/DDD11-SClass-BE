export class UpdateOrderNoDto {
  id: string;                 // 체크박스의 고유 ID
  checklistId: string;        // 이 체크박스가 속한 체크리스트의 ID
  orderNo: number;            // 정렬 순서
}