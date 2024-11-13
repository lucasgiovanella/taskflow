import { Replace } from '../../../utils/replace';
import { randomUUID } from 'crypto';

interface ExceptionProps {
  addedBy: string;
  updatedBy: string;
  computerName: string;
  software: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Exception {
  private props: ExceptionProps;
  private _id: string;

  constructor(
    props: Replace<
      ExceptionProps,
      {
        createdAt?: Date;
        updatedAt?: Date;
        udpatedBy?: string;
        notes?: string | null;
        software?: string | null;
      }
    >,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      notes: props.notes ?? '',
      software: props.software ?? '',
      updatedBy: props.updatedBy ?? props.addedBy,
    };
    {
      this._id = id || randomUUID();
    }
  }

  get id(): string {
    return this._id;
  }

  get addedBy(): string {
    return this.props.addedBy;
  }

  set addedBy(addedBy: string) {
    this.props.addedBy = addedBy;
  }

  get updatedBy(): string {
    return this.props.updatedBy;
  }

  set updatedBy(updatedBy: string) {
    this.props.updatedBy = updatedBy;
  }

  get computerName(): string {
    return this.props.computerName;
  }

  set computerName(computerName: string) {
    this.props.computerName = computerName;
  }

  get software(): string {
    return this.props.software;
  }

  set software(software: string) {
    this.props.software = software;
  }

  get notes(): string {
    return this.props.notes;
  }

  set notes(notes: string) {
    this.props.notes = notes;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
