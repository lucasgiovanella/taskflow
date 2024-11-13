import { Replace } from '../../../utils/replace';
import { randomUUID } from 'crypto';

interface DepositProps {
  name: string;
  year: number;
  addedBy: string;
  notes: string;
  inUse: boolean;
  model: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Deposit {
  private props: DepositProps;
  private _id: string;

  constructor(
    props: Replace<
      DepositProps,
      {
        createdAt?: Date;
        updatedAt?: Date;
        notes?: string | null;
        inUse?: boolean;
        year: number | null;
      }
    >,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      notes: props.notes ?? '',
      inUse: props.inUse ?? false,
      year: props.year ?? new Date().getFullYear(),
    };

    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get year(): number {
    return this.props.year;
  }

  set year(value: number) {
    this.props.year = value;
  }

  get addedBy(): string {
    return this.props.addedBy;
  }

  set addedBy(value: string) {
    this.props.addedBy = value;
  }

  get notes(): string {
    return this.props.notes;
  }

  set notes(value: string) {
    this.props.notes = value;
  }

  get inUse(): boolean {
    return this.props.inUse;
  }

  set inUse(inUse: boolean) {
    this.props.inUse = inUse;
  }

  get model(): string {
    return this.props.model;
  }

  set model(model: string) {
    this.props.model = model;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
