import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Checklist } from './interfaces/checklist.interface'
import { Checkbox, Res } from './interfaces/checkbox.interface'
import { CreateChecklistDto } from './dto/create-checklist.dto'
import { CreateCheckboxDto } from './dto/create-checkbox.dto'
import { UpdateCompletedDto } from './dto/update-completed.dto'
import { UpdateOrderNoDto } from './dto/update-orderNo.dto'
import { UpdateIsMainDto } from './dto/update-isMain.dto'
import { Types } from 'mongoose'
import { DeleteCheckboxDto } from './dto/delete-checkbox.dto'
import { ObjectId } from 'mongodb'

@Injectable()
export class ChecklistService {
  constructor(
    @InjectModel('Checklist') private readonly checklistModel: Model<Checklist>,
    @InjectModel('Checkbox') private readonly checkboxModel: Model<Checkbox>,
  ) {}

  async findByUser(userId: string): Promise<Checklist[]> {
    return await this.checklistModel
      .find({ userId })
      .populate('checkboxes')
      .exec()
  }

  async createChecklist(
    createChecklistDto: CreateChecklistDto,
  ): Promise<Checklist> {
    const { userId } = createChecklistDto
    const newChecklist = new this.checklistModel({ userId })
    return await newChecklist.save()
  }

  async updateChecklistTitle(
    checklistId: string,
    title: string,
  ): Promise<object> {
    const checklistObjectId = new Types.ObjectId(checklistId)
    const checklist = await this.checklistModel.findOne({
      _id: checklistObjectId,
    })

    if (!checklist) {
      throw new NotFoundException(`Checkbox with ID ${checklistId} not found`)
    }

    checklist.title = title
    await checklist.save()

    return {}
  }

  async deleteChecklist(checklistId: string): Promise<string> {
    const checklistObjectId = new Types.ObjectId(checklistId)

    const result = await this.checklistModel.findOneAndDelete({
      _id: checklistObjectId,
    })

    if (!result) {
      throw new NotFoundException(`Checklist with ID ${checklistId} not found`)
    }

    await this.checkboxModel.deleteMany({ checklistId: checklistObjectId })

    return '삭제되었습니다'
  }

  async getCheckboxesByChecklistId(checklistId: string): Promise<Res> {
    const checklistObjectId = new Types.ObjectId(checklistId)

    const checklist = await this.checklistModel
      .findById(checklistObjectId)
      .exec()

    if (!checklist) {
      throw new NotFoundException('Checklist not found')
    }

    if (!checklist.checkboxes || checklist.checkboxes.length === 0) {
      return   {
        title: checklist.title,
        checklistId: new ObjectId(checklistId), 
        checkboxes: [],
      } 
    }

    const checkboxes = await this.checkboxModel
      .find({
        _id: { $in: checklist.checkboxes },
      })
      .exec()

    return {
      title: checklist.title,
      checklistId: new ObjectId(checklistId), 
      checkboxes: checkboxes as Checkbox[],
    } as Res
  }

  async createCheckbox(
    createCheckboxDto: CreateCheckboxDto,
  ): Promise<Checkbox> {
    const objectId = new Types.ObjectId(createCheckboxDto.checklistId)
    const checklist = await this.checklistModel.findById(objectId)

    console.log('checklistId:', createCheckboxDto.checklistId)
    console.log('Checklist found:', checklist)

    if (!checklist) {
      throw new NotFoundException('Checklist not found')
    }

    const newCheckbox = new this.checkboxModel({
      ...createCheckboxDto,
      checklistId: checklist._id,
    })

    const savedCheckbox = await newCheckbox.save()

    checklist.checkboxes.push(savedCheckbox._id)
    await checklist.save()

    return savedCheckbox
  }

  async updateCompleted(
    checklistId: string,
    checkboxId: string,
    update: UpdateCompletedDto,
  ): Promise<Checkbox> {
    const checklistObjectId = new Types.ObjectId(checklistId)
    const checkboxObjectId = new Types.ObjectId(checkboxId)

    const checkbox = await this.checkboxModel.findOne({
      _id: checkboxObjectId,
      checklistId: checklistObjectId,
    })

    if (!checkbox) {
      throw new NotFoundException(`Checkbox with ID ${checkboxId} not found`)
    }

    checkbox.isCompleted = update.completed
    await checkbox.save()

    return checkbox
  }

  async updateOrderNo(
    checklistId: string,
    checkboxId: string,
    update: UpdateOrderNoDto,
  ): Promise<Checkbox> {
    const checklistObjectId = new Types.ObjectId(checklistId)
    const checkboxObjectId = new Types.ObjectId(checkboxId)

    const checkbox = await this.checkboxModel.findOne({
      _id: checkboxObjectId,
      checklistId: checklistObjectId,
    })

    if (!checkbox) {
      throw new NotFoundException(`Checkbox with ID ${checkboxId} not found`)
    }

    checkbox.orderNo = update.orderNo
    await checkbox.save()

    return checkbox
  }

  async updateIsMain(
    checklistId: string,
    checkboxId: string,
    update: UpdateIsMainDto,
  ): Promise<Checkbox> {
    const checklistObjectId = new Types.ObjectId(checklistId)
    const checkboxObjectId = new Types.ObjectId(checkboxId)

    const checkbox = await this.checkboxModel.findOne({
      _id: checkboxObjectId,
      checklistId: checklistObjectId,
    })

    if (!checkbox) {
      throw new NotFoundException(`Checkbox with ID ${checkboxId} not found`)
    }

    checkbox.isMain = update.isMain
    await checkbox.save()

    return checkbox
  }

  async deleteCheckbox(
    checklistId: string,
    checkboxIds: string[],
  ): Promise<DeleteCheckboxDto.Res> {
    const checklistObjectId = new Types.ObjectId(checklistId)
    var deletedCount = 0
    const deletedIds:string[] = []

    for (const checkboxId of checkboxIds) {
      if (checkboxId.length != 24) {
        throw new BadRequestException(`Checkbox with ID ${checkboxId} length is not 24`)

      }
      const checkboxObjectId = new Types.ObjectId(checkboxId)

      const result = await this.checkboxModel.findOneAndDelete({
        _id: checkboxObjectId,
        checklistId: checklistObjectId,
      })

      if (result) {
        deletedCount += 1
        deletedIds.push(checkboxId)
        
        await this.checklistModel.updateOne(
          { _id: checklistObjectId },
          { $pull: { checkboxes: result._id } },
        )
      }


    }

    const res: DeleteCheckboxDto.Res = {
      deletedCount,
      deletedIds,
    }
    return res
  }
}
