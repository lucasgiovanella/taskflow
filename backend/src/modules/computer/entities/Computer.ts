import { ComputerType } from '@prisma/client';
import { Replace } from '../../../utils/replace';
import { randomUUID } from 'crypto';

interface ComputerProps {
  computerName: string;
  responsible: string;
  macAddress: string;
  local: string;
  replace: string;
  pendences: string;
  checked: boolean;
  type: ComputerType;
  updatedBy: string;
  status: boolean;
  isDroped: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Computer {
  private props: ComputerProps;
  private _id: string;

  constructor(
    props: Replace<
      ComputerProps,
      {
        createdAt?: Date;
        updatedAt?: Date;
        local?: string | null;
        replace?: string | null;
        pendences?: string | null;
        status?: boolean;
        checked?: boolean;
        macAddress?: string | null;
        updatedBy?: string;
        isDroped?: boolean | null;
      }
    >,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      local: props.local ?? '',
      replace: props.replace ?? '',
      pendences: props.pendences ?? '',
      status: props.status ?? false,
      checked: props.checked ?? false,
      macAddress: props.macAddress ?? '',
      updatedBy: props.updatedBy ?? props.responsible,
      isDroped: props.isDroped ?? false,
    };

    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get computerName(): string {
    return this.props.computerName;
  }

  set computerName(computerName: string) {
    this.props.computerName = computerName;
  }

  get responsible(): string {
    return this.props.responsible;
  }

  set responsible(responsible: string) {
    this.props.responsible = responsible;
  }

  get macAddress(): string {
    return this.props.macAddress;
  }

  set macAddress(macAddress: string) {
    this.props.macAddress = macAddress;
  }

  get local(): string {
    return this.props.local;
  }

  set local(local: string) {
    this.props.local = local;
  }

  get replace(): string {
    return this.props.replace;
  }

  set replace(replace: string) {
    this.props.replace = replace;
  }

  get pendences(): string {
    return this.props.pendences;
  }

  set pendences(pendences: string) {
    this.props.pendences = pendences;
  }

  get checked(): boolean {
    return this.props.checked;
  }

  set checked(checked: boolean) {
    this.props.checked = checked;
  }

  get type(): ComputerType {
    return this.props.type;
  }

  set type(type: ComputerType) {
    this.props.type = type;
  }

  get updatedBy(): string {
    return this.props.updatedBy;
  }

  set updatedBy(updatedBy: string) {
    this.props.updatedBy = updatedBy;
  }

  get status(): boolean {
    return this.props.status;
  }

  set status(status: boolean) {
    this.props.status = status;
  }

  get isDroped(): boolean {
    return this.props.isDroped;
  }

  set isDroped(isDroped: boolean) {
    this.props.isDroped = isDroped;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
