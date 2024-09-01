import { Types } from 'mongoose';

export interface Checklist {
  id: string;                // 체크리스트의 고유 식별자
  userId: string;            // 체크리스트를 작성한 회원의 고유 번호
  checkboxes: Types.ObjectId[];  // 체크리스트에 포함된 체크박스들의 ID 배열
  createdAt: Date;           // 체크리스트의 생성일
}